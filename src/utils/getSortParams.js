const getSortParams = () => {
    //set dua vao params
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let getSort = params.get('sort_by');
    return getSort;
}
export default getSortParams;