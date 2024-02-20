import './Music.css';
import PropTypes from 'prop-types';
import default_image from '../../img/image-outline.svg';

type Music_Catalouge = {
    uuid: string,
    name: string,
    album: string,
    artist: string,
    album_cover_url: string,
    song_url: string,
    date: string,
    genre: string,
}

const Music = ({music}) => {
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

Music.propTypes = {
    music: PropTypes.exact({
        uuid: PropTypes.string,
        name: PropTypes.string,
        album: PropTypes.string, 
        artist: PropTypes.string, 
        album_cover_url: PropTypes.string, 
        song_url: PropTypes.string, 
        date: PropTypes.string, 
        genre: PropTypes.string
    })
};

export default Music;