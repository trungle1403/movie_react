import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Watch.scss'
const Watch = props => {
    const {name, subName} = props
    const {id, type, slug} = useParams()
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchMovieItem = async () => {
            try {
                const URL = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=5761f00d4efd80b92ba2496773204780`;
                const responve = await fetch(URL);
                const data = await responve.json();
                const results = data.results;
                setMovie(results)
                setLoading(false)
                console.log(data)
            }catch(e){
                console.log("failed to fetch movie watch: ", e.message);
            }
        }
        fetchMovieItem();
    },[id, type])
    const keyList = movie.reduce((arr, item) => {
    if (item.type === "Trailer") {
        arr.push(item.key);
    }
    return arr;
    },[]);
    
    return (
        loading ? <Loading /> :
        <main className="main video">
            <div className="video-container">
                <div class="video-screen">
                    <iframe class="embed"
                        src={`https://www.youtube.com/embed/${keyList[0]}?autoplay=1`}
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen="">
                    </iframe>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="column">
                        <div className="video-name">{name ? name : ""}</div>
                        <div className="video-subname">{subName ? subName : ""}</div>
                        <a href={` https://www.facebook.com/dialog/share?app_id=87741124305&href=https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%${keyList[0]}%26feature%3Dshare&display=popup`} target="_blank" rel="noreferrer"className="btn-custom btn-share-fb">
                            <i class='bx bxl-facebook-square'></i><span>Chia sẻ</span>
                        </a>
                    </div>
                    <div className="column text-right">
                        <div className="btn-custom btn-green">Giao diện học tiếng Anh</div>
                        <Link to={`/${type}/${slug}/${id}`} className="btn-back btn-flex">
                            <i class='bx bx-share'></i>
                            <span>Trở về trang giới thiệu phim</span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
Watch.propTypes = {
    name: PropTypes.string,
    subName: PropTypes.string,
}
Watch.defaultProps = {
    name: null,
    subName: null
}
export default Watch
