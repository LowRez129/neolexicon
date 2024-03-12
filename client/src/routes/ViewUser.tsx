import { useEffect, useState } from "react";
import './ViewUser.css';
import ViewWord from "../component/view_user/ViewWord";
import { default_route } from "../server_routes";
import Loading from "../component/handle_status/Loading";
import ErrorDisplay from "../component/handle_status/ErrorDisplay";
const { SEARCH_USER, SEARCH_USER_POST } = default_route;

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
                const promise = await fetch(SEARCH_USER, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                const response = await promise.json();
                setPending(false);
                setUsername(response);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
        }
        get();
    }, [user_uuid])
    
    useEffect(() => {
        const get = async () => {
            try {
                const body = { word_input, user_uuid }
                const promise = await fetch(SEARCH_USER_POST, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                })
                const response = await promise.json()
                setPending(false);
                setWords(response);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
        }
        get();
    }, [ user_uuid, word_input ])

    const words_map = () => {
        if (error) {return <ErrorDisplay message={error}/>}
        if (pending) { return <Loading/> }
        return words.map(({ uuid, word, description }) => {
            return <ViewWord word={word} description={description} key={uuid}/>
        })
    }

    return (
        <main className="user">
            <section className="user-menubar">
                <button className="home-button" onClick={() => window.location.href = '/'}>Home</button>
                <div className="username">{username}'s Dictionary</div>
                <input className="searchbar" placeholder="search" onChange={(e) => setWordInput(e.target.value)}/>
            </section>
            <section className="user-words">
                {words_map()}
            </section>
        </main>
    )
}