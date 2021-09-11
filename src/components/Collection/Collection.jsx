import React, {useState , useEffect} from 'react'
import PropTypes from 'prop-types'

const Collection = props => {
    
    const storedMovie = localStorage.getItem('movie-storage')
    const [movie, setMovie] = useState( JSON.parse(storedMovie) )
    console.log(movie)
    useEffect(() => {
        
    }, [])
    return (
        <div>
            
        </div>
    )
}

Collection.propTypes = {

}

export default Collection
