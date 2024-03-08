import { useEffect, useState } from "react";
import './Dashboard.css';
import PostWord from "../component/dashboard/PostWord";
import PutWord from "../component/dashboard/PutWord";

export default function Dashboard () {
    type Data = { uuid: string, word: string, description: string };
    const DEFAULT = [{uuid: '', word: '', description: ''}];
    const [user, setUser] = useState<Data[]>(DEFAULT);
    const [word_input, setWordInput] = useState('');
    const [post_toggle, setPostToggle] = useState(false);

    useEffect(() => {
        const getWords = async () => {
            try {
                const body = { word_input };
                const promise = await fetch('http://localhost:5000/user/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                    credentials: 'include'
                });
                if (!promise.ok) { 
                    const error = await promise.json();
                    throw Error(error);
                }

                const json = await promise.json()
                setUser(json)
    
            } catch (err: any) {
                console.log(err.message);
                if (err.message == 'Missing JWT') { window.location.href = '/login' }
            }
        }
        getWords()
    }, [word_input])

    const word_map = () => {
        return user.map(({ uuid, word, description }) => {
            return <PutWord word_prop={word} description_prop={description} uuid={uuid} key={uuid} />
        })
    }

    const show_post = (post_toggle) ? <PostWord callback={() => setPostToggle(!post_toggle)} /> : <></>;
 
    return (
        <main className="dashboard">
            <section className="dashboard-menu-bar">
                <button className="home-button" type="button" onClick={() => window.location.href = '/'}>Home</button>
                <button className="post-button" onClick={() => setPostToggle(!post_toggle)} >Post</button>
                {show_post}
                <input className="searchbar" type="search" placeholder='Search' onChange={(e) => setWordInput(e.target.value)} name="q"/>
            </section>
            <section className="posts">
                {word_map()}
            </section>
        </main>
    )
}