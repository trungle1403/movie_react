import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import imgNull from '../../assets/images/user-none.png'
import formatDate from '../../utils/formatDate'
import Loading from '../Loading/Loading'
import './Actor.scss'
import ListFilm from './ListFilm'
import Helmet from '../Helmet'
import ListImage from './ListImage'
const Actor = props => {
    const {id} = useParams()
    const [idValid, setIdValid] = useState(false)
    const [loading, setLoading] = useState(true)
    const [actor, setActor] = useState({})
    const updating = "Đang cập nhật"
    useEffect(() => {
        const fetchActor = async () => {
            try {
                const URL = `https://api.themoviedb.org/3/person/${id}?api_key=5761f00d4efd80b92ba2496773204780&language=vi`;
                const responve = await fetch(URL);
                const data = await responve.json();
                
                // khong tim thay id
                if(data.status_code !== 34){
                    setLoading(false)
                    setIdValid(true)
                    setActor(data)
                    // setLoading(false)
                    // console.log(data)
                }
            }catch(e){
                console.log("failed to fetch actor item: ", e.message);
            }
        }
        fetchActor();
    },[id])
    return (
        loading ?  <Loading /> :
        <Helmet title={`${actor.name} - ${actor.known_for_department}`}>
            <main className="main">
                {
                !idValid ?  <p>Page not found</p>
                : 
                <section className="actor">
                    <div className="container">
                        <div className="actor-container">
                            <div className="actor-sticky">
                                <div className="actor-info">
                                    <div className="actor-media">
                                    {
                                    !actor.profile_path ? <img className="actor-img" src={imgNull} alt="" />
                                        :  <img src={`https://image.tmdb.org/t/p/w342/${actor.profile_path}`} alt="" className="actor-img" />
                                    }
                                    </div>
                                    <dl className="actor-detail">
                                        <dt>Nghề nghiệp</dt>
                                        <dd>{actor.known_for_department}</dd>
                                        <dt>Giới tính</dt>
                                        <dd>{actor.gender === 2 ? "Nam" : "Nữ"} </dd>
                                        <dt>Ngày sinh</dt>
                                        <dd> {actor.birthday !== "" ? formatDate(actor.birthday) : ""} </dd>
                                        <dt>Nơi sinh</dt>
                                        <dd>{actor.place_of_birth}</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="actor-main">
                                <h2 className="actor-name">{actor.name}</h2>
                                <div className="actor-overview">
                                    <div className="section-title">Tiểu sử</div>
                                    <p> {actor.biography !== "" ? actor.biography : updating}</p>
                                </div>
                                <ListFilm id={Number(id)}/>
                                <ListImage id={Number(id)}/>
                            </div>
                        </div>
                    </div>
                </section>
                }
            </main>
        </Helmet>
    )
}

export default Actor
