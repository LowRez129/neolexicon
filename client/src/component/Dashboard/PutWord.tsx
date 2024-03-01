import { SyntheticEvent, useState } from "react";
import words_proptypes from "../../proptype/Words_PropType";
import './PutWord.css';

type PostType = { uuid: string, word_prop: string, description_prop: string }
export default function PutWord ({ uuid, word_prop, description_prop } : PostType) {
    const [toggle_edit, setToggleEdit] = useState(false);
    const [word_input, setWordInput] = useState(word_prop);
    const [description_input, setDescriptionInput] = useState(description_prop);

    const putWord = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const word = (word_input == '') ? word_prop : word_input;
            const description = (description_input == '') ? description_prop : description_input;  

            const body = { uuid, word, description };
            const data = await fetch('http://localhost:5000/user/put', {
                credentials: 'include',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            if (data.ok == true) {window.location.reload()}
        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteWord = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const data = await fetch('http://localhost:5000/user/delete', {
                credentials: 'include',
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({uuid})
            });
            if ( data.ok == true ) { window.location.reload() }
        } catch (err) {
            console.log(err.message);
        }
    }

    const edit_button = (toggle_edit == false) ? <button className="edit-button" onClick={() => setToggleEdit(!toggle_edit)}>Edit</button> : <></>
    const post = (toggle_edit == false) ? (
        <div className="post" >
            <div>{word_prop}</div>
            <div>{description_prop}</div>
        </div>
    ) : (
        <form className='input-container' onSubmit={putWord}>
            <input className='word' type="text" placeholder={word_prop} onChange={(e) => setWordInput(e.target.value.toLowerCase())}/>
            <textarea className='description' placeholder={description_prop} onChange={(e) => setDescriptionInput(e.target.value)}/>
            <div className="button-container">
                <button onClick={() => setToggleEdit(!toggle_edit)} >Cancel</button>
                <button type="submit" >Confirm</button>
                <button onClick={deleteWord} >Delete</button>
            </div>
        </form>
    )

    return (
        <div className="putword-container">
            {post}
            {edit_button}
        </div>
    )
}

PutWord.prototype = words_proptypes;