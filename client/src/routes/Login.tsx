import { SyntheticEvent, useState } from "react";

export default function Login () {
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
                body: JSON.stringify(body)
            })
            const parsed = data.json()
            if(data.ok == true) { return } 
            parsed.then((value) => { return setError(value) });
        } catch (err: any) {
            console.log(err.message);
            setError(err.message);
        }
    }
    const email_error = (error != null) ? <div style={{color: "red"}}>{error.email}</div> : <></>
    const password_error = (error != null) ? <div style={{color: "red"}}>{error.password}</div> : <></>
    
    return (
        <main className="login">
            <a href="/">Home</a>
            <form onSubmit={login}>
                <label>Email:</label>
                <input placeholder="Email" type='email' required value={email} onChange={e => setEmail(e.target.value)}/>
                {email_error}
                <label>Password:</label>
                <input placeholder="Password" type='password' required value={password} onChange={e => setPassword(e.target.value)}/>
                {password_error}
                <button>Submit</button>
            </form>
        </main>
    )
}