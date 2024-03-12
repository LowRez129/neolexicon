import { SyntheticEvent, useState } from 'react';
import './PostWord.css';
import { user_route } from '../../server_routes';
const { USER_POST } = user_route;

export default function PostWord ({ callback } : { callback: () => void }) {
    const [word, setWord] = useState('');
    const [description, setDescription] = useState('');

    const post = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            const body: {word: string, description: string} = { word, description };
            const data = await fetch(USER_POST, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
                credentials: "include"
            })
            if (data.ok) { window.location.reload() }
        } catch (err: unknown) {
            if (err instanceof Error) { console.log(err.message) } 
        }
    }

    return (
        <form onSubmit={post} className="post-form">      
            <input minLength={1} maxLength={36} required className='word' type="text" placeholder='word' onChange={(e) => setWord(e.target.value.toLowerCase())}/>
            <button className='exit-button' type='button' onClick={() => callback()}>&lt;&lt;&lt;</button>
            <textarea minLength={1} maxLength={500} required className='description' placeholder='description' onChange={(e) => setDescription(e.target.value) }/>
            <button className='submit-button'>Post</button>
        </form>
    )
}