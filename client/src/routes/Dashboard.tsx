import { useEffect, useState } from "react";
import './Dashboard.css';
import PostMusic from "../component/Dashboard/PostWord";
import PutWord from "../component/Dashboard/PutWord";

export default function Dashboard () {
        type Data = { uuid: string, word: string, description: string }
        const DEFAULT = [{uuid: '', word: '', description: ''}]
        const [user, setUser] = useState<Data[]>(DEFAULT);

    useEffect(() => {
        const User = async () => {
            try {
                const data = await fetch("http://localhost:5000/user", { credentials: "include" });
                const parsed: Data = await data.json();              
                setUser(parsed);
            } catch (err: any) {
                console.log(err.message);
                window.location.href = '/login';
            }
        }
        User();
    }, [])

    const word_map = () => {
        return user.map(({ uuid, word, description }) => {
            return <PutWord word={word} description={description} uuid={uuid} key={uuid} />
        })
    }
 
    return (
        <main className="dashboard">
            <section className="menu-bar">
                <a href="/">home</a>
                <div>{}</div>
            </section>
            <section className="posts">
                <PostMusic/>
                {word_map()}
            </section>
        </main>
    )
}