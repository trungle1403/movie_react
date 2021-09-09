const YearSelectData = () => {
    const yearData = [
        {
            value: "",
            label: "--- Tất cả ---"
        },
    ]
    const data = new Date()
    const year = data.getFullYear()
    for(let i = year; i >= 1990 ; i--) {
        const objYear = {}
        objYear.value = i
        objYear.label = `Năm ${i}`
        
        yearData.push(objYear)
    }

    return yearData;
}

export default YearSelectData;