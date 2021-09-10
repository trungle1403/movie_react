import React from 'react'
import Header from '../Header/Header'
// import Footer from '../Footer/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../../pages/Home/Home'
import Movie from '../../pages/Movie/Movie'
import Show from '../../pages/Show/Show'
import MovieDetail from '../../pages/MovieDetail/MovieDetail'
import Search from '../../pages/Search/Search'
import { useState } from 'react/cjs/react.development'

const Layout = () => {
    const [movieId, setMovieId] = useState();
    const [movieType, setMovieType] = useState('');
    // const [actor, setActor] = useState({
    //     actorId: '',
    //     name: ''
    // });
    const getMovie = (id, type) => {
        setMovieId(id)
        setMovieType(type)
    };

    return (
        <Router>
            <Route render={props => (
                <div>
                    <Header  {...props} />
                    <Switch>
                        <Route path='/type/movie'>
                            <Movie getMovie={getMovie} />
                        </Route>
                        <Route path='/type/show'>
                            <Show getMovie={getMovie} />
                        </Route>
                        <Route path={`/${movieType}/:slug`}>
                            <MovieDetail type={movieType} id={movieId}/>
                        </Route>
                        <Route exact path="/">
                            <Home getMovie={getMovie}/>
                        </Route>
                        <Route path="/search">
                            <Search  type={movieType} getMovie={getMovie} />
                        </Route>
                    </Switch>
                    {/* <Footer /> */}
                </div>
            )} />
        </Router>
        
    )
}

export default Layout
