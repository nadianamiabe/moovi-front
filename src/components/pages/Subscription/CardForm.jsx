import React from 'react';
import { CardElement } from 'react-stripe-elements';

const style = { 
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};


const CardForm = () => {
  return (
    <div style={{border: 'solid 1px yellow', borderRadius: '5px'}}> 
      <CardElement className="MyCardElement" style={style}></CardElement>
    </div>
  )
}

export default CardForm;