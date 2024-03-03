import { useEffect, useState } from "react";
import './Dashboard.css';
import PostMusic from "../component/Dashboard/PostWord";
import PutWord from "../component/Dashboard/PutWord";

export default function Dashboard () {
    type Data = { uuid: string, word: string, description: string }
    const DEFAULT = [{uuid: '', word: '', description: ''}]
    const [user, setUser] = useState<Data[]>(DEFAULT);
    const [word_input, setWordInput] = useState('');

    useEffect(() => {
        const getWords = async () => {
            try {
                const body = { word_input };
                const promise = await fetch('http://localhost:5000/user/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                const json = await promise.json()
                setUser(json)
    
            } catch (err: any) {
                console.log(err.message);
                window.location.href = '/login';
            }
        }
        getWords()
    }, [word_input])

    const word_map = () => {
        return user.map(({ uuid, word, description }) => {
            return <PutWord word_prop={word} description_prop={description} uuid={uuid} key={uuid} />
        })
    }
 
    return (
        <main className="dashboard">
            <section className="dashboard-menu-bar">
                <input className="home-button" type="button" onClick={() => window.location.href = '/'} value={"Home"}/>
                <PostMusic/>
                <input type="search" placeholder='Search' onChange={(e) => setWordInput(e.target.value)} name="q"/>
            </section>
            <section className="posts">
                {word_map()}
            </section>
        </main>
    )
}