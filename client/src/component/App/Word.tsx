import './Word.css';
import { useState } from 'react';
import words_proptypes from '../../proptype/Words_PropType';

type WordProp = { user_uuid: string, word: string, description: string };
function Word ({ user_uuid, word, description } : WordProp) {
    const [toggle, setToggle] = useState<boolean>(false);
    const toggleDescription = () => {
        setToggle(!toggle);
    }

    const word_button = <button className='word-button' onClick={toggleDescription}>{word}</button>;
    const description_container = (toggle == true) ? (
        <div className='view-container'>
            {word_button}
            <div className='description'>{description}</div>
            <button className='view-user-button' onClick={() => window.location.href = `user/search?user=${user_uuid}`}>{user_uuid}</button>    
        </div>
    ) : word_button;

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