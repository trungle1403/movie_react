import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from '../../utils/formatDate'
import GenreSelectData from '../Select/GenreSelectData'
import './Poster.scss'

const Poster = props => {
    const {type, movieData, number, display, onGenreClick} = props

    movieData.splice(number, movieData.length - number);

    const optionsGenre = GenreSelectData()
    
    const handleGenreClick = (value) =>{
        if(!onGenreClick) return;
        onGenreClick(value)
        document.documentElement.scrollTop = 0
    }
    const showGenre = (arr) => {
        let options = [];
        for(let i in optionsGenre) {
            let temp = {}
            if(arr.includes(optionsGenre[i].value)){
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
                    className="movie-genre-item">
                        {item.label}
                </Link>
            ))
        )
    }
    if(display === "list"){
        return (
            <div className="container">
                <div className="movie-list display-list">
                    {
                        movieData.map((item, index) => (
                            <div key={index} className="movie-item">
                                <div className="content-left">
                                    <Link to={`/${type}/${item.id}`} className="movie-media">
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" className="movie-poster" />
                                    </Link>
                                </div>
                                <div className="content-right">
                                    <div className="content-row">
                                        <div className="content-column">
                                            <Link to={`/${type}/${item.id}`}  className="movie-link movie-title">{item.title || item.name}</Link>
                                            <Link to={`/${type}/${item.id}`}  className="movie-link movie-subtitle">
                                                {item.original_title || item.original_name}</Link>
                                        </div>
                                        <div className="content-column">
                                            <div className="meta text-right">
                                                <span className="movie-logo">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                                        <path d="M44 13H4c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V17c0-2.2-1.8-4-4-4z" fill="#ffc107"></path><path d="M28.102 18h-3.704v13.102h3.704c2 0 2.796-.403 3.296-.704.602-.398.903-1.097.903-1.796v-7.903c0-.898-.403-1.699-.903-2-.796-.5-1.097-.699-3.296-.699zm.699 10.3c0 .598-.7.598-1.301.598V20c.602 0 1.3 0 1.3.602zM33.8 18v13.3h2.802s.199-.902.398-.698c.398 0 1.5.597 2.2.597.698 0 1.1 0 1.5-.199.6-.398.698-.7.698-1.3v-7.802c0-1.097-1.097-1.796-2-1.796-.898 0-1.796.597-2.199.898v-3zm3.598 4.2c0-.4 0-.598.403-.598.199 0 .398.199.398.597v6.602c0 .398 0 .597-.398.597-.2 0-.403-.199-.403-.597zM22.7 31.3V18h-4.4l-.8 6.3-1.102-6.3h-4v13.3h2.903v-7.402l1.3 7.403h2l1.297-7.403v7.403zM7.602 18h3.097v13.3H7.602z" fill="#263238"></path>
                                                    </svg>
                                                </span>
                                                <span className="movie-score">{item.vote_average}</span>
                                            </div>
                                            <p className="movie-date text-right">{formatDate(item.release_date)}</p>
                                        </div>
                                    </div>
                                    <p className="text movie-overview">
                                        {item.overview}
                                    </p>
                                    <div className="content-row row-reserve info-footer">
                                        <div className="content-column">
                                            <div className="movie-genre-list">
                                                {
                                                    showGenre(item.genre_ids)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }else{
        return (
            <div className="container">
                <div className="movie-list">
                    {
                        movieData.map((item, index) => (
                            <div key={index} className="movie-item">
                                <Link to={`/${type}/${item.id}`}className="movie-media">
                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" className="movie-poster" />
                                </Link>
                                <Link to={`/${type}/${item.id}`}  className="movie-link movie-title">{item.title || item.name}</Link>
                                <Link to={`/${type}/${item.id}`}  className="movie-link movie-subtitle">
                                    {item.original_title || item.original_name}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
    
}

Poster.propTypes = {
    movieData: PropTypes.array,
    number: PropTypes.number,
    id: PropTypes.number,
    type: PropTypes.string.isRequired,
    display: PropTypes.string,
    onGenreClick: PropTypes.func,
}
Poster.defaultProps = {
    movieData: [],
    number: 16,
    display: "",
    onGenreClick: null
}

export default Poster
