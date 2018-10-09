import React, { Component } from 'react';
import './App.css';
import { Tabs } from 'antd';
import Rank from './components/Rank';
import Experiment from './components/Experiment';
import Config from './components/Config';
import PersonTable from './components/PersonTable';
import PrimaryTable from './components/PrimaryTable';
// import arrayMath from './helpers/array.math';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Tabs defaultActiveKey="2" onChange={callback}>
          <TabPane tab="Config" key="1"><Config/></TabPane>
          <TabPane tab="PersonTable" key="2"><PersonTable/></TabPane>
          <TabPane tab="PrimaryTable" key="3"><PrimaryTable/></TabPane>
          <TabPane tab="Experiment" key="4"><Experiment/></TabPane>
          <TabPane tab="Rank" key="5"><Rank/></TabPane>
          <TabPane tab="Additional Points" key="6">Content of Tab Pane 2</TabPane>
          <TabPane tab="Score Board" key="7">Content of Tab Pane 3</TabPane>
        </Tabs>

      </div>
    );
  }
}

export default App;

// ReactDOM.render(
  
// , mountNode);
