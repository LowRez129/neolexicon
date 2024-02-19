import './Catalogue.css';
import { useState, useEffect } from 'react';

interface Music {
    name: string,
    album: string,
    artist: string,
    album_cover_url: string,
    song_url: string,
    date: string,
    genre: string,
}


export default function Catalogue () {
    const [catalogues, setCatalogues] = useState<Music[]>([{}]) 
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
    const index = catalogues[0];

    return (
        <section className="catalogue">
            <div style={{display: "flex", flexDirection: "column"}} >
                <img style={{height: "200px", width: "200px"}} src={index.album_cover_url} />
                <div>{index.artist} | {index.album} : {index.name}</div>
                <div>{index.genre} | {index.date}</div>
                <a href={index.song_url} target="_blank" rel="noopener noreferrer" >{index.song_url}</a>
            </div>
        </section>
    )
}