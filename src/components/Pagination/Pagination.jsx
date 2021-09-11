import React, { useState , useEffect } from 'react'
import PropTypes from 'prop-types'
import './Pagination.scss'


const Pagination = props => {
    const {page, totalPage, onPageChange} = props

    // nhan duoc page 1 lan duy nhat khi khoi tao
    const [pageCurrent, setPageCurrent] = useState(page)
    //neu component cha muon component con doi pageCurrent theo page thi dung useEffect
    useEffect(() => {
        setPageCurrent(page)
    }, [page])

    const handlePageChange = (newPage) => {
        // console.log(newPage)
        if(!onPageChange) return;
        
        onPageChange(newPage)
        setPageCurrent(newPage)
        
        document.documentElement.scrollTop = 0
    }
    
    // 10 4 - 1 = 3 > 4 => yes
    let listPage = []
    if(totalPage > 5) {
        if(pageCurrent - 1 > 4){
            listPage.push(
                <li key={1} className="pagination-item" onClick={() => handlePageChange(1)}>
                    1
                </li>
            )
        }
        if(pageCurrent - 1 > 5){
            listPage.push(
                <li key={9999998} className="pagination-item">
                    ...
                </li>
            )
        }
    }
    for(let i = 1; i <= totalPage ; i++) {
        if(pageCurrent === i){
            listPage.push(
                <li key={i} className="pagination-item active">
                    {i}
                </li>
            )
        } else {
            if(i > pageCurrent - 5 && i < pageCurrent + 5){
                listPage.push(
                    <li key={i} className="pagination-item" onClick={() => handlePageChange(i)}>
                        {i}
                    </li>
                )
            }
            
        }
    }
    if(totalPage > 5) {
        if(totalPage - pageCurrent > 5) {
            listPage.push(
                <li key={9999999} className="pagination-item">
                    ...
                </li>
            )
        }
        if(totalPage - pageCurrent > 4){
            listPage.push(
                <li key={totalPage} className="pagination-item" onClick={() => handlePageChange(totalPage)}>
                    {totalPage}
                </li>
            )
        }
    }
    return (
            totalPage !== 0 ?
            <div className="container">
                <section className="pagination">
                    <ul className="pagination-list">
                        {listPage}
                    </ul>
                    <div className="pagination-action">
                        <button className="pagination-prev pagination-item"
                            disabled= { page <= 1}
                            onClick= { () => handlePageChange(page - 1) }
                        >
                            Prev
                        </button>
                        <button className="pagination-next pagination-item"
                            disabled= { page >= totalPage}
                            onClick={ () => handlePageChange(page + 1) }
                        >
                            Next
                        </button>
                    </div>
                </section>
            </div>
            : ""
        )
}

Pagination.propTypes = {
    onPageChange: PropTypes.func,
    page: PropTypes.number,
    totalPages: PropTypes.number,
}
Pagination.defaultProps = {
    onPageChange: null,
    page: 1,
    totalPages: null,
}
export default Pagination
