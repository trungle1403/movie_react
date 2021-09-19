import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import createSlug from '../../utils/slug'
import imgNull from '../../assets/images/user-none.png'
const Movie = props => {
    const {type, movieData} = props
    return (
        <div className="specify-list">
            {
                movieData.map((item,index) => (
                    <div key={index} className="specify-item">
                        <Link 
                            to={`/${type}/${item.id}~${createSlug(item.title || item.name)}`}
                            className="specify-media"
                        >
                            { item.poster_path === null ? <img src={imgNull} alt="" />: <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />}
                        </Link>
                        <Link 
                            to={`/${type}/${item.id}~${createSlug(item.title || item.name)}`}
                            className="specify-name"
                        >
                            {item.name || item.title}
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

Movie.propTypes = {
    type: PropTypes.string.isRequired,
    movieData: PropTypes.array.isRequired
}

export default Movie
