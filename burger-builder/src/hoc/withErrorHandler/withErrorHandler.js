import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../component/Modal/Modal';

/*
     global error handler, a higher order component
     uses axios.interceptors to listent to any network errors
*/

const withErrorHandler = (WrappedComponent, axios) => {
    return (
        class extends Component {

            // when using constructor, do not forget to include props
            /* 
                initialize interceptor in constructor, 
                so that it can catches all the request errors in the wrapped components
            */
            constructor(props){
                super(props);
                this.state = {
                    error: null
                }

                axios.interceptors.request.use(req=>{
                    this.setState({error: null});
                    return req;
                })
                // if we hear error, then change state
                axios.interceptors.response.use(res=>res, error=>{
                    this.setState({error: error});
                })
            }

            errorConfirmHandler = () =>{
                this.setState({error: null});
            }

            /*
                in the ComponentWillUnmount() life cycle, or use useEffect() hook,
                we can use eject() to remove old interceptors in the cleanup stage
                so that we are not creating more and more interceptors
            */
            render(){
                return (
                    <Aux>
                        <Modal 
                            show={this.state.error}
                            clicked={this.errorConfirmHandler}
                        >
                            {this.state.error === null ? null : this.state.error.message}
                        </Modal>
                        <WrappedComponent {...this.props}/>
                    </Aux>
                )
            }
        }
    )
}

export default withErrorHandler;