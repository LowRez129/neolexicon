import { useEffect, useState } from 'react';
import Logout from './Logout';
import './MenuBar.css';

export default function MenuBar () {
    const [login, setLogin] = useState(false);
    useEffect(() => {
        const check_jwt = async () => {
            try {
                const bool = await fetch('http://localhost:5000/user/require-auth', { credentials: "include" });
                const parsed = await bool.json();
                if (parsed == true) { setLogin(parsed) }
            }
            catch (err) {
                console.log(err.message);
                setLogin(false);
            }
        }
    
        check_jwt();
    })

    const show = () => {
        console.log(login);
        if (login == false) {
            return (
                <>
                    <input type="button" onClick={() => window.location.href = "/sign-in"} value="Sign In"/>
                    <input type="button" onClick={() => window.location.href = "/login"} value="Login"/>
                </> 
            )
        }

        return (
            <>
                <input type="button" onClick={() => window.location.href = "/dashboard"} value="Dashboard"/>
                <Logout/>
            </>
        )
    }

    return (
        <section className="menu-bar">
            <div className='button-container'>
                {show()}
            </div>
            <form style={{display: "flex"}}>
                <input style={{width: "100%"}} placeholder='Search'/>
                <button>Enter</button>
            </form>
        </section>
    )
}