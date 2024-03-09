import './Word.css';
import { useState } from 'react';
import words_proptypes from '../../proptype/Words_PropType';

type WordProp = { username: string, user_uuid: string, word: string, description: string };
function Word ({ username, user_uuid, word, description } : WordProp) {
    const random_bool = Math.random() < 0.5;
    const [toggle, setToggle] = useState<boolean>(random_bool);
    const toggleDescription = () => {
        setToggle(!toggle);
    }

    const description_container = (toggle == true) ? (
        <div className='view'>
            <div className='word'>{word}</div>
            <button className='close-view' onClick={toggleDescription} >&lt;&lt;&lt;</button>
            <div className='description'>{description}</div>
            <button className='view-user-button' onClick={() => window.location.href = `user/search?user=${user_uuid}`}>{username}</button>    
        </div>
    ) : <button className='word-button' onClick={toggleDescription}>{word}</button>;

    const resize_column = (!toggle) ? '' : 'auto / span 2';
    const resize_row = (!toggle) ? '' : 'auto / span 3';

    return (
        <div className='word-container' style={{gridColumn: `${resize_column}`, gridRow: `${resize_row}`}}>
            {description_container}
        </div>
    )
}

Word.propTypes = words_proptypes;

export default Word;