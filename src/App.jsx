import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';


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
  const [dSearchQuery, setDSearchQuery] = useState('')
  const [trendingMovies, setTrendingMovies] = useState([])

  useDebounce(() => setDSearchQuery(searchQuery), 500, [searchQuery])

  const fetchMovies = async (query = '') => {
    setMoviesList([])
    let url;
    if (query == '') {
      url = `${API_URL}/discover/movie?sort_by=popularity.desc`
    }
    else {
      url = `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
    }
    setIsLoading(true)
    fetch(url, API_OPTIONS)
      .then(res => res.json()
        .then(async (data) => {
          if (data.Response === 'False') {
            console.log(data.Error)
            setErrMessage('Something went wrong. Please try again later.')
            setMoviesList([])
          }
          else {
            setMoviesList(data.results || [])
            if (query && data.results.length > 0) {
              await updateSearchCount(query, data.results[0])

            }
          }
        })
      )
      .catch(err => {
        console.log(err)
        setErrMessage(`Error fetching data. Please try again later.`)
      })
    setIsLoading(false)
  }

  const loadTreendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      console.log(trendingMovies)
      setTrendingMovies(trendingMovies)
    }
    catch {

    }
  }

  useEffect(() => {
    fetchMovies(dSearchQuery)
  }, [dSearchQuery])

  useEffect(() => {
    loadTreendingMovies()
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

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.posterUrl} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

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
