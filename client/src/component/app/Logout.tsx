export default function Logout () {
    const logout = async () => {
        try {
            await fetch('http://localhost:5000/logout', {credentials: 'include'});
            window.location.href = '/';
        } catch (err) {
            console.log(err.message)
        }
        
    }
    
    return (
        <input type="button" onClick={logout} value="Logout" />
    )
}