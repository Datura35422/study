import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDom from 'react-dom';

class App extends Component {
  render() {
    return ( // 路由
      <BrowserRouter>
        <Router path='/' component={} />
        <Router path='/list' component={} />
      </BrowserRouter>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));