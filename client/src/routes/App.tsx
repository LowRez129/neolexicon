import './App.css';
import { useState, useEffect } from 'react';
import WordsInterface from '../interface/words_interface';
import MenuBar from '../component/App/MenuBar';
import Word from '../component/App/Word';
//import SearchBar from '../component/App/SearchBar';

function App() {
    const [catalogues, setCatalogues] = useState<(WordsInterface)[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [pending, setPending] = useState<boolean>(true);
    const [word_input, setWordInput] = useState('');

    useEffect(() => {
        const data = async () => {
            try {
                const promise = await fetch('http://localhost:5000', { credentials: 'include' });
                const json = await promise.json();
                setPending(false);
                setCatalogues(json);
            } catch (err: any) {
                setError(err);
            }
        }

        data();
    }, [])

    const getWords = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { word_input };
            const promise = await fetch('http://localhost:5000/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const json = await promise.json()
            setCatalogues(json)

        } catch (err) {
            console.log(err.message);
        }
    }
    
    const music_map = () => {
        if (error) {return <div>{error.message}</div>}
        if (pending == true) {return <div>Pending...</div>}
        return catalogues.map(({ word, description, uuid }) => {
            return <Word word={word} description={description} key={uuid}/>
        });
    }

    return (
        <main className='app'>
            <MenuBar/>
            <form className='searchbar' onSubmit={getWords}>
                <input type="search" placeholder='Search' onChange={(e) => setWordInput(e.target.value)} name="q"/>
                <button>Enter</button>
            </form>
            <section className="catalogue">
                {music_map()}
            </section>
        </main>
    )
}

export default App
