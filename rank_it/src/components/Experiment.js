import React, { Component } from "react";
import SimpleTable from "./SimpleTable";
import { getSum, arrSum } from "../helpers/math";
import { Input, Button, message, Table } from "antd";
import axiosInstance from "../helpers/axiosInstance";
import _ from "lodash";
import EditableCell from "./EditableCell";

export default class Experiment extends Component {
  constructor() {
    super();
    this.initState();
    window.setAddParam = num => this.setState({ addParam: num });
  }

  initState() {
    axiosInstance.get("/config/get").then(res => {
      const data = res.data;
      console.log("res", data);
      this.setState(data);

      const query = _.cloneDeep(data);
      query.name.push("addition");
      axiosInstance
        .get("/score/get", {
          params: {
            data: JSON.stringify(query),
          },
        })
        .then(res => {
          const score = this.state.name.map(
            n => res.data.filter(item => item.self === n)[0],
          );
          const addition = res.data.filter(item => item.self === "addition")[0]
            .score;

          const rankMatrix = this.state.name.map((n, i) => {
            const selfScore = score[i].score;
            return [n].concat(this.state.name.map(n => Number(selfScore[n])));
          });
          console.log("rankMatrix", rankMatrix);
          const additionArr = ["附加分"].concat(
            this.state.name.map(n => addition[n]),
          );
          this.setState({ score, addition, additionArr, rankMatrix });
          console.log("score res", res.data);
        });
    });
  }

  state = {
    title: "",
    name: [],
    score: [],
    addition: {},
    addParam: 4,

    rankMatrix: undefined,
    additionArr: [],
  };

  render() {
    const tableData = this.getTableData();
    const { rankObj } = tableData;

    return (
      <div>
        分数汇总
        <br />
        <br />
        <SimpleTable {...tableData} />
        <br />
        公式: {this.getTotalFormula.toString()}
        <br />
        人均变动量:{" "}
        {arrSum(rankObj.slice(-1)[0].slice(1)) / this.state.name.length}
      </div>
    );
  }

  getTotal = (name, arr1, arr2) => {
    arr1 = arr1.slice(1);
    arr2 = arr2 ? arr2.slice(1) : arr1.map(v => 0);
    const f = this.getTotalFormula(arr1, arr2);
    const res = arr1.map(f);
    res.unshift(name);
    return res;
  };

  getTotalFormula = (primaryScore, additionScore) => (_, i) =>
    100 - 0.5 * primaryScore[i] + this.state.addParam * additionScore[i];

  getEmptyRow = char => [char].concat(this.state.name.map(() => char));

  getTableData = () => {
    const rankObj = this.state.rankMatrix || getRandomTable();
    console.log("rankObj", rankObj);
    const add = this.state.additionArr;
    const colName = [" "].concat(this.state.name);
    // const rankObj = getRandomTable()
    // const add = getRandomAdd()
    // const colName = getColName()

    const empty = this.getEmptyRow("");
    const sum = getSum(rankObj);

    const total1 = this.getTotal("原始分数", sum);
    const total2 = this.getTotal("加分后分数", sum, add);

    const rank1 = getRank(total1, "原始排名");
    const rank2 = getRank(total2, "加分后排名");

    const change = getChange(rank1, rank2, "变动量");
    rankObj.push(
      // empty,
      sum,
      total1,
      rank1,
      // empty,
      add,
      total2,
      rank2,
      // empty,
      change,
    );
    return { needTotal: false, colName, rankObj };
  };
}

const getColName = () => ["评分者", "A", "B", "C", "D", "E", "F", "G"];

const getRandomTable = () => {
  return [
    ["A", 1, 2, 3, 4, 5, 6, 7],
    ["B", 1, 2, 3, 4, 5, 6, 7],
    ["C", 1, 2, 3, 4, 5, 6, 7],
    ["D", 1, 2, 3, 4, 5, 6, 7],
    ["E", 1, 2, 3, 4, 5, 6, 7],
    ["F", 1, 2, 3, 4, 5, 6, 7],
    ["G", 1, 2, 3, 4, 5, 6, 7],
    // ['总分',7,14,21,28,35,42,49],
  ];
};

const getRandomAdd = () => {
  return ["附加分", 1, 2, 3, 4, 5, 6, 7];
};

const getRank = (arr, name) => {
  let res = arr.slice(1);
  const bigFirst = _.clone(res).sort((a, b) => (a < b ? 1 : -1));
  res = res.map(v => bigFirst.indexOf(v) + 1);
  res.unshift(name);
  console.log("arr, name", arr, bigFirst, name, res);
  return res;
};

const getChange = (arr1, arr2, name) => {
  arr1 = arr1.slice(1);
  arr2 = arr2.slice(1);
  const res = arr1.map((v, i) => Math.abs(arr1[i] - arr2[i]));
  res.unshift(name);
  return res;
};

// const getTableData = () => {
//     const rankObj = getRandomTable()
//     const sum = getSum(rankObj)
//     const add = getRandomAdd()

//     const total1 = getTotal('原始分数', sum)
//     const total2 = getTotal('加分后分数', sum, add)

//     const rank1 = getRank(total1, '原始排名')
//     const rank2 = getRank(total2, '加分后排名')

//     const change = getChange(rank1, rank2, '变动量')
//     rankObj.push(sum, add, total1, total2, rank1, rank2, change)
//     return {needTotal: false, colName, rankObj}
// }

/*
随机产生排名
统计
随机加分
得出变动量
*/
