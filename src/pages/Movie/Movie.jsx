import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import Helmet from '../../components/Helmet'
import SectionMovie from '../../components/SectionMovie/SectionMovie'
import Pagination from '../../components/Pagination/Pagination'
import SelectFilter from '../../components/Select/SelectFilter'

//data
import getPageParams from '../../utils/getPageParams'
import getYearParams from '../../utils/getYearParams'
import getCountryParams from '../../utils/getCountryParams'
import getGenreParams from '../../utils/getGenreParams'
import getSortParams from '../../utils/getSortParams'
import getRuntimeParams from '../../utils/getRuntimeParams'

//lib
// import queryString from 'query-string'

const createParams = (obj, history, params) => {
    //delete item null
    for(let key in obj){
        if(obj[key] === ""){
            delete obj[key]
        }
    }
    //set params or not
    // history.push(`?${queryString.stringify(params)}`);
}
const Movie = props => {
    const {getMovie} = props
    const [movie, setMovie] = useState([])
    const [limitPage, setLimitPage] = useState(20)
    const [totalPage, setTotalPage] = useState()

    const [loading, setLoading] = useState(true)
    const [display, setDisplay] = useState("grid")

    // const displayRef = useRef(null)
    const history = useHistory()

    //get params => neu co reload trang van thi lay params de thay vao state
    const getPage = getPageParams()
    const getYear = getYearParams()
    const getCountry = getCountryParams()
    const getGenre = getGenreParams()
    const getSort = getSortParams()
    const getRuntime = getRuntimeParams()
    // console.log(getRuntime)
    
    //neu co reload thi bien se cap nhat theo params nguoc lai la chuoi rong
    let initialGenre = ""
    if(getGenre != null){
        initialGenre = getGenre
    }
    let initialCountry = ""
    if(getCountry != null){
        initialCountry = getCountry
    }
    let initialYear = ""
    if(getYear !== 0){
        initialYear = getYear
    }
    let initialSort = "popularity.desc"
    if(getSort != null){
        initialSort = getSort
    }
    let initialRuntime = ""
    if(getRuntime != null){
        initialRuntime = getRuntime
    }
    //state de tao slug params
    const [params, setParams] = useState({
        genre: initialGenre,
        country: initialCountry,
        year: initialYear,
        page: getPage,
        runtime: initialRuntime,
        sort_by: initialSort
    })
    // console.log('params',params)
    
    const [filters, setFilters] = useState({
        page: getPage, // dua vao params
        with_genres: initialGenre,
        with_original_language: initialCountry,
        primary_release_year: initialYear,
        with_runtime: initialRuntime,
        sort_by: initialSort,
    })
    const [runTimeOtherBy, setrunTimeOtherBy] = useState("lte")
    // const paramsString = queryString.stringify(filters)
    const paramsString = `page=${filters.page}&with_genres=${filters.with_genres}&with_original_language=${filters.with_original_language}&primary_release_year=${filters.primary_release_year}&with_runtime.${runTimeOtherBy}=${filters.with_runtime}&sort_by=${filters.sort_by}`
    // console.log(paramsString)
    useEffect(() => {
        const fetchMovie = async (specify) => {
            try {
                const URL = `https://api.themoviedb.org/3/discover/${specify}?api_key=5761f00d4efd80b92ba2496773204780&language=vi&${paramsString}`;
                const response = await fetch(URL)
                const data = await response.json()
                let {results} = data
                const total_page = data.total_pages

                results = results.filter( i => i.poster_path !== null)
                setLimitPage(results.length)                
                setMovie(results)
                setTotalPage(total_page)
                setLoading(false)
                // console.log('phim le: ', results)
                // console.log('trang: ', filters.page)
            }catch (e) {
                console.log(e.message)
            }
        }
        fetchMovie("movie")
    }, [filters])

    const handlePageChange = (newPage) => {
        // console.log('phim le: ', newPage)
        setParams({...params, page: newPage})
        params.page = newPage
        createParams(params, history, params)

        setFilters({...filters, page: newPage})
    }
    const handleGenreChange = (genreSelect) => {
        // genre is obj
        const value = genreSelect.value
        setParams({...params, page: 1, genre: value})

        params.genre = value
        params.page = 1
        createParams(params, history, params)

        //reset param
        setFilters({...filters, page: 1,  with_genres: value})
    }
    const handleCountryChange = (countrySelect) => {
        const value = countrySelect.value
        //reset param
        params.country = value
        setParams({...params, page: 1, country: value})

        params.page = 1
        createParams(params, history, params)

        setFilters({...filters, page: 1,  with_original_language: value})
    }
    const handleYearChange = (yearSelect) => {
        const value = yearSelect.value
        setParams({...params, page: 1, year: value})
        //reset param
        params.page = 1
        params.year = value
        createParams(params, history, params)

        setFilters({...filters, page: 1,  primary_release_year: value})
    }
    const handleRuntimeChange = (runtimeSelect) => {
        let value = runtimeSelect.value
        if(value !== ""){
            value = Number(value)
        }
        if(value === 180) {
            setrunTimeOtherBy("gte")
        }else{
            setrunTimeOtherBy("lte")
        }
        setParams({...params, page: 1, runtime: value})
        //reset param
        params.page = 1
        params.runtime = value
        createParams(params, history, params)

        setFilters({...filters, page: 1,  with_runtime: value})
    }
    const handleSortChange = (sortSelect) => {
        let value = sortSelect.value
        
        setParams({...params, page: 1, sort_by: value})
        //reset param
        params.page = 1
        params.sort_by = value
        createParams(params, history, params)

        setFilters({...filters, page: 1,  sort_by: value})
    }

    const handleDisplayChange = (display) => {
        // console.log(display)
        setDisplay(display)
    }
    if(loading){
        return(
            <main className="main">
                <div className="container">
                    <div>Loading...</div>
                </div>
            </main>
        )
    }else{
        return (
            <Helmet title='Phim Lẻ'>
                <main className="main">
                    <div className="container">
                        <h1 className="page-title">Phim lẻ</h1>
                    </div>

                    <SelectFilter 
                        onGenreChange={handleGenreChange}  getGenre={getGenre}
                        onCountryChange={handleCountryChange}  getCountry={getCountry}
                        onYearChange={handleYearChange} getYear={getYear}
                        onRuntimeChange={handleRuntimeChange} getRuntime={getRuntime}
                        onSortChange={handleSortChange} getSort={getSort}
                        onDisplayChange={handleDisplayChange} 
                    />

                    <SectionMovie 
                        movieData={movie} 
                        number={limitPage} 
                        type={"movie"} 
                        getMovie={getMovie} 
                        display={ display === "list" ? "list" : "grid"}
                    />

                    <Pagination page={filters.page} totalPage={totalPage} onPageChange={handlePageChange} />
                </main>
            </Helmet>
        )
    }
}

Movie.propTypes = {
    getMovie: PropTypes.func
}
Movie.propTypes = {
    getMovie: null
}

export default Movie
