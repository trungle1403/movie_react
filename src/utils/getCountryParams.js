const getCountryParams = () => {
    //set dua vao params
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let getCountry = params.get('country');
    return getCountry;
}
export default getCountryParams;