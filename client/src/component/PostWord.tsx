import { SyntheticEvent, useState } from 'react';
import './PostWord.css';
import WordsInterface from '../interface/words_interface';

export default function PostMusic () {
    const [word, setWord] = useState('');
    const [description, setDescription] = useState('');

    const post = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const body: WordsInterface = { word, description };
            await fetch('http://localhost:5000/user/post', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
                credentials: "include"
            })
        } catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <main className="post-music">
            <form onSubmit={post} className="post-form">
                <div className='input-container'>
                    <input type="text" placeholder='word' onChange={(e) => setWord(e.target.value.toLowerCase())}/>
                    <input type="text" placeholder='description' onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <button className='submit-button'>Post</button>
            </form>
        </main>
    )
}