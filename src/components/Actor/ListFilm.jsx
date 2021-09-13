import React, {useState , useEffect} from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'
import Loading from '../Loading/Loading'
const ListFilm = props => {
    const {id} = props
    const [tv, setTv] = useState([])
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const fetchMovie = async (specify) => {
            try {
                const URL = `https://api.themoviedb.org/3/person/${id}/${specify}?api_key=5761f00d4efd80b92ba2496773204780&language=vi`;
                const responve = await fetch(URL);
                const data = await responve.json();
                const {cast} = data
                // khong tim thay id
                if(data.status_code !== 34){
                    // setIdValid(true)
                    if(specify === "tv_credits"){
                        setTv(cast)
                        setLoading(false)
                    }else{
                        setMovie(cast)
                        setLoading(false)
                    }
                    // console.log(cast)
                }
            }catch(e){
                console.log("failed to fetch actor item: ", e.message);
            }
        }
        fetchMovie("tv_credits");
        fetchMovie("movie_credits");
    },[id])
    return (
        <>
            <div className="section-title">Phim lẻ</div>
            {!movie.length ? <div className="actor-title">Không có bộ phim nào...</div> 
                :  
                <>
                    {loading ? <Loading/> :  <Movie type="movie" movieData={movie}/>} 
                </> 
            }
            
            <div className="section-title">Phim bộ</div>
            {!tv.length ? <div className="actor-title">Không có bộ phim nào...</div> 
                :  
                <>
                    {loading ? <Loading/> :  <Movie type="tv" movieData={tv}/>} 
                </> 
            }
        </>   
    )
}

ListFilm.propTypes = {
    id: PropTypes.number.isRequired
}

export default ListFilm
