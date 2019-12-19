import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'

import Blog from './containers/Blog/Blog';

// use <BrowserRouter/> component from 'react-router-dom' to wrap components where I want to use routing
// use basename attribute in <BrowserRouter/> to tell react the root path when deploying app on a server
class App extends Component {
  render() {
    return (
      // <BrowserRouter basename='my-app'>
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
