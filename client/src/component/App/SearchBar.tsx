export default function SearchBar () {
    

    return (
        <form className='searchbar' style={{display: "grid", gridTemplateColumns: "80% 20%"}}>
                <input placeholder='Search'/>
                <button>Enter</button>
        </form>
    )
}