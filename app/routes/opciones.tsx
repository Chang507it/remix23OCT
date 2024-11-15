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
                                    
<h1>Bienvenido a &quot;Mis Tickets MUPA&quot;</h1>
    <p>Seleccione una Opción</p>
    <ul>
    <li id="cta"><Link to="/crear_ticket">CREAR TICKET</Link></li>
    <li id="cta"><Link to="/preguntas_frecuentes">PREGUNTAS FRECUENTES</Link></li>
    <li id="cta"><Link to="/chatear_mesa_ayuda">CHATEAR CON LA MESA DE AYUDA</Link></li>
    <li id="cta"><Link to="/">SALIR</Link></li>


    </ul>
        <p id="cta"></p>

        <p id="cta"></p>
        <h1>Municipio de Panamá</h1>
        <p>2024 - 2028</p>

     </main>



    </>
}
