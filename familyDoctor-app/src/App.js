import React from 'react';
import { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import {Main} from "./script/views/mian/index";
// import axios from "axios";

// 主视图
function App() {
  return (
    <div className="App">
      <Router basename="/"> {/* 主视图 */}
          <div>
              <Route path="" exact component={Layout}  />
          </div>
      </Router>
    </div>
  );
}

// 主路由配置  
export class Layout extends Component {

  render() {
    return (
      <Switch>        
        <Route path="/main" component={Main} />        
        <Route path="" exact render={() => (<Redirect to="/main" />)} />
      </Switch>
    )
  }
}

export default App;
