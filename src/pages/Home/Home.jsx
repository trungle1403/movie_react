import React from 'react'
import { useState, useEffect } from 'react'
import Helmet from '../../components/Helmet'
import SectionMovie from '../../components/SectionMovie/SectionMovie.jsx'

const Home = props => {

    const {getMovie} = props
    const [movieRecommend, setMovieRecommend] = useState([])
    const [movie, setMovie] = useState([])
    const [movieTv, setMovieTv] = useState([])

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=5761f00d4efd80b92ba2496773204780&language=vi'
                const response = await fetch(URL)
                const data = await response.json()
                const {results} = data
                setMovieRecommend(results)
            }catch (e) {
                console.log('Failed to fetch:', e.message)
            }
        }
        fetchMovie()
    }, [])

    useEffect(() => {
        const fetchMovie = async (specify) => {
            try{
                const URL = `https://api.themoviedb.org/3/discover/${specify}?api_key=5761f00d4efd80b92ba2496773204780&language=vi`;
                const response = await fetch(URL)
                const data = await response.json()
                const {results} = data
                if(specify === 'tv'){
                    setMovieTv(results)
                } else {
                    setMovie(results)
                }
            }catch (e) {
                console.log('Failed to fetch:', e.message);
            }
        };
        fetchMovie("tv");
        fetchMovie("movie")
    }, [])

    return (
        <Helmet>
            <main className="main">
                <SectionMovie type={"movie"} movieData={movieRecommend} number={8} getMovie={getMovie} title={"Phim đề cử"}  />

                <SectionMovie type={"movie"} movieData={movie} number={8} getMovie={getMovie} title={"Phim lẻ chất lượng cao"} />

                <SectionMovie type={"tv"} movieData={movieTv} number={8} getMovie={getMovie} title={"Phim bộ hấp dẫn"}  />
            </main>
        </Helmet>
    )
}
export default Home
