import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) =>{

    // let tmpArr = new Array(5) this creates an array of size 5, but because no value is assigned, tmpArr has a length of 0
    // In order to create an array of size 5, do this => let tmpArr = new Array(5).fill(0); 
    let transformedIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                return [...Array(props.ingredients[igKey])].map((_,i)=>
                    <BurgerIngredient key={igKey+i} type={igKey}/>
                )
            })
            .reduce((newArr, el) => {
                return newArr.concat(el);
            },[])
    
    if(transformedIngredients.length === 0){ transformedIngredients = <p>Please Start Adding Ingredients</p>; }
    
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type={"bread-top"} />
            {transformedIngredients}
            <BurgerIngredient type={"bread-bottom"} />
        </div>
    )
}

export default burger;