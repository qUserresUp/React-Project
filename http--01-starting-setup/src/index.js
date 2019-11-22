import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// set a default base URL for all the requests
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// axios interceptors catches all the requests sending out from this application, it blocks requests before returning them
axios.interceptors.request.use((request)=>{
    console.log(request);
    // edit request
    return request;
}, error=> {
    console.log(error);
    return Promise.reject(error);
})

// axios interceptors catches all the response sending back from the server
axios.interceptors.response.use((response)=>{
    console.log(response);
    // edit response
    return response;
}, error=> {
    console.log(error);
    return Promise.reject(error);
})



ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
