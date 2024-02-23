import './Music.css';
import default_image from '../../img/image-outline.svg';
import Music_Interface from '../interface/Music_Interface';
import music_proptypes from '../proptype/Music_PropType';
import { useState } from 'react';

function Music ({ uuid, name, album, artist, album_cover_url, song_url, date, genre }: Music_Interface) {
    const [toggle, setToggle] = useState<boolean>(false);
    const album_cover = (album_cover_url == null) ? default_image : album_cover_url;
    const toggleDescription = () => {
        setToggle(!toggle);
    }

    const description = (toggle == true) ? (
        <div className='description'>
                <div>{artist}</div>
                <div>{album}:</div>
                <div>{name}</div>
                <div>{genre} | {date}</div>
                <a href={song_url} target="_blank" rel="noopener noreferrer" >{song_url}</a>
                <div>UUID: {uuid}</div>
        </div>
    ) : <></>;

    return (
        <div className='music'>
            <img src={album_cover} onClick={toggleDescription}/>
            {description}
        </div>
    )
}

Music.propTypes = music_proptypes;

export default Music;