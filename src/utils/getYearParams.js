const getYearParams = () => {
    //set page dua vao params
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let getYear = Number(params.get('year'));
    // console.log(getPage)
    const date = new Date()
    if(getYear <= 1990 && getYear > date.getFullYear) {
        getYear = "";
    }
    return getYear;
}
export default getYearParams;