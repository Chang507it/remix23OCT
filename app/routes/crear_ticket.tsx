import { Form, useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import nodemailer from 'nodemailer';
import { json, ActionFunction, unstable_parseMultipartFormData, unstable_createMemoryUploadHandler } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 5_000_000,
  });

  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const nomColab = formData.get("nombre");
  const fecha = formData.get("fecha");
  const telefono = formData.get("telefono");
  const email = formData.get("email");
  const ubicacion = formData.get("ubicacion");
  const message = formData.get("message");
  const image = formData.get("image") as File;

  const transporter = nodemailer.createTransport({

    host: 'smtp.office365.com',

    port: 587,

    secure: false,

    auth: {

      user: 'noreply@municipio-pma.gob.pa',

      pass: '$2a$12$/vHCcY8mvn2UZ2QEcCtWcevMS4gQ9QLj43JHMQzVZTCHZt3Zw8Qp6121'

    },

    tls: {

      ciphers: 'SSLv3',

      rejectUnauthorized: false

    }

  });

  try {
    let imageBase64 = '';
    if (image && image.size > 0) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageBase64 = buffer.toString('base64');
    }      
           
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Nuevo Ticket de Soporte</h1>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #1f2937;">Detalles del Ticket</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Nombre:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${nomColab}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Fecha:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${fecha}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Teléfono:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${telefono}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Ubicación:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${ubicacion}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #1f2937;">Solicitud / Incidencia:</h3>
          <p style="line-height: 1.6;">${message}</p>
        </div>
        ${imageBase64 ? `
          <div style="margin-top: 20px;">
            <h3 style="color: #1f2937;">Imagen Adjunta:</h3>
            <img src="data:${image.type};base64,${imageBase64}" style="max-width: 100%; height: auto;" />
          </div>
        ` : ''}
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px;">Este es un ticket automático generado desde el sistema de soporte.</p>
      </div>
    `;

    const mailResult = await transporter.sendMail({
      from: 'noreply@municipio-pma.gob.pa',
      to: email?.toString() || '',
      subject: `Nuevo Ticket de Soporte - ${nomColab}`,
      html: htmlContent,
      attachments: imageBase64 ? [{
        filename: image.name,
        content: imageBase64,
        encoding: 'base64'
      }] : []
    });

    const confirmationResult = await transporter.sendMail({
      from: 'noreply@municipio-pma.gob.pa',
      to: email?.toString() || '',
      subject: 'Confirmación de Ticket de Soporte - Municipio de Panamá',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Confirmación de Ticket</h1>
          <p>Estimado/a ${nomColab},</p>
          <p>Hemos recibido su ticket de soporte. Nuestro equipo técnico revisará su solicitud y se pondrá en contacto con usted a la brevedad posible.</p>
          <p>Detalles del ticket:</p>
          <ul>
            <li>Fecha: ${fecha}</li>
            <li>Ubicación: ${ubicacion}</li>
            <li>Número de referencia: ${mailResult.messageId}</li>
          </ul>
          <p>Gracias por su paciencia.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">Este es un correo automático, por favor no responda a este mensaje.</p>
        </div>
      `
    });

    return json({
      success: true,
      messageId: mailResult.messageId,
      confirmationMessageId: confirmationResult.messageId
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return json({
      success: false,
      error: 'Error al procesar la solicitud',
      errorDetails: errorMessage
    }, {
      status: 500
    });
  }
};

export default function Contact() {
  const actionData = useActionData<{
    success: boolean;
    messageId?: string;
    error?: string;
    errorDetails?: string;
  }>();
  const navigation = useNavigation();
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }, [selectedFile]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newErrors: {[key: string]: string} = {};

    if (!formData.get("nombre")) newErrors.nombre = "El nombre es requerido";
    if (!formData.get("fecha")) newErrors.fecha = "La fecha es requerida";
    if (!formData.get("telefono")) newErrors.telefono = "El teléfono es requerido";
    if (!formData.get("email")) newErrors.email = "El email es requerido";
    if (!formData.get("ubicacion")) newErrors.ubicacion = "La ubicación es requerida";
    if (!formData.get("message")) newErrors.message = "El mensaje es requerido";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      submit(form, { method: "post", encType: "multipart/form-data" });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">Crear Ticket de Soporte</h1>
      <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input type="text" name="nombre" id="nombre" className="w-full mt-1 p-2 border rounded-md" />
          {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
          <input type="date" name="fecha" id="fecha" className="w-full mt-1 p-2 border rounded-md" />
          {errors.fecha && <span className="text-red-500 text-xs">{errors.fecha}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input type="text" name="telefono" id="telefono" className="w-full mt-1 p-2 border rounded-md" />
          {errors.telefono && <span className="text-red-500 text-xs">{errors.telefono}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input type="email" name="email" id="email" className="w-full mt-1 p-2 border rounded-md" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">Ubicación</label>
          <input type="text" name="ubicacion" id="ubicacion" className="w-full mt-1 p-2 border rounded-md" />
          {errors.ubicacion && <span className="text-red-500 text-xs">{errors.ubicacion}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Descripción del Problema</label>
          <textarea name="message" id="message" rows={5} className="w-full mt-1 p-2 border rounded-md"></textarea>
          {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Adjuntar Imagen</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
          {preview && <img src={preview} alt="Vista previa" className="mt-2 max-w-xs mx-auto" />}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Ticket'}
          </button>
        </div>
      </Form>

      {actionData?.success && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 text-green-700 rounded-md">
          <h2 className="text-xl">¡Ticket enviado exitosamente!</h2>
          <p>Gracias por tu mensaje. Recibirás una confirmación por correo.</p>
        </div>
      )}

      {actionData?.error && (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 text-red-700 rounded-md">
          <h2 className="text-xl">Error al enviar el ticket</h2>
          <p>{actionData.error}</p>
        </div>
      )}
    </div>
  );
}
