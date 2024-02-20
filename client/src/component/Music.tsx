import './Music.css';
import PropTypes from 'prop-types';

function Music ({ music }) {
    const { name, album, artist, album_cover_url, song_url, date, genre } = music;

    return (
        <div className='music'>
            <img src={album_cover_url} />
            <div>{artist} | {album} : {name}</div>
            <div>{genre} | {date}</div>
            <a href={song_url} target="_blank" rel="noopener noreferrer" >{song_url}</a>
        </div>
    )
}

Music.propTypes = {
    music: PropTypes.exact({
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