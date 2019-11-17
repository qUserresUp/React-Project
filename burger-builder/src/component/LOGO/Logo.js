import React from 'react';
// cannot use this in the JSX code directly, because webpack will pack everything and server will not recognize this path
// therefore, use import to remind webpack to contain the image
import burgerLOGO from '../../asset/burger-logo.png'; 
import styles from './Logo.module.css';

const logo=(props)=>(
    <div className={styles.Logo} style={{height:props.height}}>
        <img src={burgerLOGO} />
    </div>
)

export default logo;