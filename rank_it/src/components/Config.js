import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import axiosInstance from '../helpers/axiosInstance';
import {getSum, arrSum} from '../helpers/math';

export default class Experiment extends Component {
    constructor() {
        super()
        this.initState()
    }

    initState() {
        axiosInstance.get('/config/get').then((res) => {
            const data = res.data;
            console.log('res', data);
            this.setState(data);
        })
    }

    state = {
        name: ['江华', '少杰', '泽标', '志豪', '美琪', '锦涛', '广杰'],
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

    handleStart = (e) => {
        e.target.disabled = true;
        const data = {
            name: this.state.name,
            title: this.state.title,
        }
        axiosInstance.get('/config/set', {
            params: {
                data: JSON.stringify(data),
            }, 
        }).then((res) => {
            message.success(res.data)
        });
    }

    render() {
        return <div>
            <br/>
            配置页面 : 请会议主持者在会前配置好
            <br/>
            <br/>
            <Input 
                addonBefore='会议名称'
                placeholder="请输入会议名称" 
                value={ this.state.title }
                style={ {textAlign: 'center'} }
                onChange={ this.handleChangeTitle }
            />
            <br/>
            <Input 
                addonBefore='与会人员'
                placeholder="请输入参与者的姓名, 以分号分隔" 
                value={ this.state.name.join(';') }
                style={ {textAlign: 'center'} }
                onChange={ this.handleChangeName }
            />
            <br/>
            <br/>
            <Button 
                type="primary"
                onClick={ this.handleStart }
            >会议开始</Button>
        </div>
    }
}