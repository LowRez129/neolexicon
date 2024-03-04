import './Word.css';
import { useState } from 'react';
import words_proptypes from '../../proptype/Words_PropType';

type WordProp = { word: string, description: string };
function Word ({ word, description } : WordProp) {
    const [toggle, setToggle] = useState<boolean>(false);
    const toggleDescription = () => {
        setToggle(!toggle);
    }

    const description_container = (toggle == true) ? (
        <p className='description'>{description}</p>
    ) : <></>;

    const resize_column = (!toggle) ? '' : 'auto / span 2';
    const resize_row = (!toggle) ? '' : 'auto / span 2';

    return (
        <div className='word-container' style={{gridColumn: `${resize_column}`, gridRow: `${resize_row}`}}>
            <button className='word-button' onClick={toggleDescription}>{word}</button>
            {description_container}
        </div>
    )
}

Word.propTypes = words_proptypes;

export default Word;