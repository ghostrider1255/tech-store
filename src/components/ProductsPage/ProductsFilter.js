import React from 'react';
import styled from 'styled-components';
import {ProductConsumer} from '../../context';

export default function ProductsFilter() {
    return <ProductConsumer>
        {value =>{
            const {search, min,max,company,price,shipping,handleChange,storeProducts} = value;
            return (
                <div className="row my-5">
                    <div className="col-10 mx-auto">
                        <FilterWrapper>
                            {/**text search */}
                            <label htmlFor="search">Search products</label>
                            <input type="text" name="search" id="search" onChange={handleChange} value={search} className="filter-item" />
                            {/**end of text search */}

                            {/**category search */}
                            <div >
                                <label htmlFor="company">company</label>
                                <select name="company" id="company" className="filter-item" onChange={handleChange} value={company}>
                                    <option value="all" >all</option>
                                    <option value="fuji" >fuji</option>
                                    <option value="htc" >HTC</option>
                                    <option value="samsung" >samsung</option>
                                </select>
                            </div>
                            {/**end of category search */}


                            {/**price range */}
                            <div>
                                <label htmlFor="price"><p className="mb-2">product price:<span>${price}</span></p></label>
                                <input type="range" name="price" id="price" min={min} max={max} className="filter-price"
                                 value={price} onChange={handleChange}></input>
                            </div>
                            {/**end of price  range */}

                            {/**shipping */}
                            <div>
                                <label htmlFor="shipping" className="mx-2" >free shipping</label>
                                <input type="checkbox" name="shipping" id= "shipping" onChange={handleChange} value={shipping && true}/>
                            </div>
                            {/**end of shipping */}
                        </FilterWrapper>
                    </div>
                </div>
            )

        }}
    </ProductConsumer>
}


const FilterWrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
grid-column-gap: 2rem;
grid-row-gap: 1rem;
lable{
    font-weight: bold;
    text-transform: capitalize;
}
.filter-item,.filter-price{
display: block;
width: 100%;
background: transparent;
border-radius: 0.5rem;
border: 2px solid var(--darkGrey);
}
`;