import { SyntheticEvent, useEffect, useState } from "react";
import './SearchBar.css';

export default function SearchBar () {
    const [word_input, setWordInput] = useState(''); 
    const [word, setWord] = useState('');

    const getWords = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { word_input };
            const data = await fetch('http://localhost:5000/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            console.log(data);
            //if (data.ok == true) { setWord(data) }
        } catch (err) {
            console.log(err.message);
            //setShowWords(false);
        }
    }

    return (
        <form className='searchbar' onSubmit={getWords}>
                <input type="search" placeholder='Search' onChange={(e) => setWordInput(e.target.value)} name="q"/>
                <button>Enter</button>
        </form>
    )
}