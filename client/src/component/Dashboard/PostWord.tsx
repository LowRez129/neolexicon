import { SyntheticEvent, useState } from 'react';
import './PostWord.css';
import WordsInterface from '../../interface/words_interface';

export default function PostMusic () {
    const [word, setWord] = useState('');
    const [description, setDescription] = useState('');

    const post = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const body: WordsInterface = { word, description };
            const data = await fetch('http://localhost:5000/user/post', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
                credentials: "include"
            })
            if (data.ok) { window.location.reload() }
        } catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <main className="post-music">
            <form onSubmit={post} className="post-form">      
                <input required className='word' type="text" placeholder='word' onChange={(e) => setWord(e.target.value.toLowerCase())}/>
                <textarea required className='description' placeholder='description' onChange={(e) => setDescription(e.target.value) }/>
                <button className='submit-button'>Post</button>
            </form>
        </main>
    )
}