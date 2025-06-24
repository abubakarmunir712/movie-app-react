import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';


const API_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${TMDB_API_KEY}`
  }
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [moviesList, setMoviesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const fetchMovies = () => {
    let url = `${API_URL}/discover/movie?sort_by=popularity.desc`
    setIsLoading(true)
    fetch(url, API_OPTIONS)
      .then(res => res.json()
        .then(data => {
          if (data.Response === 'False') {
            console.log(data.Error)
            setErrMessage('Something went wrong. Please try again later.')
            setMoviesList([])
          }
          else {
            setMoviesList(data.results || [])
          }
        })
      )
      .catch(err => {
        console.log(err)
        setErrMessage(`Error fetching data. Please try again later.`)
      })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMovies()
  }, [])
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Banner" />
          <h1>Find <span className='text-gradient'>
            Movies
          </span> You'll Enjoy Without the Hassle</h1>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-10'>
            All Movies
          </h2>
          {isLoading ?
            (<Spinner />) : errMessage ? (<p>{errMessage}</p>) :
              <ul>{
                moviesList.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                )
                )}</ul>}
        </section>
      </div>
    </main>
  )
}

export default App
