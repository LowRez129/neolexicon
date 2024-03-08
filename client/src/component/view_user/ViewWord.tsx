import './ViewWord.css';
import { useState } from 'react';
import words_proptypes from '../../proptype/Words_PropType';

type ViewWordProp = { user_uuid: string, word: string, description: string };
function ViewWord ({ user_uuid, word, description } : ViewWordProp) {
    const [toggle, setToggle] = useState<boolean>(false);
    const toggleDescription = () => {
        setToggle(!toggle);
    }

    const toggle_view = <button className='word-button' onClick={toggleDescription}>{word}</button>;
    const description_container = (toggle == true) ? (
        <div className='view-container'>
            {toggle_view}
            <div className='description'>{description}</div>
        </div>
    ) : toggle_view;
    const resize_column = (!toggle) ? '' : 'auto / span 2';
    const resize_row = (!toggle) ? '' : 'auto / span 3';

    return (
        <div className='view-word-container' style={{gridColumn: `${resize_column}`, gridRow: `${resize_row}`}}>
            {description_container}
        </div>
    )
}

ViewWord.propTypes = words_proptypes;

export default ViewWord;