import Logout from './Logout';
import './MenuBar.css';

export default function MenuBar () {
    return (
        <section className="menu-bar">
            <div className='button-container'>
                <input type="button" onClick={() => window.location.href = "/sign-in"} value="Sign In"/>
                <input type="button" onClick={() => window.location.href = "/login"} value="Login"/>
                <Logout/>
            </div>
            <form style={{display: "flex"}}>
                <input style={{width: "100%"}} placeholder='Search'/>
                <button>Enter</button>
            </form>
        </section>
    )
}