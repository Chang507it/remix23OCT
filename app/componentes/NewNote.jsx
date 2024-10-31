function NewNote() {
    return (
    <form method="post" id="note-form">
        <>
    <p>
        <label htmlFor="title"> NOMBRE DEL COLABORADOR </label>
    <input type="text" id="nom_col" name="nombre_colaborador" required /> </p>
    <p>
        <label htmlFor="title"> FECHA </label>
    <input type="date" id="fecha" name="fecha1" required /> </p>
    <p>
        <label htmlFor="title"> TELEFONO / EXT </label>
    <input type="text" id="tel_ext" name="telefono" required /> </p>
    <p>
        <label htmlFor="title"> CORREO ELECTRÓNICO</label>
    <input type="text" id="email" name="correoE" required /> </p>
    <p>
    <p>
        <label htmlFor="title">UBICACIÓN</label>
    <input type="text" id="ubicacion" name="ubicación1" required /> </p>

        <label htmlFor="content">Solicitud / Incidencia</label>
    <textarea id="content" name="content" rows="8" required /> </p>
    <div className="form-actions"> <button>ENVIAR</button>
    </div>
    </>
    </form >


    );

    }


    export default NewNote;