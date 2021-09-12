import React, { useEffect, useState} from 'react'
import Helmet from '../../components/Helmet'
import Pagination from '../../components/Pagination/Pagination'
import SectionMovie from '../../components/SectionMovie/SectionMovie'
import getPageParams from '../../utils/getPageParams'
import Loading from '../../components/Loading/Loading'

const Show = props => {
    const [movie, setMovie] = useState([])

    const [limitPage, setLimitPage] = useState(20)
    const [totalPage, setTotalPage] = useState()
    const [loading, setLoading] = useState(true)

    const getPage = getPageParams();

    const [filters, setFilters] = useState({
        page: getPage,
    })

    const handlePageChange = (newPage) => {
        // console.log(newPage)
        setFilters({...filters, page: newPage })
        document.documentElement.scrollTop = 0

    }
    useEffect(() => {
        const fetchMovie = async (specify) => {
            try {
                const URL = `https://api.themoviedb.org/3/discover/${specify}?api_key=5761f00d4efd80b92ba2496773204780&language=vi&page=${filters.page}`;
                const response = await fetch(URL)
                const data = await response.json()
                const {results} = data
                const total_page = data.total_pages

                setLimitPage(results.length)                
                setTotalPage(total_page)
                setMovie(results)
                setLoading(false)
                // console.log('phim bo: ', data)
            }catch (e) {
                console.log(e.message)
            }
        }
        fetchMovie("tv")
    }, [filters])
    return (
        <Helmet title='Phim Bộ'>
            { loading ? <Loading /> :
                <main className="main">
                    <div className="container">
                        <h1 className="page-title">Phim bộ</h1>
                    </div>
                    <SectionMovie movieData={movie} number={limitPage} type={"tv"}  />

                    <Pagination page={filters.page} totalPage={totalPage} onPageChange={handlePageChange} />
                </main>
            }
        </Helmet>
    )
}

export default Show
