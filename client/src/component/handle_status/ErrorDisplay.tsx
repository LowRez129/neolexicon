import './ErrorDisplay.css';
import Loading from './Loading';

export default function ErrorDisplay ({message} : { message: string }  ) {
    return (
        <div className="error">
            <div className='error-message' >{message}</div>
            <button className='home' onClick={() => window.location.href = '/'}>Home</button>
            <button className='refresh' onClick={() => window.location.reload()}>Refresh</button>
        </div>
    )
}