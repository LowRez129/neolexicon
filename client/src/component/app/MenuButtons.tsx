import { useEffect, useState } from 'react';
import './MenuButtons.css';
import Login from './Login';
import SignIn from './SignIn';

export default function MenuButtons () {
    const [login, setLogin] = useState(false);
    const [toggle_login, setToggleLogin] = useState(false);
    const [toggle_sign_in, setToggleSignIn] = useState(false);

    useEffect(() => {
        const check_jwt = async () => {
            try {
                const bool = await fetch('http://localhost:5000/user/require-auth', { credentials: "include" });
                const parsed = await bool.json();
                if (parsed == true) { setLogin(parsed) }
            }
            catch (err: any) {
                console.log(err.message);
                setLogin(false);
            }
        }
    
        check_jwt();
    }, [])

    const logout = async () => {
        try {
            await fetch('http://localhost:5000/logout', {credentials: 'include'});
            window.location.href = '/';
        } catch (err: any) {
            console.log(err.message)
        }
    }

    const toggleSignIn = () => {
        if (toggle_login) { setToggleLogin(!toggle_login) }
        setToggleSignIn(!toggle_sign_in);
    };
    const toggleLogin = () => {
        if (toggle_sign_in) { setToggleSignIn(!toggle_sign_in) }
        setToggleLogin(!toggle_login);
    };
    
    const show_sign_in = (toggle_sign_in) ? <SignIn setToggleSignIn={toggleSignIn}/> : <></>;
    const show_login = (toggle_login) ? <Login setToggleLogin={toggleLogin}/> : <></>;

    const show = (login == false) ? <>
        <button className='sign-in' onClick={toggleSignIn}>Sign In</button>
        <button className='login' onClick={toggleLogin}>Login</button>
    </> : <>
        <button className='dashboard-button' onClick={() => window.location.href = "/dashboard"}>Dashboard</button>
        <button className='logout' onClick={logout}>Logout</button>
    </>


    return (
        <>
            {show}
            {show_login}
            {show_sign_in}
        </>
    )
}