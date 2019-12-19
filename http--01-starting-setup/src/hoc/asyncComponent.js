import React, { Component } from 'react';

/*
    lazy loading: input is a function reference
    Only load component when needed

    after react 16.6
    can also use React.lazy() method + <Suspense fallback={'JSX code'} /> component
*/

const asyncComponent = (importComponent) => {
    return class extends Component {
        
        state = {
            component: null,
        }

        componentDidMount(){
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render(){

            const C = this.state.component;
            return C ? <C {...this.props}/> : null;
        }
    }
}



export default asyncComponent;