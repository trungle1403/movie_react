import React from 'react'
import Header from '../Header/Header'
// import Footer from '../Footer/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../../pages/Home/Home'
import Movie from '../../pages/Movie/Movie'
import Show from '../../pages/Show/Show'
import MovieDetail from '../../pages/MovieDetail/MovieDetail'
import Search from '../../pages/Search/Search'
import Collection from '../Collection/Collection'
const Layout = () => {
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
                        <Route path={`/:type/:id`}>
                            <MovieDetail />
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
                        
                    </Switch>
                    {/* <Footer /> */}
                </div>
            )} />
        </Router>
    )
}

export default Layout
