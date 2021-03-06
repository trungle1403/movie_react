import React,{useRef} from 'react'
import PropTypes from 'prop-types'
import './Select.scss'
import Select from 'react-select'

import GenreSelectData from './GenreSelectData'
import CountrySelectData from './CountrySelectData'
import YearSelectData from './YearSelectData'
import RuntimeSelectData from './RuntimeSelectData'
import SortSelectData from './SortSelectData'

const SelectFilter = props => {
    const {onGenreChange, onCountryChange, onYearChange, onRuntimeChange, onSortChange,
                getYear, getCountry, getGenre, getSort, getRuntime, onDisplayChange, type} = props
    
    const optionGenre = GenreSelectData()
    let genreSelected = optionGenre.findIndex(i => i.value === Number(getGenre))

    const optionCountry = CountrySelectData()
    let countrySelected = optionCountry.findIndex(i => i.value === getCountry)

    const optionYear = YearSelectData()
    let yearSelected = optionYear.findIndex(i => i.value === getYear)

    const optionRuntime = RuntimeSelectData()
    let runtimeSelected = optionRuntime.findIndex(i => i.value === Number(getRuntime))

    let sortSelected = 0
    const optionSort = SortSelectData()
    // neu co thay doi sort tu handle thi doi sortSelected
    if(getSort){
        sortSelected = optionSort.findIndex(i => i.value === getSort)
    }


    const handleGenreChange = (genreSelect) => {
        if(!onGenreChange) return;
        onGenreChange(genreSelect)
    }
    const handleCountryChange = (countrySelect) => {
        if(!onCountryChange) return;
        onCountryChange(countrySelect)
    }

    const handleYearChange = (yearSelect) => {
        if(!onYearChange) return;
        onYearChange(yearSelect)
    }

    const handleRuntimeChange = (runtimeSelect) => {
        if(!onRuntimeChange) return;
        onRuntimeChange(runtimeSelect)
    }

    const handleSortChange = (sortSelect) => {
        if(!onSortChange) return;
        onSortChange(sortSelect)
    }

    const gridRef = useRef(null)
    const listRef = useRef(null)
    const handleDisplayChange = (display) => {
        if(!onDisplayChange) return;

        onDisplayChange(display)
        // displayRef.current.classList.toggle("active")
        if(display === "list"){
            listRef.current.classList.add("active")
            gridRef.current.classList.remove("active")
        }else {
            listRef.current.classList.remove("active")
            gridRef.current.classList.add("active")
        }
    }

    const filterShowRef = useRef(null)
    const overlayShowRef = useRef(null)
    const handleShowFilter = () => {
        filterShowRef.current.classList.toggle("active")
        overlayShowRef.current.classList.toggle("active")
    }
    return (
        <div className="container">
            <div className="filter-list" ref={filterShowRef}>
                <div className="filter-item">
                    <label className="filter-label">
                        Th??? lo???i:
                    </label>
                    <Select className="select-react" 
                        defaultValue={{ label: '--- T???t c??? ---', value: "" }} 
                        options={optionGenre} 
                        onChange={handleGenreChange}
                        value={optionGenre[genreSelected]}
                    />
                </div>
                <div className="filter-item">
                    <label className="filter-label">
                        Qu???c gia:
                    </label>
                    <Select className="select-react" 
                        defaultValue={{ label: '--- T???t c??? ---', value: "" }} 
                        options={optionCountry} 
                        onChange={handleCountryChange}
                        value={optionCountry[countrySelected]}
                    />
                </div>
                <div className="filter-item">
                    <label className="filter-label">
                        N??m:
                    </label>
                    <Select className="select-react" 
                        defaultValue={{ label: '--- T???t c??? ---', value: "" }} 
                        options={optionYear} 
                        onChange={handleYearChange}
                        value={optionYear[yearSelected]}
                    />
                </div>
                {type !== "tv" &&
                <div className="filter-item">
                    <label className="filter-label">
                        Th???i l?????ng:
                    </label>
                    <Select className="select-react" 
                        defaultValue={{ label: '--- T???t c??? ---', value: "" }} 
                        options={optionRuntime} 
                        onChange={handleRuntimeChange}
                        value={optionRuntime[runtimeSelected]}
                    />
                </div>
                }
                <div className="filter-item">
                    <label className="filter-label">
                        S???p x???p:
                    </label>
                    <Select className="select-react" 
                        defaultValue={optionSort[sortSelected]} 
                        options={optionSort} 
                        onChange={handleSortChange}
                    />
                </div>
                <div className="filter-item">
                    <label className="filter-label">
                        Hi???n th???:
                    </label>
                    <div className="filter-display">
                        <div className="btn-display active" ref={gridRef} title="GRID LAYOUT"
                            onClick={() => handleDisplayChange("grid")}>
                            <i class='bx bx-grid-alt'></i> 
                        </div>
                        <div className="btn-display" ref={listRef} title="LIST LAYOUT"
                            onClick={() => handleDisplayChange("list")}>
                            <i class='bx bx-list-ul' ></i>
                        </div>
                    </div>
                </div>
                <div className="btn-filter-close" onClick={() => handleShowFilter()}>
                    <i class='bx bx-chevrons-left'></i>
                </div>
            </div>
            <div className="btn-filter-show" onClick={() => handleShowFilter()}>
                <i class='bx bx-slider' ></i>
            </div>
            <div className="filter-overlay" ref={overlayShowRef} onClick={() => handleShowFilter()}></div>
        </div>
    )
}

SelectFilter.propTypes = {
    onGenreChange: PropTypes.func,
    onCountryChange: PropTypes.func,
    onYearChange: PropTypes.func,
    onRuntimeChange: PropTypes.func,
    onSortChange: PropTypes.func,
    getYear: PropTypes.number,
    getCountry: PropTypes.string,
    getGenre: PropTypes.string,
    getSort: PropTypes.string,
    getRuntime: PropTypes.string,
    onDisplayChange: PropTypes.func,
    type: PropTypes.string,
}
SelectFilter.defaultProps = {
    onGenreChange: null,
    onCountryChange: null,
    onYearChange: null,
    onRuntimeChange: null,
    onSortChange: null,
    getYear: null,
    getCountry: null,
    getGenre: null,
    getSort: null,
    getRuntime: null,
    onDisplayChange: null,
    type: null,
}

export default SelectFilter
