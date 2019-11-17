import React from 'react';
import Logo from '../../LOGO/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer =(props)=>{

    let sdStyle = props.showBackDrop ? 
            [styles.SideDrawer, styles.Open]:[styles.SideDrawer, styles.Close]

    console.log(sdStyle)
    return (
        <Aux>
            <Backdrop show={props.showBackDrop} clicked={props.closeBackDropHandle}/>
            <div className={sdStyle.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <NavigationItems />
            </div>
        </Aux>
    )
}

export default sideDrawer;