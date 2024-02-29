import WordsInterface from '../interface/words_interface';
import './Catalogue.css';
import { useState, useEffect } from 'react';
import Word from './Word';

export default function Catalogue () {
    const [catalogues, setCatalogues] = useState<(WordsInterface)[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [pending, setPending] = useState<boolean>(true);

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
     
    const music_map = () => {
        if (error) {return <div>{error.message}</div>}
        if (pending == true) {return <div>Pending...</div>}
        return catalogues.map(({ word, description, uuid }) => {
            return <Word word={word} description={description} key={uuid}/>
        });
    }

    return (
        <section className="catalogue">
            {music_map()}
        </section>
    )
}