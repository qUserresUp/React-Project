import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer:false});
    }

    sideDrawerOpenHandler = () => {
        this.setState((preState)=>{ 
            return {showSideDrawer: !preState.showSideDrawer}
        });
    }

    render() {

        console.log('layout');
        return (
            <Aux>
                <Toolbar showSideDrawerHandle={this.sideDrawerOpenHandler}/>
                <SideDrawer 
                    showBackDrop={this.state.showSideDrawer} 
                    closeBackDropHandle={this.sideDrawerCloseHandler}
                />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;