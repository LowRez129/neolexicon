import { SyntheticEvent, useState } from 'react';
import './SignIn.css';
import { default_route } from '../../server_routes';
const { SIGN_IN } = default_route;

export default function SignIn ({ setToggleSignIn } : { setToggleSignIn: () => void }) {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmitForm = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            if ((password || confirm_password) === '') {throw Error('Empty password.')}
            if (password != confirm_password) { throw Error('Password does not match.') }
            const body = { username, email, password }
            const response = await fetch(SIGN_IN, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            if (response.ok == false) { throw Error(await response.json()) }
            window.location.reload();
        } catch (err: unknown) {
            if (err instanceof Error) { 
                setError(err.message)
            }
        }
    }

    const show_error = (error != '') ? <div className='sign-in-error'>{error}</div> : <></>

    return (
        <form className='sign-in-form' onSubmit={onSubmitForm}>
            <button type="button" className='close-sign-in-form' onClick={setToggleSignIn} >&lt;&lt;&lt;</button>
            <label>Username:</label>
            <input placeholder='Username' type='text' required value={username} onChange={e => setUsername(e.target.value)}/>
            <label>Email:</label>
            <input placeholder="Email" type='email' required value={email} onChange={e => setEmail(e.target.value)}/>
            <label>Password:</label>
            <input placeholder="Password" type='password' required value={password} onChange={e => setPassword(e.target.value)}/>
            <label>Confirm Password:</label>
            <input placeholder="Confirm Password" type='password' required value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}/>
            {show_error}
            <button className='submit-sign-in' >Submit</button>
        </form>
    )
}