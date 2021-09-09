const getGenreParams = () => {
    //set dua vao params
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let getGenre = params.get('genre');
    return getGenre;
}
export default getGenreParams;