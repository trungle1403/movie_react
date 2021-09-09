import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Helmet from '../../components/Helmet'
import './MovieDetail.scss'
import { Link, useParams } from 'react-router-dom'

const MovieDetail = props => {
    const {id, type} = props
    // const id = 1
    // const type = 'movie'
    // const  {slug} = useParams()
    // console.log(slug)

    const [movie, setMovie] = useState({})


    
    useEffect(() => {
        const fetchMovieItem = async () => {
            try {
                const URL = `https://api.themoviedb.org/3/${type}/${id}?api_key=5761f00d4efd80b92ba2496773204780&language=vi`;
                const responve = await fetch(URL);
                const data = await responve.json();
                // const {results} = data;
                setMovie(data)
                const title =  data.title || data.name;
                const subtitle = data.original_title || data.original_name
                document.title = title +' - '+ subtitle + ' | Xem phim online chất lượng cao'
                // console.log(data)
            }catch(e){
                console.log("failed to fetch movie item: ", e.message);
            }
        }
        fetchMovieItem();
    },[])
    return (
        <Helmet>
            <section className="detail">
                <div className="backdrop" style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}></div>
                <div className=" container detail-container grid">
                    <div className="detail-media">
                        <div className="detail-media-img">
                            <img src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt="" className="detail-img" />
                        </div>
                        <Link to='/view/' className='btn-custom btn-view'> <i class='bx bx-play'></i> 
                        <span>Xem phim</span></Link>
                    </div>
                    <div className="detail-content">
                        <h1 className="detail-title">{movie.title || movie.name}</h1>
                        <h2 className="detail-subtitle">{movie.original_title || movie.original_name}</h2>
                        <div className="detail-time" 
                        style={
                            type === "tv" ? {display: "none"} : {display: "inline-block"}
                        }
                        >
                            {Math.floor(movie.runtime / 60)} giờ {movie.runtime % 60} phút
                        </div>
                        <div className="text detail-votes">
                            <span className="detail-logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M44 13H4c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V17c0-2.2-1.8-4-4-4z" fill="#ffc107"></path><path d="M28.102 18h-3.704v13.102h3.704c2 0 2.796-.403 3.296-.704.602-.398.903-1.097.903-1.796v-7.903c0-.898-.403-1.699-.903-2-.796-.5-1.097-.699-3.296-.699zm.699 10.3c0 .598-.7.598-1.301.598V20c.602 0 1.3 0 1.3.602zM33.8 18v13.3h2.802s.199-.902.398-.698c.398 0 1.5.597 2.2.597.698 0 1.1 0 1.5-.199.6-.398.698-.7.698-1.3v-7.802c0-1.097-1.097-1.796-2-1.796-.898 0-1.796.597-2.199.898v-3zm3.598 4.2c0-.4 0-.598.403-.598.199 0 .398.199.398.597v6.602c0 .398 0 .597-.398.597-.2 0-.403-.199-.403-.597zM22.7 31.3V18h-4.4l-.8 6.3-1.102-6.3h-4v13.3h2.903v-7.402l1.3 7.403h2l1.297-7.403v7.403zM7.602 18h3.097v13.3H7.602z" fill="#263238"></path>
                                </svg>
                            </span>
                            <span className="detail-score">{movie.vote_average} </span>
                            <span className="detail-vote"> ({movie.vote_count} votes)</span>
                        </div>
                        {/* <div className="detail-category">
                            <Link className="detail-category-link" to='/'>Phieu luu</Link>
                            <Link className="detail-category-link" to='/'>Hang dong</Link>
                        </div>
                        <div className="detail-action">
                            <Link className="btn-custom btn-share-fb" to='/'>Chia sẻ</Link>
                            <div className="btn-custom btn-collection">
                            <i class='bx bx-plus'></i> <span>Bộ sưu tập</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </Helmet>
    )
}

MovieDetail.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

export default MovieDetail
