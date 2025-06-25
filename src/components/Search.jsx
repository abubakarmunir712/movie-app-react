import React from 'react'

const Search = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className='search'>
            <div>
                <img src="search.svg" alt="Search" className=''/>
                <input type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Search