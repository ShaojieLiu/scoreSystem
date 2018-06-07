import React, { Component } from 'react';
import SimpleTable from './SimpleTable';
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
        return <div>Experiment<SimpleTable/></div>
    }
}

/*
随机产生排名
统计
随机加分
得出变动量
*/