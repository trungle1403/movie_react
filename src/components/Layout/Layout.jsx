import React, {useState} from 'react'
import Header from '../Header/Header'
// import Footer from '../Footer/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../../pages/Home/Home'
import Movie from '../../pages/Movie/Movie'
import Show from '../../pages/Show/Show'
import MovieDetail from '../../pages/MovieDetail/MovieDetail'
import Search from '../../pages/Search/Search'
import Collection from '../Collection/Collection'
import Actor from '../Actor/Actor'
import Watch from '../Watch/Watch'
const Layout = () => {
    const [movieName, setMovieName] = useState()
    const [movieSubName, setMovieSubName] = useState()
    const getMovieName = (name,subname) => {
        setMovieName(name)
        setMovieSubName(subname)
    }
    return (
        <Router>
            <Route render={props => (
                <div>
                    <Header  {...props} />
                    <Switch>
                        <Route path='/type/movie'>
                            <Movie />
                        </Route>
                        <Route path='/type/show'>
                            <Show />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/search">
                            <Search />
                        </Route>
                        <Route path="/collection">
                            <Collection />
                        </Route>
                        <Route path="/actor/:slug~:id">
                            <Actor/>
                        </Route>
                        <Route exact path={`/:type/:slug/:id`}>
                            <MovieDetail getMovieName={getMovieName} />
                        </Route>
                        <Route exact path="/watch-:type/:slug~:id">
                        <Watch name={movieName} subName={movieSubName} />
                        </Route>
                    </Switch>
                    {/* <Footer /> */}
                </div>
            )} />
        </Router>
    )
}

export default Layout
