const getPageParams = () => {
    //set page dua vao params
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let getPage = Number(params.get('page'));
    // console.log(getPage)
    if(getPage === 0) {
        getPage = 1;
    }
    return getPage;
}
export default getPageParams;