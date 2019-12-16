import React from 'react';
import Layout from './PWeb/container/Layout/Layout';
import {BrowserRouter} from 'react-router-dom';

// use BrowserRouter component from 'react-router-dom' to wrap components where I want to use routing
function pwebapp() {
    return (
        <BrowserRouter>      
          <Layout />
        </BrowserRouter>

    );
  }
  
export default pwebapp;