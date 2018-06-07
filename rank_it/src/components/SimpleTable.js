import React, { Component } from 'react';
import {Table} from 'antd'
import _ from 'lodash'
export default class SimpleTable extends Component {
    render() {

      // const {colName, rankObj, needTotal} = this.this.props

      const needTotal = true
      const colName = ['评分者', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
      const rankObj = [
        ['A',1,2,3,4,5,6,7],
        ['B',1,2,3,4,5,6,7],
        ['C',1,2,3,4,5,6,7],
        ['D',1,2,3,4,5,6,7],
        ['E',1,2,3,4,5,6,7],
        ['F',1,2,3,4,5,6,7],
        ['G',1,2,3,4,5,6,7],
        
        // ['总分',7,14,21,28,35,42,49],
      ]
      const total = rankObj[0].map((_, index) => arrSum(rankObj.map(arr => arr[index])))
      total[0] = '总分'

      needTotal && rankObj.push(total)

      // rankObj.map(obj => _.map(obj, (arr, owner) => arr.unshift(owner)))
      const dataSource = rankObj.map(arr => {
        const owner = arr[0]
        const rank = {}
        colName.map((n, i) => rank[n] = arr[i])
        return {key: owner, name: owner, ...rank}
      })
      const columns = colName.map(name => ({title: name, dataIndex: name, key: name}))
      //   const dataSource = [{
      //       key: '1',
      //       name: '胡彦斌',
      //       age: 32,
      //       address: '西湖区湖底公园1号'
      //     }, {
      //       key: '2',
      //       name: '胡彦祖',
      //       age: 42,
      //       address: '西湖区湖底公园1号'
      //     }];
          
      //     const columns = [{
      //       title: '姓名',
      //       dataIndex: 'name',
      //       key: 'name',
      //     }, {
      //       title: '年龄',
      //       dataIndex: 'age',
      //       key: 'age',
      //     }, {
      //       title: '住址',
      //       dataIndex: 'address',
      //       key: 'address',
      //     }];
          
        return  <Table {...{
          dataSource,
          columns,
          pagination: false,
        }}/>
    }
}

const arrSum = arr => arr.reduce((prev, curr) => prev + curr, 0)
