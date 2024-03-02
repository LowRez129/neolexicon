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
            return <PutWord word_prop={word} description_prop={description} uuid={uuid} key={uuid} />
        })
    }
 
    return (
        <main className="dashboard">
            <section className="dashboard-menu-bar">
                <input className="home-button" type="button"  onClick={() => window.location.href = '/'} value={"Home"}/>
                <PostMusic/>
            </section>
            <section className="posts">
                {word_map()}
            </section>
        </main>
    )
}