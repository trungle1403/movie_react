const SortSelectData = () => {
    const sortData =[
        {
            value: "popularity.desc",
            label: "Độ phổ biến"
        },
        {
            value: "vote_average.desc",
            label: "Điểm đánh giá"
        },
        {
            value: "vote_count.desc",
            label: "Số lượt đánh giá"
        },
        {
            value: "release_date.desc",
            label: "Ngày phát hành"
        },
    ]

    return sortData
}
export default SortSelectData;