import React from 'react'
import PropTypes from 'prop-types'
import './Popup.scss'
const Popup = props => {
    const {value, type, onClickClose} = props
    const handleClosePopup = (value) => {
        if(!onClickClose) return;

        onClickClose(value)
    }
    return (
        <div className="popup-container" onClick={() => handleClosePopup("click")}>
            <div className="popup-content">
                {type === "image" ? 
                <img src={`https://image.tmdb.org/t/p/w342/${value}`} alt="" />  
                :
                <iframe class="embed"
                    src={`https://www.youtube.com/embed/${value}?autoplay=1`}
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen="">
                </iframe>
                }
            </div>
            <div onClick={() => handleClosePopup("click")} className="popup-close">
                <i class='bx bx-x'></i>
            </div>
        </div>
    )
}

Popup.propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    onClickClose: PropTypes.func
}
Popup.defaultProps = {
    value: null,
    type: null,
    onClickClose: null
}

export default Popup
