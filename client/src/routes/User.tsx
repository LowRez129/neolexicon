

export default function User () {
    const user = async () => {
        try {
            //e.preventDefault()

            await fetch("http://localhost:5000/user/:user", { credentials: "include" });
        } catch (err: any) {
            console.log(err.message);
        }
        
    }
    user();
 
    return (
        <a href="/">home</a>
    )
}