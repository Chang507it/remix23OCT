import {Link} from '@remix-run/react';
import NewNoteStyles from '/Users/juancarloschang/Desktop/remix23OCT/app/componentes/NewNote.css';
import Login from '/Users/juancarloschang/Desktop/remix23OCT/app/componentes/login.jsx';

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

<h1>Bienvenido a &quot;Mis Tickets MUPA&quot;</h1>
    <p>Ingrese su usuario y contraseña</p>
    <p id="cta"></p>
        < Login/>
        <p id="cta">
            <Link to="/opciones">ENTRAR</Link>
        </p>
        <p>olvido su contraseña?</p>
        <h6>Puedes escribir un correo a : mesadeayuda@pty.gob.pa</h6>
        <p>También puedes llamar ala extensión: 1400</p>

     </main>

    </>

}
  export function links(){
    return[{ rel:'stylesheet', href: NewNoteStyles}]
  }
