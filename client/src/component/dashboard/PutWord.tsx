import { SyntheticEvent, useState } from "react";
import words_proptypes from "../../proptype/Words_PropType";
import './PutWord.css';
import { user_route } from "../../server_routes";
const { USER_DELETE } = user_route;

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
        } catch (err: unknown) {
            if (err instanceof Error) { console.log(err.message) } 
        }
    }

    const deleteWord = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const data = await fetch(USER_DELETE, {
                credentials: 'include',
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({uuid})
            });
            if ( data.ok == true ) { window.location.reload() }
        } catch (err: unknown) {
            if (err instanceof Error) { console.log(err.message) } 
        }
    }

    const post = (toggle_edit == false) ? (
        <button className="post" onClick={() => setToggleEdit(!toggle_edit)}>
            <div className="word" >{word_prop}</div>
        </button>
    ) : (
        <form className='put-form' onSubmit={putWord}>
            <input minLength={1} maxLength={36} className='word-input' type="text" value={word_input} onChange={(e) => setWordInput(e.target.value.toLowerCase())}/>
            <textarea minLength={1} maxLength={500} className='description-input' value={description_input} onChange={(e) => setDescriptionInput(e.target.value)}/>
            <button className="delete" onClick={deleteWord} >Delete</button>
            <button className="cancel" onClick={() => setToggleEdit(!toggle_edit)} >&lt;&lt;&lt;</button>
            <button className="confirm" type="submit" >Confirm</button>
        </form>
    )
    
    const resize_column = (!toggle_edit) ? '' : 'auto/span 2';
    const resize_row = (!toggle_edit) ? '' : 'auto/span 4';

    return (
        <div className="putword-container" style={{gridColumn: `${resize_column}`, gridRow: `${resize_row}`}}>
            {post}
        </div>
    )
}

PutWord.prototype = words_proptypes;