import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../LOGO/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () =>(
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <Logo height={'80%'} />
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;