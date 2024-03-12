import './App.css';
import { useState, useEffect } from 'react';
import WordsInterface from '../interface/words_interface';
import Word from '../component/app/Word';
import MenuButtons from '../component/app/MenuButtons';
import ErrorDisplay from '../component/handle_status/ErrorDisplay';
import Loading from '../component/handle_status/Loading';
import { default_route } from '../server_routes';
const { SEARCH } = default_route;

function App() {
    const [catalogues, setCatalogues] = useState<(WordsInterface)[]>([]);
    const [error, setError] = useState<string|null>(null);
    const [pending, setPending] = useState<boolean>(true);
    const [word_input, setWordInput] = useState('');

    useEffect(() => {
        const getWords = async () => {
            try {
                const body = { word_input };
                const promise = await fetch(SEARCH, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                if (!promise.ok) { 
                    const error = await promise.json();
                    throw Error(error) 
                }

                const json = await promise.json()
                setPending(false);
                setCatalogues(json)
    
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
        }
        getWords()
    }, [word_input])
    
    const word_map = () => {
        if (error) {return <ErrorDisplay message={error}/>}
        if (pending == true) {return <Loading/>}
        return catalogues.map(({ username, user_uuid, word, description, uuid }) => {
            return <Word username={username} user_uuid={user_uuid} word={word} description={description} key={uuid}/>
        });
    }

    return (
        <main className='app'>
            <section className='menubar'>
                <MenuButtons/>
                <input className='searchbar' type="search" placeholder='Search' onChange={(e) => setWordInput(e.target.value)} name="q"/>
            </section>
            <section className="words">
                {word_map()}
            </section>
        </main>
    )
}

export default App
