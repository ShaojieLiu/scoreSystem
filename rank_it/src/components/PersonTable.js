import React, { Component } from 'react';
import { Input } from 'antd';
import axiosInstance from '../helpers/axiosInstance';
import {getSum, arrSum} from '../helpers/math';

export default class Experiment extends Component {
    constructor() {
        super()
        this.initState()
    }

    initState() {
        axiosInstance.get('/config/get').then((res) => {
            const data = JSON.parse(res.data);
            console.log('res', data);
            this.setState(data);
        })
    }

    state = {
        score: {},
        name: [],
        title: '',
    }

    handleChangeName = (e) => {
        const name = e.target.value.split(';');
        this.setState({ name });
        console.log('handleChangeName', name);
    }

    handleChangeTitle = (e) => {
        const title = e.target.value;
        this.setState({ title });
        console.log('handleChangeTitle', title);
    }

    componentDidUpdate() {
        const data = {
            name: this.state.name,
            title: this.state.title,
        }
        axiosInstance.get('/config/set', {
            params: {
                data: JSON.stringify(data),
            }, 
        })
    }

    render() {
        const arr = this.state.name.map(name => {
            return <Input 
                key={name}
                addonBefore={name}
                placeholder={`请输入 ${name} 童鞋的排名`} 
                value={ this.state.score[name] }
                // onChange={ this.handleChangeTitle }
            />
        })

        return <div>
            <br/>
            与会人员 : 排名
            <br/>
            <br/>
            { arr }
            <br/>
        </div>
    }
}