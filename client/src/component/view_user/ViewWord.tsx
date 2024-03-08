import './ViewWord.css';
import { useState } from 'react';
import words_proptypes from '../../proptype/Words_PropType';

type ViewWordProp = { user_uuid: string, word: string, description: string };
function ViewWord ({ user_uuid, word, description } : ViewWordProp) {
    const [toggle, setToggle] = useState<boolean>(false);
    const toggleDescription = () => {
        setToggle(!toggle);
    }

    const description_container = (toggle == true) ? (
        <div className='view-container'>
            <button className='word-button' onClick={toggleDescription}>{word}</button>
            <p className='description'>{description}</p>
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

ViewWord.propTypes = words_proptypes;

export default ViewWord;