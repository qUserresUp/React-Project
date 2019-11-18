import React from 'react';
import Button from '../../UI/Button/Button';
import styles from './DrawerToggle.module.css';

const drawerToggle = (props) => {

    return (
        <div onClick={props.clicked} className={styles.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )

}

export default drawerToggle;