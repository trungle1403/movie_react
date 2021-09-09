import {useEffect, useState} from 'react'

const GenreSelectData = () => {

    const [options, setOptions] = useState([])
    const optionTemp = [{
        value: "",
        label: '--- Tất cả ---'
    }]
    options.forEach(item => {
        const temp = {}
        temp.value = item.id
        temp.label = item.name
        optionTemp.push(temp)
    })
    // console.log(optionTemp)
    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=5761f00d4efd80b92ba2496773204780&language=vi";
                const response = await fetch(URL)
                const data = await response.json()
                const {genres} = data
                setOptions(genres)
            }catch(e){
                console.log('failed to fetch genre: ', e.message);
            }
        }
        fetchGenre()
    }, [])
    return optionTemp; // obj option
}

export default GenreSelectData
