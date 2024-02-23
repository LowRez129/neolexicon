import './MenuBar.css';

export default function MenuBar () {
    return (
        <section className="menu-bar">
            <a href='/sign-in' >Sign In</a>
            <a href='/login'>Login</a>
            <form style={{display: "flex"}}>
                <input style={{width: "100%"}} placeholder='Search'/>
                <button>Enter</button>
            </form>
        </section>
    )
}