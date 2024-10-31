import { Form, useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { json, ActionFunction, unstable_parseMultipartFormData, unstable_createMemoryUploadHandler } from "@remix-run/node";
import {Link} from '@remix-run/react';
import NewNote from '/Users/juancarloschang/Desktop/remix23OCT/app/componentes/NewNote.jsx';
import NewNoteStyles from '/Users/juancarloschang/Desktop/remix23OCT/app/componentes/NewNote.css';
import { useState, useRef } from "react";

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 5_000_000, // 5 MB
  });
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const nomColab = formData.get("nombre del colaborador");
  const fecha = formData.get("fecha");
  const tel =  formData.get(" telefono / ext")
  const email = formData.get("email");
  const ubicacion = formData.get("ubicacion");
  const message = formData.get("message");
  const image = formData.get("image") as File;

  // Here you would typically send this data to your backend or API
  console.log({ nomColab, fecha, email, ubicacion, message, image: image.name });

  // Simulate a delay
  await new Promise(res => setTimeout(res, 1000));

  return json({ success: true });
};

export default function Contact() {
  const actionData = useActionData<{ success: boolean }>();
  const navigation = useNavigation();
  const [formError, setFormError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setFormError("Por favor llene el formulario correctamente.");
    } else {
      setFormError("");
      submit(form, { method: "post", encType: "multipart/form-data" });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  return (
    <div className="max-w-md mx-auto pt-1">

<main id="content">
    <img id="logoMupa"
        src="/MTM-light.png"
          alt="MTM logo"
    className="block w-full dark:hidden"
    />
    <img id="logoMupa"
        src="/MTM-dark.png"
         alt="MTM logo"
         className="hidden w-full dark:block"
         />
    </main>


      <h1 className="text-2xl font-bold mb-4 text-white">ABRIR NUEVO TICKET</h1>
      {actionData?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Gracias por abrir un ticket, pronto uno de nuestros técnicos se pondrá en contacto con usted.
        </div>
      )}
      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {formError}
        </div>
      )}
      <Form method="post" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white text-sm font-bold mb-2 ">
            Nombre del Colaborador
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-white text-sm font-bold mb-2">
            Fecha
          </label>
          <input
            type="datetime-local"
            id="lastName"
            name="LastName"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
            Teléfono / Ext
          </label>
          <input
            type="tel"
            id="tel-ext"
            name="tel-ext"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ubicacion" className="block text-white text-sm font-bold mb-2">
            Ubicación
          </label>
          <input
            type="text"
            id="email"
            name="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
          />
        </div>


        <div className="mb-6">
          <label htmlFor="message" className="block text-white text-sm font-bold mb-2">
            Solicitud / Incidencia
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 bg-white"
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block text-white text-sm font-bold mb-2">
            Subir imagen ( optional)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">Selected file: {selectedFile.name}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "ENVIAR"}
          </button>
        </div>
      </Form>

      <main id="content"><p id="cta"><Link to="/opciones">OPCIONES</Link></p></main>
    </div>
  );
}