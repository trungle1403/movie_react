const RuntimeSelectData = () => {
    const runtimeData = [
        {
            value: "",
            label: "--- Tất cả ---"
        },
        {
            value: 59,
            label: "Dưới 1 tiếng"
        },
        {
            value: 119,
            label: "Dưới 2 tiếng"
        },
        {
            value: 179,
            label: "Dưới 3 tiếng"
        },
        {
            value: 180,
            label: "Trên 3 tiếng"
        },
    ]
    return runtimeData;
}

export default RuntimeSelectData;