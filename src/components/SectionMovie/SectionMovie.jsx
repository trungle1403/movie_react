import React from 'react'
import PropTypes from 'prop-types'
import './SectionMovie.scss'
import Poster from '../Poster/Poster'

const SectionMovie = props => {
    const {type, movieData, number, getMovie, title, display} = props
    return (
        <section className="section-movie">
            <div className="container">
            {
                title ? <h2 className="section-title">{title}</h2> : ''
            }
            </div>
            <Poster display={display} type={type} movieData={movieData} number={number} getMovie={getMovie} />
        </section>
    )
}

SectionMovie.propTypes = {
    movieData: PropTypes.array,
    number: PropTypes.number,
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    display: PropTypes.string,
}
SectionMovie.defaultProps = {
    movieData: [],
    number: 8,
    title: '',
    display: ''
}

export default SectionMovie
