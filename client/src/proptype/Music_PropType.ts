import PropTypes from 'prop-types';

const music_proptypes = {
    uuid: PropTypes.string,
    name: PropTypes.string,
    album: PropTypes.string, 
    artist: PropTypes.string, 
    album_cover_url: PropTypes.string, 
    song_url: PropTypes.string, 
    date: PropTypes.string, 
    genre: PropTypes.string
}

export default music_proptypes;