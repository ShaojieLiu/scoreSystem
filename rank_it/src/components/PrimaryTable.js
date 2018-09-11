import React, { Component } from 'react';
import { Input, Button, message, Table } from 'antd';
import axiosInstance from '../helpers/axiosInstance';
import _ from 'lodash';
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
            axiosInstance.get('/score/get', {
                params: {
                    data: JSON.stringify(data),
                },
            }).then((res) => {
                this.setState({score: res.data});
                console.log('score res', res.data);
            });
        });
    }

    state = {
        title: '',
        name: [],
        score: [],
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
                info = '请填写所有与会人员的排名';
            } else if (!scoreRepeatCorrect) {
                info = '排名不可出现重复';
            }
            message.error(info);
        }
    }

    render() {
        const getSourceUnit = (score, index, self) => {
            const res = _.cloneDeep(score);
            res.key = index;
            res['评分者'] = self;
            return res;
        }

        const getColumnUnit = (columnName, option) => ({
            title: `${columnName}${option ? '(排名)' : ''}`,
            dataIndex: columnName,
            key: columnName,
        });

        const dataSource = this.state.score.map((item, index) => getSourceUnit(item.score, index, item.self));
        const columns = this.state.score.map(item => getColumnUnit(item.self, true));
        columns.unshift(getColumnUnit('评分者'));

        console.log('dataSource', dataSource);

        return <div>
            <br/>
            原始表
            <br/>
            <br/>
            <Table dataSource={dataSource} columns={columns} />            
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