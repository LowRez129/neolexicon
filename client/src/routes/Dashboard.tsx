import { useEffect, useState } from "react";
import './Dashboard.css';
import PostMusic from "../component/PostWord";

export default function Dashboard () {
        type Data = { word: string, description: string, username: string }
        const DEFAULT = {word: '', description: '', username: ''}
        const [user, setUser] = useState<Data>(DEFAULT);

    useEffect(() => {
        const User = async () => {
            try {
                const data = await fetch("http://localhost:5000/user", { credentials: "include" });
                const parsed: Data = await data.json();              
                setUser(parsed);
            } catch (err: any) {
                console.log(err.message);
                //window.location.href = '/login';
            }
        }
    User();
        console.log(user.username);
    }, [])
    
    console.log(user.description)
 
    return (
        <main className="dashboard">
            <section className="menu-bar">
                <a href="/">home</a>
                <div>{user.username}</div>
            </section>
            <section className="posts">
                <PostMusic/>
                <div>{user.word} - {user.description}</div>
            </section>
        </main>
    )
}