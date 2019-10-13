import React from 'react';
import {FaTrash, FaChevronCircleUp, FaChevronCircleDown} from 'react-icons/fa';

export default function CartItem({cartItem,increment,decrement,removeItem}) {

    const {id,title,price,count,total,image} = cartItem;
    return (
        <div className="row my-5 mt-lg-0 text-capitalize text-center align-items-center">
            {/** image */}
            <div className="col-10 mx-auto col-lg-2 pb-2">
                <img src={image} width="60" alt="product" className="img-fluid" />
            </div>
            {/** end of image */}

            {/** title */}
            <div className="col-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none">Product: </span> {title}
            </div>
            {/** end of title */}

            {/** price */}
            <div className="col-10 mx-auto col-lg-2 pb-2">
                <span className="d-lg-none">Price: </span> &#8377;{price}
            </div>
            {/** end of price */}

            {/** count controles */}
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <FaChevronCircleDown onClick={() => decrement(id)} className="cart-icon text-primary" />
                        <span className="text-title text-muted mx-3">{count}</span>
                        <FaChevronCircleUp onClick={() => increment(id)} className="cart-icon text-primary" />
                    </div>
                </div>
            </div>
            {/** end of count controles */}

             {/** remove */}
             <div className="col-10 mx-auto col-lg-2">
                <FaTrash className="text-danger cart-icon" onClick={() => removeItem(id)} />
            </div>
            {/** end of remove */}


            {/** total */}
            <div className="col-10 mx-auto col-lg-2">
                <strong className="text-muted"> item total: &#8377;{total}</strong>
            </div>
            {/** end of total */}
        </div>
    )
}
