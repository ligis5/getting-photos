import React from 'react';
import './card.css'

export const Card = (props) => {
    return (
        <div className='inner-card'>
         <img className= 'inner-img' alt='monster' src={props.image} />
         <h3 className='h1-css'>Author:{props.name}</h3>
        </div>
    )
}