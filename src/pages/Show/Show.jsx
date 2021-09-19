import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Helmet from '../../components/Helmet'
import Pagination from '../../components/Pagination/Pagination'
import SectionMovie from '../../components/SectionMovie/SectionMovie'
import Loading from '../../components/Loading/Loading'
import SelectFilter from '../../components/Select/SelectFilter'
import queryString from 'query-string'

//data
import getPageParams from '../../utils/getPageParams'
import getYearParams from '../../utils/getYearParams'
import getCountryParams from '../../utils/getCountryParams'
import getGenreParams from '../../utils/getGenreParams'
import getSortParams from '../../utils/getSortParams'

const Show = props => {
    const [movie, setMovie] = useState([])

    const [limitPage, setLimitPage] = useState(20)
    const [totalPage, setTotalPage] = useState()
    const [loading, setLoading] = useState(true)
    const [display, setDisplay] = useState("grid")

    const getPage = getPageParams();
    const getYear = getYearParams()
    const getCountry = getCountryParams()
    const getGenre = getGenreParams()
    const getSort = getSortParams()

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
    let initialPage = 1
    if(getPage > 0){
        initialPage = getPage
    }  
    // slug params
    const params = {
        genre: initialGenre,
        country: initialCountry,
        year: initialYear,
        sort_by: initialSort,
        page: initialPage,
    }  
    const [filters, setFilters] = useState({
        page: initialPage,
        with_genres: initialGenre,
        with_original_language: initialCountry,
        first_air_date_year: initialYear,
        sort_by: initialSort,
    })

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

    useEffect(() => {
        const fetchMovie = async (specify) => {
            try {
                const params = queryString.stringify(filters)
                const URL = `https://api.themoviedb.org/3/discover/${specify}?api_key=5761f00d4efd80b92ba2496773204780&language=vi&${params}`;
                const response = await fetch(URL)
                const data = await response.json()
                const {results} = data

                setLimitPage(results.length)                
                setTotalPage(data.total_pages)
                setMovie(results)
                setLoading(false)
            }catch (e) {
                console.log(e.message)
            }
        }
        fetchMovie("tv")
    }, [filters])

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
        setFilters({...filters, page: 1,  first_air_date_year: value})
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
    return (
        <Helmet title='Phim Bộ'>
            { loading ? <Loading /> :
                <main className="main">
                    <div className="container">
                        <h1 className="page-title">Phim bộ</h1>
                    </div>

                    <SelectFilter 
                        onGenreChange={handleGenreChange}  getGenre={getGenre}
                        onCountryChange={handleCountryChange}  getCountry={getCountry}
                        onYearChange={handleYearChange} getYear={getYear}
                        onSortChange={handleSortChange} getSort={getSort}
                        onDisplayChange={handleDisplayChange}            
                        type = {"tv"}                       
                    />

                    <SectionMovie 
                        movieData={movie} 
                        number={limitPage} 
                        type={"tv"}
                        display={ display === "list" ? "list" : "grid"}
                        onGenreClick={handleGenreInParams}  
                    />

                    <Pagination page={filters.page} totalPage={totalPage} onPageChange={handlePageChange} />
                </main>
            }
        </Helmet>
    )
}

export default Show
