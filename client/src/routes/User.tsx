import { SyntheticEvent } from "react"

export default function User () {
    console.log(document.cookie);
    const user = async () => {
        try {
            //e.preventDefault()

            await fetch("http://localhost:5000/user");
        } catch (err: any) {
            console.log(err.message);
        }
        
    }
    user();
 
    return (
        <a href="/">home</a>
    )
}