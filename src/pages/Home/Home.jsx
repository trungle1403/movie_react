import React from 'react'
import { useState, useEffect } from 'react'
import Helmet from '../../components/Helmet'
import Loading from '../../components/Loading/Loading'
import SectionMovie from '../../components/SectionMovie/SectionMovie.jsx'

const Home = () => {

    const [movieRecommend, setMovieRecommend] = useState([])
    const [movie, setMovie] = useState([])
    const [movieTv, setMovieTv] = useState([])
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=5761f00d4efd80b92ba2496773204780&language=vi'
                const response = await fetch(URL)
                const data = await response.json()
                const {results} = data
                setMovieRecommend(results)
                setLoading1(false)
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
                setLoading2(false)
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
                {
                    loading1 ? <Loading/> : <SectionMovie type={"movie"} movieData={movieRecommend} number={8} title={"Phim đề cử"}  />
                }
                {
                    loading2 ? <Loading/> : <SectionMovie type={"movie"} movieData={movie} number={8} title={"Phim lẻ chất lượng cao"} />
                }
                {
                    loading2 ? <Loading/> : <SectionMovie type={"tv"} movieData={movieTv} number={8} title={"Phim bộ hấp dẫn"}  />
                }
            </main>
        </Helmet>
    )
}
export default Home
