const getRuntimeParams = () => {
    //set dua vao params
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let getRuntime = params.get('runtime');
    return getRuntime;
}
export default getRuntimeParams;