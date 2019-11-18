import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../LOGO/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const toolbar = (props) =>(
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.showSideDrawerHandle}/>
        <Logo height={'80%'} />
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;