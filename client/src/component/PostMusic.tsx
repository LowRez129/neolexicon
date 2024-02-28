import { BaseSyntheticEvent, SyntheticEvent, useState } from 'react';
import './PostMusic.css';
import default_image from '../../img/image-outline.svg';

interface Music {
    name: string,
    album: string,
    artist: string,
    album_cover_url: string,
    song_url: string,
    date: string,
    genre: string,
}

export default function PostMusic () {
    const [album_cover_url, setAlbumCoverURL] = useState(default_image);

    const post = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const body: Music = {}
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
                <img src={album_cover_url} onError={(e) => e.currentTarget.src = default_image} className='album-cover'/>
                <div className='input-container'>
                    <input 
                        placeholder='album-url' 
                        type="text" alt='Album Cover' 
                        onChange={(e) => setAlbumCoverURL(e.target.value)}
                    />
                    <input type="text" placeholder='artist'/>
                    <input type="text" placeholder='album'/>
                    <input type="text" placeholder='name'/>
                    <input type="text" placeholder='date'/>
                    <input type="text" placeholder='genre'/>
                    <input type="text" placeholder='song-url'/>
                </div>
                <button className='submit-button'>Post</button>
            </form>
        </main>
    )
}