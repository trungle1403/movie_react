import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Helmet from '../../components/Helmet'
import Loading from '../../components/Loading/Loading'
import GenreSelectData from '../../components/Select/GenreSelectData'
import formatDate from '../../utils/formatDate'
import './MovieDetail.scss'
import Cast from './Cast'


const MovieDetail = props => {
    const {id, type, onGenreClick} = props
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)
    const updating = "Đang cập nhật"
    const optionsGenre = GenreSelectData()
    const showGenre = (arr) => {
        let arrTemp = []
        for(let key in arr){
            arrTemp.push(arr[key].id)
        }
        let options = [];
        for(let i in optionsGenre) {
            let temp = {}
            if(arrTemp.includes(optionsGenre[i].value)){
                temp.value = optionsGenre[i].value
                temp.label = optionsGenre[i].label
                options.push(temp)
            }
        }
        return (
            options.map((item,index) => (
                <Link onClick={() => handleGenreClick(item.value)}
                    key={index} 
                    to={`/type/${type}?genre=${item.value}`} 
                    className="detail-category-link">
                        {item.label}
                </Link>
            ))
        )
    }
    const handleGenreClick = (value) =>{
        if(!onGenreClick) return;
        onGenreClick(value)
        document.documentElement.scrollTop = 0
    }
    useEffect(() => {
        const fetchMovieItem = async () => {
            try {
                const URL = `https://api.themoviedb.org/3/${type}/${id}?api_key=5761f00d4efd80b92ba2496773204780&language=vi`;
                const responve = await fetch(URL);
                const data = await responve.json();
                // const {results} = data;
                setMovie(data)
                setLoading(true)
                console.log(data)
            }catch(e){
                console.log("failed to fetch movie item: ", e.message);
            }
        }
        fetchMovieItem();
    },[id, type])

    
    const storedMovie = localStorage.getItem('movie-storage')
    let listStored
    if(storedMovie == null){
        listStored = []
    }else{
        listStored = JSON.parse(storedMovie)
    } 
    const [movieStored, setMovieStored] = useState(listStored)

    useEffect(() => {
        const showStored = () => {
            const index = listStored.findIndex( item => item === id)
            if( index !== -1) {
                listStored.splice(index, 1)
            }else{
                listStored.push(id)
            }
            localStorage.setItem("movie-storage",JSON.stringify(listStored))
        }
        showStored()
    }, [movieStored]);
    
    const handleCollectionClick = (id) => {
        setMovieStored(listStored)
        
    }
    return (
        <>
            {loading === true ?
            <Helmet title={`${movie.title || movie.name} | Xem phim online chất lượng cao`}>
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
                            <h2 className="detail-subtitle">{movie.original_title || movie.original_name}&nbsp;
                            { movie.release_date ? `(${movie.release_date.slice(0,4)})` : ""}
                            </h2>
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
                            <div className="detail-action">
                                {/* <Link className="btn-custom btn-share-fb" to='/'>Chia sẻ</Link> */}
                                <div className="btn-custom btn-collection" 
                                    onClick={() => handleCollectionClick(movie.id)}>
                                    <i class='bx bx-plus'></i>&nbsp; <span>Bộ sưu tập</span>
                                </div>
                            </div>
                            <div className="detail-category">
                                {showGenre(movie.genres)}
                            </div>
                            <ul className="detail-info">
                                <li>
                                    <span>ĐẠO DIỄN</span> <p>Zack Snyder</p>
                                </li>
                                <li>
                                    <span>QUỐC GIA</span> 
                                    <p>
                                        {movie.production_countries.map((country, index) => {
                                                if(index < 1){
                                                    return(country.name);
                                                }else{
                                                    return(`, ${country.name}`)
                                                }
                                            }
                                            )
                                        }
                                    </p>
                                </li>
                                <li>
                                    <span>KHỞI CHIẾU</span> <p>{movie.release_date ? formatDate(movie.release_date) : updating}</p>
                                </li>
                            </ul>
                            <div className="detail-overview">
                                <span>Mô tả:</span> &nbsp; 
                                {
                                    movie.overview ? movie.overview : updating
                                }
                            </div>
                            <div className="cast">
                                <h3>Diễn viên</h3>
                                <Cast id={id} type={type}  />
                            </div>
                        </div>
                    </div>
                </section>
            </Helmet>

            :   
                <Loading />
            }
        </>
    )
}

MovieDetail.propTypes = {
    type: PropTypes.string,
    id: PropTypes.number,
    onGenreClick: PropTypes.func
}
MovieDetail.propTypes = {
    type: null,
    id: null,
    onGenreClick: null,
}

export default MovieDetail
