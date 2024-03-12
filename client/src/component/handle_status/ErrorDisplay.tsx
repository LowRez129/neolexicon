import './ErrorDisplay.css';
import PropType from 'prop-types';

export default function ErrorDisplay ({message} : { message: string }  ) {
    return (
        <div className="error">
            <div className='error-message' >{message}</div>
            <button className='home' onClick={() => window.location.href = '/'}>Home</button>
        </div>
    )
}

ErrorDisplay.proptype = {
    message: PropType.string
}