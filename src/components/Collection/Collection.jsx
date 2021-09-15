import React, {useState, useEffect} from 'react'
import Poster from '../Poster/Poster'
import Helmet from '../Helmet'
import './Collection.scss'

const Collection = props => {
    let listMovie
    let listTv
    const storedMovie = localStorage.getItem('movie-storage')
    storedMovie == null ? listMovie = [] : listMovie = JSON.parse(storedMovie)
    
    const storedTv = localStorage.getItem('tv-storage')
    storedMovie == null ? listTv = [] : listTv = JSON.parse(storedTv)

    const [movieStored, setMovieStored] = useState(listMovie)
    const [tvStored, setTvStored] = useState(listTv)
    useEffect(() => {
        setMovieStored(movieStored)
        setTvStored(tvStored)

    }, [movieStored,tvStored])
    return (
        <Helmet title={"Bộ sưu tập phim"}>
            <div className="main">
                <div className="container">
                    <h2 className="collection-title">Bộ sưu tập phim của bạn</h2>
                </div>
                <div className="collection-wrapper">
                    <div className="container">
                        <h1 className="page-title">Phim lẻ</h1>
                    </div>
                    {
                        movieStored && movieStored.length !== 0 ? <Poster type={"movie"} movieData={movieStored} />
                        : <div className="container">
                            <div className="collection-note">Bạn chưa thêm phim nào vào danh sách này</div>
                        </div>
                    }
                </div>
                
                

                <div className="container">
                    <h1 className="page-title">Phim bộ</h1>
                </div>
                <div className="collection-wrapper">
                    {
                        tvStored && tvStored.length !== 0 ? <Poster type={"tv"} movieData={tvStored}  />
                        : <div className="container">
                            <div className="collection-note">Bạn chưa thêm phim nào vào danh sách này</div>
                        </div>
                    }
                </div>
                
            </div>
        </Helmet>
    )
}


export default Collection
