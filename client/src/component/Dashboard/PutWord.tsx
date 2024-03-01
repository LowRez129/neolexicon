import { SyntheticEvent, useState } from "react";
import WordsInterface from "../../interface/words_interface";
import words_proptypes from "../../proptype/Words_PropType"

export default function PutWord ({ uuid, word, description }: WordsInterface) {
    const [toggle_edit, setToggleEdit] = useState(false);

    const putWord = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await fetch('', {
                credentials: 'include',
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                //body: {}
            })
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

    return (
        <div className="putword-container">
            <div>{word}</div>
            <div>{description}</div>
            <div className="button-container">
                <button onClick={() => setToggleEdit(!toggle_edit)}>Edit</button>
                <button onClick={deleteWord} >Delete</button>
            </div>
        </div>
    )
}

PutWord.prototype = words_proptypes;