import React from 'react';
import Title from '../Title';
import CartColumns from './CartColumn';
import CartList from './CartList';
import CartTotals from './CartTotal';


export default function Cart() {
    return (
        <section className="py-5">
            {/* title */}
            <div className="container">
                <Title title="your cart item" center/>
            </div>
            {/* cart columns */}
            <CartColumns />
            {/* cart list */}
            <CartList />
            {/* cart total */}
            <CartTotals />
        </section>
    )
}
