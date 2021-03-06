import React, {useState , useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import imgNull from '../../assets/images/user-none.png'
import createSlug from '../../utils/slug'
import './Cast.scss'

const Cast = props => {
    const {id, type} = props
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(false)
    
      useEffect(() => {
        const fetchCast = async () => {
          try {
                  const URL = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=5761f00d4efd80b92ba2496773204780&language=vi`;
                  const responve = await fetch(URL);
                  const data = await responve.json();
                  const {cast} = data;
                  setCast(cast)
                  setLoading(true)
                  // console.log('cast: ',cast)
              }catch(e){
                  console.log("failed to fetch cast item: ", e.message);
              }
          }
        fetchCast();
    },[id, type])
    return (
      loading ? 
      <div className="cast-list">
        {
          cast.map((item, index) => (
            <div key={index} className="cast-item">
                <Link to={`/actor/${createSlug( item.name)}~${item.id}`} className="cast-media">
                    <figure>
                      {
                        item.profile_path !== null ? <img src={`https://image.tmdb.org/t/p/w138_and_h175_face/${item.profile_path}`} alt="" className="cast-img" />
                        : <img src={imgNull} alt="" className="cast-img" />
                      }
                    
                    </figure>
                </Link>
                <div className="cast-name">{item.name}</div>
                <div className="cast-character">{item.character}</div>
            </div>
          ))
        }
      </div>
      : <Loading/>
    )
}

Cast.propTypes = {
    id: PropTypes.number,
    type:PropTypes.string
}
Cast.defaultProps = {
    id: null,
    type: null
}

export default Cast
