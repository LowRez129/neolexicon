import { SyntheticEvent, useState } from 'react';
import './SignIn.css';

export default function SignIn () {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const onSubmitForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            const body = { username, email, password }
            const response = await fetch("http://localhost:5000/sign-in", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            console.log(response);
            window.location.pathname = '/';
        } catch (err: any) {
            console.log(err.message);
        }
        return console.log(username, email)
    }

    const confirmPassword = () => {
        if ((password || confirm_password) === '') {return}
        if (password == confirm_password) { return console.log(password, confirm_password, 'match') }
        return;
    }

    confirmPassword();

    return (
        <main className="sign-in" >
            <form onSubmit={onSubmitForm}>
                <label>Username:</label>
                <input placeholder='Username' type='text' required value={username} onChange={e => setUsername(e.target.value)}/>
                <label>Email:</label>
                <input placeholder="Email" type='email' required value={email} onChange={e => setEmail(e.target.value)}/>
                <label>Password:</label>
                <input placeholder="Password" type='password' required value={password} onChange={e => setPassword(e.target.value)}/>
                <label>Confirm Password:</label>
                <input placeholder="Confirm Password" type='password' required value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}/>
                <button>Submit</button>
                <input type="button" onClick={() => window.location.href = "/"} value="Home" />
            </form>
        </main>
    )
}