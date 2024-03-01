import { useEffect, useState } from 'react';
import Logout from './Logout';
import './MenuBar.css';
import SearchBar from './SearchBar';

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

    const show = (login == false) ? <>
        <input type="button" onClick={() => window.location.href = "/sign-in"} value="Sign In"/>
        <input type="button" onClick={() => window.location.href = "/login"} value="Login"/>
    </> : <>
        <input type="button" onClick={() => window.location.href = "/dashboard"} value="Dashboard"/>
        <Logout/>
    </>


    return (
        <section className="menu-bar">
            <div className='button-container'>
                {show}
            </div>
            <SearchBar/>
        </section>
    )
}