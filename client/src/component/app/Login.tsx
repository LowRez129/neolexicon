import { SyntheticEvent, useState } from "react";
import './Login.css';
import { default_route } from "../../server_routes";
const { LOGIN } = default_route;

export default function Login ({ setToggleLogin } : { setToggleLogin: () => void } ) {
    type LoginInput = { email: string, password: string };

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<LoginInput|null>(null);

    const login = async (e: SyntheticEvent) => {
        e.preventDefault(); 

        try {
            const body = { email, password };
            const data = await fetch (LOGIN, {
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
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (typeof err.message === 'object') {
                    setError(err.message);
                }
            }
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
            <button type="button" className="close-login-form" onClick={setToggleLogin} >&lt;&lt;&lt;</button>
        </form>
    )
}