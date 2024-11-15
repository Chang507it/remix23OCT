import { useState } from 'react'
import { json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import { ChevronDown, ChevronUp } from 'lucide-react'


// Define the type for our FAQ items
type FAQItem = {
  id: string
  question: string
  answer1: string
  answer2: string
  answer3: string
  answer4: string
  answer5: string
}

// This would typically be in your route file (e.g., app/routes/faq.tsx)
export const loader = async () => {
  // In a real application, you might fetch this data from an API or database
  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'Instrucciones para Inscrbirse en AD SELF SERVICE.',
      answer1: '1-Ingrese a su correo y busque en la bandeja de entrada un correo a nombre de AD SELFSERVICE.',
      answer2:'2-Ingrse su usuario de windows (nombre.apellido).',
      answer3:'3-En AD MANAGER, ingrese su usuario y contraseña.',
      answer4:'4-Seleccione 2 preguntas de seguridad y escriba sus respuestas.',
      answer5:'5-AL final verá un mensaje de "Se ha suscrito con éxito.',


    },
    {
      id: '2',
      question: 'REVISIÓN DE COMPUTADORA NO ENCIENDE',
      answer1: '1-Comprueba la fuente de alimentación.',
      answer2:'2-Verifica el interruptor de la fuente de alimentación',
      answer3:'3-Revisa la conección de la batería',
      answer4:'4-Revisa que el botón de encendido funcione',
      answer5:'5-Revisa los cables del monitor',
    },

    {
      id: '3',
      question: 'INSTALACION DE TONER ( Impresora Lexmark ).',
      answer1: '1-Pulse el botón en el lateral derecho de la impresora y abra la puerta frontal.',
      answer2:'2-Extraiga el cartucho de tóner mediante la palanca.',
      answer3:'3-Desembale el cartucho de tóner y quite el material de embalaje y Agite el nuevo cartucho para redistribuir el tóner.',
      answer4:'4-Introduzca el cartucho de tóner en la impresora alineando los carriles laterales del cartucho con las flechas de los carriles laterales dentro la impresora.',
      answer5:'5-Cierre la puerta frontal.',

    },

    {
      id: '4',
      question: 'DESBLOQUEO DE CUENTAS',
      answer1: 'Yes, Remix is designed to scale well for large applications. Its architecture promotes code splitting, efficient data loading, and progressive enhancement, making it suitable for projects of any size.',
      answer2:'',
      answer3:'',
      answer4:'',
      answer5:'',
    },

    {
      id: '5',
      question: 'PROBLEMAS CONEXIÓN A INTERNET',
      answer1: '1. Reinicia tu módem y router o pasarela de internet (combinación de módem/router)Reiniciar el equipo es la regla de oro para solucionar problemas de internet. Este siempre debe ser tu primer paso; es simple, fácil e increíblemente efectivo.',
      answer2: '2. Revisa tus cables Los cables sueltos o dañados pueden causar una amplia gama de problemas de internet. A veces, la solución es tan simple como apretar una conexión, otras veces puede ser necesario reemplazar un cable o requerir la ayuda de un técnico de banda ancha.',
      answer3:'',
      answer4:'',
      answer5:'',
    }
  ]

  return json({ faqData })
}

function AccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{item.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="py-4 px-6 text-left">
          <p>{item.answer1}</p>
          <p>{item.answer2}</p>
          <p>{item.answer3}</p>
          <p>{item.answer4}</p>
          <p>{item.answer5}</p>
          <p id="cta2"><Link to="/crear_ticket">ABRIR UN TICKET</Link></p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const { faqData } = useLoaderData<typeof loader>()

  return (
    <div className="container mx-auto px-4 py-8">

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

<h1 className="text-3xl font-bold mb-6">PREGUNTAS FRECUENTES</h1>
<div className="space-y-4">
        {faqData.map((item) => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </div>

<p id="cta">
<Link to="/opciones">OPCIONES</Link>
</p>

</main>

    </div>

  )
}
