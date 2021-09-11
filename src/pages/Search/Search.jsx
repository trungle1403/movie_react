import React,{ useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import './Search.scss'
import Poster from '../../components/Poster/Poster'
import Pagination from '../../components/Pagination/Pagination'
import Select from 'react-select'
const Search = props => {
    const  {getMovie} = props
    // console.log(getMovie)
    const [input, setInput] = useState("")
    const [movieData, setMovieData] = useState([])
    const typingHandleRef = useRef(null)
    const [optionsData, setOptionsData] = useState("movie")
    const [filters, setFilters] = useState({
        page: 1
    })
    const [totalPage, setTotalPage] = useState(0)
    const options = [
        { 
            value: "movie", 
            label: "Phim lẻ"
        },
        { 
            value: "tv", 
            label: "Phim bộ"
        },
    ]
    useEffect(() => {
        const fetchMovie = async (searchValue) => {
            try{
                if(searchValue === "") return;
                const URL = `https://api.themoviedb.org/3/search/${optionsData}?api_key=5761f00d4efd80b92ba2496773204780&language=vi&query=${searchValue}&page=${filters.page}`;
                const response = await fetch(URL)
                const data = await response.json()
                let {results} = data;
                results = results.filter( i => i.poster_path !== null)
                setMovieData(results)
                const total_page = data.total_pages
                setTotalPage(total_page)
                // setTotal({...total, totalMovie: results });
            }catch(e){
                console.log("fetch failed: " + e.message)
            }
            
        }
        fetchMovie(input)
    }, [input,optionsData,filters])
    
    
    const handleInputChange = (e) => {
        const value = e.target.value
        if(typingHandleRef.current){
            clearTimeout(typingHandleRef.current)
        }
        typingHandleRef.current = setTimeout(() =>{
            setInput(value)
            setFilters({...filters, page: 1})
        }, 300)
    }

    const handleOptionChange = (option) => {
        const value = option.value
        setOptionsData(value)
        setFilters({...filters, page: 1})
    }
    const handlePageChange = (newPage) => {
        setFilters({...filters, page: newPage})
    }
    return (
        <main className="main">
            <div className="search-wrapper">
                <div className="container search-container">
                    <Select className="search-select" 
                        options={options} 
                        defaultValue={options[0]} 
                        onChange={handleOptionChange}
                    />
                    <input type="text" onChange={handleInputChange}  className="search-input" placeholder="Nhập tên phim..." />
                </div>
                <br />
                <Poster movieData={movieData} type={optionsData} getMovie={getMovie} />
                <br />
                <Pagination page={filters.page} totalPage={totalPage} onPageChange={handlePageChange} />
            </div>
        </main>
    )
}

Search.propTypes = {
    getMovie: PropTypes.func,
}
Search.propTypes = {
    getMovie: null,
}

export default Search
