import './Words.css';
import default_image from '../../img/image-outline.svg';
import { useState } from 'react';
import words_proptypes from '../proptype/Words_PropType';
import WordsInterface from '../interface/words_interface';


function Words ({ word, description }: WordsInterface) {
    const [toggle, setToggle] = useState<boolean>(false);
    const toggleDescription = () => {
        setToggle(!toggle);
    }

    const description_container = (toggle == true) ? (
        <div className='description'>
                <div>{word}</div>
                <div>{description}</div>
        </div>
    ) : <></>;

    return (
        <div className='music'>
            <img src={default_image} onClick={toggleDescription}/>
            {description_container}
        </div>
    )
}

Words.propTypes = words_proptypes;

export default Words;