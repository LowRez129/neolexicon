import './MenuBar.css';

export default function MenuBar () {
    return (
        <section className="menu-bar">
            <div>
                <input type="button" onClick={() => window.location.href = "/sign-in"} value="Sign In" style={{width: "50%"}} />
                <input type="button" onClick={() => window.location.href = "/login"} value="Login" style={{width: "50%"}} />
            </div>
            <form style={{display: "flex"}}>
                <input style={{width: "100%"}} placeholder='Search'/>
                <button>Enter</button>
            </form>
        </section>
    )
}