import React, {useState , useEffect} from 'react'
import PropTypes from 'prop-types'
import Loading from '../Loading/Loading'
import imgNull from '../../assets/images/user-none.png'
const ListImage = props => {
    const {id} = props

    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const URL = `https://api.themoviedb.org/3/person/${id}/images?api_key=5761f00d4efd80b92ba2496773204780&language=vi`;
                const responve = await fetch(URL);
                const data = await responve.json();
                const {profiles} = data

                // khong tim thay id
                if(data.status_code !== 34){
                    setImages(profiles)
                    setLoading(false)
                }
            }catch(e){
                console.log("failed to fetch images: ", e.message);
            }
        }
        fetchImage();
    },[id])
    return (
        <>
            <div className="section-title">Hình ảnh</div>
            {!images.length ? <div className="actor-title">Không có hình ảnh nào...</div> :  
                <> 
                { loading ? <Loading/> :  
                    <div className="specify-list">
                        {
                            images.map((item, index) => (
                                <div key={index} className="images-item">
                                    { !item.file_path ? <img src={imgNull} alt="" />
                                    : <img src={`https://image.tmdb.org/t/p/w342/${item.file_path}`} alt="" /> 
                                    }
                                </div>
                            ))
                        }
                    </div>
                }
                </>
            }
        </>
    )
}

ListImage.propTypes = {
    id: PropTypes.number.isRequired
}

export default ListImage
