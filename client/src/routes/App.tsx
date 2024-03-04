import './App.css';
import { useState, useEffect } from 'react';
import WordsInterface from '../interface/words_interface';
import MenuBar from '../component/App/MenuBar';
import Word from '../component/App/Word';

function App() {
    const [catalogues, setCatalogues] = useState<(WordsInterface)[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [pending, setPending] = useState<boolean>(true);
    const [word_input, setWordInput] = useState('');

    useEffect(() => {
        const getWords = async () => {
            try {
                const body = { word_input };
                const promise = await fetch('http://localhost:5000/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const json = await promise.json()
                setPending(false);
                setCatalogues(json)
    
            } catch (err: any) {
                setError(err);
            }
        }
        getWords()
    }, [word_input])
    
    const music_map = () => {
        if (error) {return <div>{error.message}</div>}
        if (pending == true) {return <div>Pending...</div>}
        return catalogues.map(({ user_uuid, word, description, uuid }) => {
            return <Word user_uuid={user_uuid} word={word} description={description} key={uuid}/>
        });
    }

    return (
        <main className='app'>
            <MenuBar/>
            <input type="search" placeholder='Search' onChange={(e) => setWordInput(e.target.value)} name="q"/>
            <section className="catalogue">
                {music_map()}
            </section>
        </main>
    )
}

export default App
