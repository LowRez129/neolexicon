import './Music.css';
import default_image from '../../img/image-outline.svg';
import Music_Interface from '../interface/Music_Interface';
import music_proptypes from '../proptype/Music_PropType';

const Music = (music: Music_Interface) => {
    const { uuid, name, album, artist, album_cover_url, song_url, date, genre } = music;
    const album_cover = (album_cover_url == null) ? default_image : album_cover_url;

    return (
        <div className='music'>
            <img src={album_cover} />
            <div className='description'>
                <div>{artist} | {album} : {name}</div>
                <div>{genre} | {date}</div>
                <a href={song_url} target="_blank" rel="noopener noreferrer" >{song_url}</a>
                <div>UUID: {uuid}</div>
            </div>
        </div>
    )
}

Music.propTypes = music_proptypes;

export default Music;