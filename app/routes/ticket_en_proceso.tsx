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



            <img id="logoMupa"
                src="/clock1.webp"
                  alt="MTM logo"
            className="block w-full dark:hidden"
            />
            <h1>TICKET EN PROCESO</h1>

<p id="cta">
<Link to="/opciones">OPCIONES</Link>
</p>


</main>
</>
}
