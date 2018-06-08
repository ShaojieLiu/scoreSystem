export const getSum = rankObj => {
    const total = rankObj[0].map((_, index) => arrSum(rankObj.map(arr => arr[index])))
    total[0] = '求和'
    return total
}

export const arrSum = arr => arr.reduce((prev, curr) => prev + curr, 0)