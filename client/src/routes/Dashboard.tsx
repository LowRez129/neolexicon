import { useState } from "react";

export default function Dashboard () {
    type Data =  {username: string, post_array: object[]};
    const [username, setUsername] = useState('');
    const [post_array, setPostArray] = useState<object[]>([])

    const user = async () => {
        try {
            const data = await fetch("http://localhost:5000/user", { credentials: "include" });
            const parsed: Data = await data.json();
            setUsername(parsed.username);
            setPostArray(parsed.post_array);
        } catch (err: any) {
            console.log(err.message);
            window.location.href = '/login';
        }
        
    }
    user();
 
    return (
        <div>
            <a href="/">home</a>
            <div>{username}</div>
            <div>{JSON.stringify(post_array)}</div> 
        </div>
    )
}