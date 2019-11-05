import React, { Component } from 'react';

/*
    a higher order component that can catch errors threw by wrapped components
    Do not use it to wrap the whole application, just components that might have unexpected failures during run time
*/
class ErrorBoundary extends Component{

    state={
        isError: false,
        errorMessage: ''
    }

    // this function will be called when a children component throws an error
    componentDidCatch =(error,info)=>{
        this.setState({
            isError: true, 
            errorMessage: error
        });
    }

    render(){
        if(this.state.isError){
            return (<h1>{this.state.errorMessage}</h1>)
        }
        else{
            return this.props.children;
        }
    }
}

export default ErrorBoundary;