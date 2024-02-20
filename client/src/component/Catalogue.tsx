import './Catalogue.css';
import { useState, useEffect } from 'react';
import Music from './Music';

interface Music_Catalouge {
    uuid: string,
    name: string,
    album: string,
    artist: string,
    album_cover_url: string,
    song_url: string,
    date: string,
    genre: string,
}

export default function Catalogue () {
    const [catalogues, setCatalogues] = useState<(Music_Catalouge)[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [pending, setPending] = useState<boolean>(true);

    useEffect(() => {
        const data = async () => {
            try {
                const promise = await fetch('http://localhost:5000');
                const json = await promise.json();
                setPending(false);
                setCatalogues(json);
            } catch (err: any) {
                if (err instanceof Error) {
                    setError(err);
                }
            }
        }

        data();
    }, [])
     
    const music_map = () => {
        if (error) {return <div>{error.message}</div>}
        if (pending == true) {return <div>Pending...</div>}
        return catalogues.map((music) => <Music music={music} key={music.uuid} />);
    }

    return (
        <section className="catalogue">
            {music_map()}
        </section>
    )
}