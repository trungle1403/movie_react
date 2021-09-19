import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Helmet from '../../components/Helmet'
import SectionMovie from '../../components/SectionMovie/SectionMovie'
import Pagination from '../../components/Pagination/Pagination'
import SelectFilter from '../../components/Select/SelectFilter'
import Loading from '../../components/Loading/Loading'

//data
import getPageParams from '../../utils/getPageParams'
import getYearParams from '../../utils/getYearParams'
import getCountryParams from '../../utils/getCountryParams'
import getGenreParams from '../../utils/getGenreParams'
import getSortParams from '../../utils/getSortParams'
import getRuntimeParams from '../../utils/getRuntimeParams'

//lib
import queryString from 'query-string'

const Movie = props => {
    const [movie, setMovie] = useState([])
    const [limitPage, setLimitPage] = useState(20)
    const [totalPage, setTotalPage] = useState()

    const [loading, setLoading] = useState(true)
    const [display, setDisplay] = useState("grid")

    //get params => neu co reload trang van thi lay params de thay vao state
    const getPage = getPageParams()
    const getYear = getYearParams()
    const getCountry = getCountryParams()
    const getGenre = getGenreParams()
    const getSort = getSortParams()
    const getRuntime = getRuntimeParams()
    
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
    let initialPage = 1
    if(getPage > 0){
        initialPage = getPage
    }

    // slug params
    const params = {
        genre: initialGenre,
        country: initialCountry,
        year: initialYear,
        runtime: initialRuntime,
        sort_by: initialSort,
        page: initialPage,
    }
    
    const [filters, setFilters] = useState({
        page: initialPage,
        with_genres: initialGenre,
        with_original_language: initialCountry,
        primary_release_year: initialYear,
        with_runtime: initialRuntime,
        sort_by: initialSort,
    })
    const [runTimeOtherBy, setrunTimeOtherBy] = useState("lte")
    // const paramsString = queryString.stringify(filters)
    // console.log(paramsString)
    useEffect(() => {
        const fetchMovie = async (specify) => {
            try {
                const paramsString = `page=${filters.page}&with_genres=${filters.with_genres}&with_original_language=${filters.with_original_language}&primary_release_year=${filters.primary_release_year}&with_runtime.${runTimeOtherBy}=${filters.with_runtime}&sort_by=${filters.sort_by}`

                const URL = `https://api.themoviedb.org/3/discover/${specify}?api_key=5761f00d4efd80b92ba2496773204780&language=vi&${paramsString}`;
                const response = await fetch(URL)
                const data = await response.json()
                let {results} = data

                setMovie(results)
                setLimitPage(results.length)                
                setTotalPage(data.total_pages)
                setLoading(false)
            }catch (e) {
                console.log(e.message)
            }
        }
        fetchMovie("movie")
    }, [filters,runTimeOtherBy])

    const history = useHistory()
    const createParams = (obj) => {
        //delete item null
        for(let key in obj){
            if(obj[key] === ""){
                delete obj[key]
            }
        }
        //set params or not
        history.push(`?${queryString.stringify(obj)}`);
    }

    const handlePageChange = (newPage) => {
        params.page = newPage
        createParams(params)
        setFilters({...filters, page: newPage})
    }
    const handleGenreChange = (genreSelect) => {
        const value = genreSelect.value
        params.genre = value
        params.page = 1
        createParams(params)
        setFilters({...filters, page: 1,  with_genres: value})
    }
    const handleCountryChange = (countrySelect) => {
        const value = countrySelect.value
        params.country = value
        params.page = 1
        createParams(params)
        setFilters({...filters, page: 1,  with_original_language: value})
    }
    const handleYearChange = (yearSelect) => {
        const value = yearSelect.value
        params.page = 1
        params.year = value
        createParams(params)
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
        //reset param
        params.page = 1
        params.runtime = value
        createParams(params)
        setFilters({...filters, page: 1,  with_runtime: value})
    }
    const handleSortChange = (sortSelect) => {
        let value = sortSelect.value
        //reset param
        params.page = 1
        params.sort_by = value
        createParams(params)
        setFilters({...filters, page: 1,  sort_by: value})
    }

    const handleDisplayChange = (display) => {
        setDisplay(display)
    }

    const handleGenreInParams = (value) => {
        setFilters({...filters, page: 1, with_genres: value})
    }
    return(
        <Helmet title='Phim Lẻ'>
            { loading ? <Loading /> :
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
                        display={ display === "list" ? "list" : "grid"}
                        onGenreClick={handleGenreInParams}
                    />

                    <Pagination page={filters.page} totalPage={totalPage} onPageChange={handlePageChange} />
                </main>
            }
        </Helmet>
    )
}


export default Movie
