import React, { Component } from 'react';
import './App.css';
import { Tabs } from 'antd';
import { Rank } from './components/Rank';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Rank" key="1"><Rank/></TabPane>
          <TabPane tab="Additional Points" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="Score Board" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>

      </div>
    );
  }
}

export default App;

// ReactDOM.render(
  
// , mountNode);
