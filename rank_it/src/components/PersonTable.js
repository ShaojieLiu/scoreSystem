import React, { Component } from 'react';
import { Input, Button, message, Menu, Dropdown, Icon } from 'antd';
import axiosInstance from '../helpers/axiosInstance';
import {getSum, arrSum} from '../helpers/math';
export default class Experiment extends Component {
    constructor() {
        super();
        this.initState();
    }

    initState() {
        axiosInstance.get('/config/get').then((res) => {
            const data = res.data;
            console.log('res', data);
            this.setState(data);
        });
    }

    state = {
        title: '',
        score: {
            // '江华': '1',
            // '少杰': '2',
            // '泽标': '3',
            // '志豪': '4',
            // '美琪': '5',
            // '锦涛': '6',
            // '广杰': '7',
        },
        name: [],
        // self: '江华',
    }

    handleChangeScore = (e) => {
        console.log('e.target', e.target);
        const name = e.target.name;
        const score = e.target.value;
        this.setState(state => {
            state.score[name] = score;
            return state;
        });
    }

    handleChangeSelf = (e) => {
        const self = e.target.value;
        this.setState({self});
    }

    handleSelectSelf = (name) => () => {
        this.setState({self: name});
    }

    handleSubmit = (e) => {
        // e.target.disabled = true;
        const data = {
            self: this.state.self,
            score: this.state.score,
            title: this.state.title,
            name: this.state.name,
        };

        const submit = () => {
            axiosInstance.get('/score/set', {
                params: {
                    data: JSON.stringify(data),
                }, 
            }).then((res) => {
                message.success(res.data)
            });
        }

        const nameCorrect = data.name.indexOf(data.self) !== -1
        const scoreLengthCorrect = Object.keys(data.score).length === data.name.length;
        const scoreRepeatCorrect = new Set(Object.values(data.score)).size === data.name.length;

        const canSubmit = nameCorrect && scoreLengthCorrect && scoreRepeatCorrect;

        if (canSubmit) {
            submit();
        } else {
            let info = 'This is a message of error';
            if (!nameCorrect) {
                info = '您输入的名字务必是与会人员之一';
            } else if (!scoreLengthCorrect) {
                info = `请填写所有与会人员的排名: ${Object.keys(data.score).length} / ${data.name.length}`;
            } else if (!scoreRepeatCorrect) {
                info = '排名不可出现重复';
            }
            message.error(info);
        }
    }

    render() {
        const arr = this.state.name.map(name => {
            return <Input 
                key={name}
                name={name}
                addonBefore={name}
                placeholder={`请输入 ${name} 童鞋的排名`} 
                value={ this.state.score[name] }
                onChange={ this.handleChangeScore }
            />
        });

        const menu = (
            <Menu>
                {this.state.name.map(n => (
                    <Menu.Item value={n} key={n} onClick={this.handleSelectSelf(n)}>
                        {n}
                    </Menu.Item>)
                )}
            </Menu>
        );

        return <div>
            <br/>
            与会人员 | 排名
            <br/>
            <br/>
            <Dropdown overlay={menu}>
                {this.state.self ? 
                    <a className="ant-dropdown-link"> 评分者: {this.state.self} <Icon type="down" /> </a> 
                    : <a className="ant-dropdown-link"> 选择你的名字 <Icon type="down" /> </a>
                }
            </Dropdown>
            <br/>
            <br/>
            { arr }
            <br/>
            <br/>
            <Button 
                type="primary"
                onClick={ this.handleSubmit }
            >提交分数</Button>
            <br/>
        </div>
    }
}