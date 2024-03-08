import { useEffect, useState } from "react";
import './ViewUser.css';
import ViewWord from "../component/view_user/ViewWord";

export default function ViewUser () {
    const url = new URL(window.location.href).searchParams;
    const parameter = url.get('user');
    const user_uuid = (parameter == null) ? '' : parameter;
    const default_words = { uuid: '', word: '', description: '' }
    const [words, setWords] = useState([default_words]);
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string|null>(null);
    const [pending, setPending] = useState<boolean>(true);
    const [word_input, setWordInput] = useState('');

    useEffect(() => {
        const get = async () => {
            try {
                const body = { user_uuid };
                const promise = await fetch('http://localhost:5000/search/user', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                const response = await promise.json();
                setPending(false);
                setUsername(response);
            } catch (err) {
                console.log(err.message);
                setError(err.message);
            }
        }
        get();
    }, [])
    
    useEffect(() => {
        const get = async () => {
            try {
                const body = { word_input, user_uuid }
                const promise = await fetch('http://localhost:5000/search/user/post', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                })
                const response = await promise.json()
                setPending(false);
                setWords(response);
            } catch (err) {
                console.log(err.message);
                setError(err.message);
            }
        }
        get();
    }, [ user_uuid, word_input ])

    const words_map = () => {
        if (error) {return <div>{error}</div>}
        if (pending) { return <div>pending</div> }
        return words.map(({ uuid, word, description }) => {
            return <ViewWord word={word} description={description} user_uuid={user_uuid} key={uuid}/>
        })
    }

    return (
        <main className="user">
            <section className="user-menubar">
                <button className="home-button" onClick={() => window.location.href = '/'}>Home</button>
                <div className="username">{username}</div>
                <input className="searchbar" placeholder="search" onChange={(e) => setWordInput(e.target.value)}/>
            </section>
            <section className="user-words">
                {words_map()}
            </section>
        </main>
    )
}