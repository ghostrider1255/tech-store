import React from 'react';
import {ProductConsumer} from '../../context';

export default function CartTotal() {
    return (
        <div className="container">
            <div className="row">
                <ProductConsumer>
                    {value =>{
                        const {clearCart, cartSubtotal, cartTax, cartTotal} = value;

                        return <div className="col text-title text-center my-4">
                            <button className="btn btn-outline-danger text-capitalize mb-4" onClick={clearCart}>clear cart</button>
                            <h3>Subtotal: &#8377;{cartSubtotal}</h3>
                            <h3>tax &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;: &#8377;{cartTax}</h3>
                            <h3>total &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&#8377;{cartTotal}</h3>
                        </div>
                    }}
                </ProductConsumer>
            </div>
        </div>
    )
}
