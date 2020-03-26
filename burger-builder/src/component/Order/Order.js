import React from 'react'; 
import styles from './Order.module.css';

const order =(props)=> {
    
    let ingArr = [];
    for(let ingName in props.ingredients){
        ingArr.push({
            name: ingName,
            amount: props.ingredients[ingName],
        });
    }
    let ingOut = ingArr.map((ingPair)=>{
        return (<span 
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                    backgroundColor: 'orange',
                    borderColor: '#703B09',
                }}
                key={ingPair.name}>
                {ingPair.name} ({ingPair.amount})
        </span>)
    })

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingOut}</p>
            <p>Price <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;