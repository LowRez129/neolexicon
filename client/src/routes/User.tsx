import { json } from "react-router-dom";

export default function User () {
    const user = async () => {
        try {
            const data = await fetch("http://localhost:5000/user", { credentials: "include" });
            const parsed = await data.json();
            console.log(parsed);
        } catch (err: any) {
            console.log(err.message);
        }
        
    }
    user();
 
    return (
        <a href="/">home</a>
    )
}