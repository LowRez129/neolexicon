import './Catalogue.css';
import { useState, useEffect } from 'react';
import Music from './Music';
import Music_Interface from '../interface/Music_Interface';

export default function Catalogue () {
    const [catalogues, setCatalogues] = useState<(Music_Interface)[]>([]);
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
                setError(err);
            }
        }

        data();
    }, [])
     
    const music_map = () => {
        if (error) {return <div>{error.message}</div>}
        if (pending == true) {return <div>Pending...</div>}
        return catalogues.map(({ uuid, artist, album, name, date, genre, album_cover_url, song_url}) => {
            return <Music 
                key={uuid} uuid={uuid} artist={artist} album={album} name={name} date={date} 
                genre={genre} album_cover_url={album_cover_url} song_url={song_url}
            />
        });
    }

    return (
        <section className="catalogue">
            {music_map()}
        </section>
    )
}