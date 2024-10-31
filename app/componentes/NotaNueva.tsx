// chequear despues como va//


function NewNote() {
    return (
    <form method="post" id="note-form">
        <>
    <p>
        <label htmlFor="title"> Title </label>
    <input type="text" id="title" name="title" required /> </p>
    <p>
        <label htmlFor="content">Content</label>
    <textarea id="content" name="content"  required /> </p>
    <div className="form-actions"> <button>Agregar nota</button>
    </div>
    </>
    </form >


    );

    }


    export default function NotaesPage(){
        return (
            <main>
                <h1> notas </h1>
                <NewNote/>
            </main>

        )
    }