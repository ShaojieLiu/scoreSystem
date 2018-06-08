import React, { Component } from 'react';
import SimpleTable from './SimpleTable';
import {getSum, arrSum} from '../helpers/math';
export default class Experiment extends Component {
    constructor() {
        super()
    }

    state = {
        num: 7,
        rankMatrix: [],
        sum: [],
    }

    render() {
        const tableData = getTableData()
        const {rankObj} = tableData

        return <div>
            随机分数: 
            <SimpleTable {...tableData}/>
            公式: { getTotalFormula.toString() }
            <br/>
            变动量统计: { arrSum(rankObj.slice(-1)[0].slice(1)) }
        </div>
    }
}

const colName = ['评分者', 'A', 'B', 'C', 'D', 'E', 'F', 'G']

const getRandomTable = () => {
    return [
        ['A',1,2,3,4,5,6,7],
        ['B',1,2,3,4,5,6,7],
        ['C',1,2,3,4,5,6,7],
        ['D',1,2,3,4,5,6,7],
        ['E',1,2,3,4,5,6,7],
        ['F',1,2,3,4,5,6,7],
        ['G',1,2,3,4,5,6,7],
        // ['总分',7,14,21,28,35,42,49],
    ]
}

const getRandomAdd = () => {
    return ['附加分',1,2,3,4,5,6,7]
}

const getRank = (arr, name) => {
    let res = arr.slice(1)
    const bigFirst = res.sort((a, b) => a < b)
    res = res.map(v => bigFirst.indexOf(v) + 1)
    res.unshift(name)
    return res
}

const getChange = (arr1, arr2, name) => {
    arr1 = arr1.slice(1)
    arr2 = arr2.slice(1)
    const res = arr1.map((v, i) => Math.abs(arr1[i] - arr2[i]))
    res.unshift(name)
    return res
}

const getTableData = () => {
    const rankObj = getRandomTable()
    const sum = getSum(rankObj)
    const add = getRandomAdd()

    const total1 = getTotal('原始分数', sum)
    const total2 = getTotal('加分后分数', sum, add)

    const rank1 = getRank(total1, '原始排名')
    const rank2 = getRank(total2, '加分后排名')

    const change = getChange(rank1, rank2, '变动量')
    rankObj.push(sum, add, total1, total2, rank1, rank2, change)
    return {needTotal: false, colName, rankObj}
}

const getTotalFormula = (arr1, arr2) => (_, i) => 100 - 0.5 * arr1[i] + 2 * arr2[i]

const getTotal = (name, arr1, arr2) => {
    arr1 = arr1.slice(1)
    arr2 = arr2 ? arr2.slice(1) : arr1.map(v => 0)
    const f = getTotalFormula(arr1, arr2)
    const res = arr1.map(f)
    res.unshift(name) 
    return res   
}






/*
随机产生排名
统计
随机加分
得出变动量
*/