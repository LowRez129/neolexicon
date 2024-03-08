import { SyntheticEvent, useState } from "react";
import './Login.css';

export default function Login ({ setToggleLogin } : { setToggleLogin: () => void } ) {
    type LoginInput = { email: string, password: string };

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<LoginInput|null>(null);

    const login = async (e: SyntheticEvent) => {
        e.preventDefault(); 

        try {
            const body = { email, password };
            const data = await fetch ("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include"
            })

            if(!data.ok) { 
                const parsed = data.json();
                return parsed.then((value) => { return setError(value) });
            }
            
            window.location.href = '/dashboard';
        } catch (err: any) {
            console.log(err.message);
            setError(err.message);
        }
    }
    const email_error = (error != null) ? <div style={{color: "red"}}>{error.email}</div> : <></>
    const password_error = (error != null) ? <div style={{color: "red"}}>{error.password}</div> : <></>
    
    return (      
        <form onSubmit={login} className="login-form">
            <label>Email:</label>
            <input placeholder="Email" type='email' required value={email} onChange={e => setEmail(e.target.value)}/>
            {email_error}
            <label>Password:</label>
            <input placeholder="Password" type='password' required value={password} onChange={e => setPassword(e.target.value)}/>
            {password_error}
            <button className="login-submit-button">Submit</button>
            <button type="button" className="close-login-form" onClick={setToggleLogin} >X</button>
        </form>
    )
}