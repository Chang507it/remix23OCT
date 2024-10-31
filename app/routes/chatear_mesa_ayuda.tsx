import {Link} from '@remix-run/react';
export default function Index(){
    return<>
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
   <div>
    <form>
    </form>

   </div>
   <p id="content">
                <img id="cta"
                src="/ticketChat.png"
                alt="chat ejemplo"></img>
     </p>
   <h1>CHATEAR CON LA MESA DE AYUDA</h1>
        <p id="cta">
            <Link to="/opciones">OPCIONES</Link>
        </p>
     </main>
    </>
}
