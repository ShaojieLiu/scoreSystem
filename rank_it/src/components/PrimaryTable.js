import React, { Component } from 'react';
import { Input, Button, message, Table } from 'antd';
import axiosInstance from '../helpers/axiosInstance';
import _ from 'lodash';
import {getSum, arrSum} from '../helpers/math';
import EditableCell from './EditableCell';
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
        addition: {},
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

    handleChangeAddition = (e) => {
        const k = e.target.name;
        const v = e.target.value;
        this.setState(state => {
            state.addition[k] = v;
            return state;
        });
    }

    handleSubmit = (e) => {
        // e.target.disabled = true;
        const data = {
            self: 'addition',
            score: this.state.addition,
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

        submit();
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
        const columns = this.state.score.map(item => {
            const col = getColumnUnit(item.self, true);
            // col.width = 150;
            return col;
        });
        columns.unshift(Object.assign({width: 150}, getColumnUnit('评分者')));

        // console.log('dataSource', dataSource);

        const additionInput = (<div style={{display: 'flex', alignItems: 'center'}} >
            <div style={{width: 150, flex: 'none', textAlign: 'left', padding: 16}}>附加分: </div>
            {this.state.name.map(n => <Input 
                key={n}
                name={n}
                placeholder={`${n} 附加分`} 
                value={ this.state.addition[n] }
                onChange={ this.handleChangeAddition }
            />)}
        </div>)

        return <div>
            <br/>
            原始表
            <br/>
            <br/>
            <Table 
                dataSource={dataSource} 
                columns={columns} 
                pagination={false}
            />  
            { additionInput }
            <br/>
            <br/>
            <Button 
                type="primary"
                onClick={ this.handleSubmit }
            >提交附加分</Button>
            <br/>
        </div>
    }
}

