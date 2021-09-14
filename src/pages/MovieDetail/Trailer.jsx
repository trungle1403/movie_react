import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import './Trailer.scss'
import Loading from '../../components/Loading/Loading'
import Popup from '../../components/Popup/Popup'
import imgNull from '../../assets/images/user-none.png'

const Trailer = props => {
    const {id, type} = props
    const [trailer, setTrailer] = useState([])
    const [loading, setLoading] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [keyVideo, setKeyVideo] = useState()

    useEffect(() => {
        const fetchMovieItem = async () => {
            try {
                const URL = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=5761f00d4efd80b92ba2496773204780`;
                const responve = await fetch(URL);
                const data = await responve.json();
                const results = data.results;
                setTrailer(results)
                setLoading(false)
            }catch(e){
                console.log("failed to fetch trailer: ", e.message);
            }
        }
        fetchMovieItem();
    },[id, type])

    const handleTrailerShow = (value) => {
        setKeyVideo(value)
        setShowPopup(!showPopup)
    }

    const handleClosePopup = (value) => {
        if(value === "click"){
            setShowPopup(!showPopup)
        }
    }
    return (
        loading ? <Loading />
        : 
        <div className="trailer-list">
        {
                trailer.map((item, index) => (
                <div key={index} className="trailer-item"
                    onClick={() => handleTrailerShow(item.key)}
                >
                    <div className="trailer-media">
                        { !item.key ? <img src={imgNull} alt="" /> : 
                            <img src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                            alt={item.name} className="trailer-img" />
                        }
                        <div className="icon">
                            <i class='bx bx-play'></i>
                        </div>
                    </div>
                </div>
                ))
        }
        {
            showPopup ? <Popup value={keyVideo} type={"video"} onClickClose={handleClosePopup} /> : ""
        }
        </div>
    )
}

Trailer.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
}

export default Trailer
