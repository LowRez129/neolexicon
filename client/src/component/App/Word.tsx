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

    return (
        <div className='word-container'>
            <button className='word-button' onClick={toggleDescription}>{word}</button>
            {description_container}
        </div>
    )
}

Word.propTypes = words_proptypes;

export default Word;