import './Catalogue.css';
import { useState, useEffect } from 'react';
import Music from './Music';

interface Music_Catalouge {
    id: number,
    name: string,
    album: string,
    artist: string,
    album_cover_url: string,
    song_url: string,
    date: string,
    genre: string,
}

export default function Catalogue () {
    const [catalogues, setCatalogues] = useState<(Music_Catalouge|object)[]>([{}]);

    useEffect(() => {
        const data = async () => {
            try {
                const promise = await fetch('http://localhost:5000');
                const json = await promise.json();
                setCatalogues(json);
            } catch (err: any) {
                setCatalogues(err.message);
            }
        }

        data();
    }, [])

    return (
        <section className="catalogue">
            {catalogues.map((music, index) => <Music music={music} key={index}/>)}
        </section>
    )
}