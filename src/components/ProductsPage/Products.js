import React from 'react';
import {ProductConsumer} from '../../context';
import Title from '../Title';
import Product from '../Product';
import ProductsFilter from './ProductsFilter';
export default function Products() {
    return <ProductConsumer>
        {value=>{
            const {filteredProducts}= value;
            return <section className="py-5">
                <div className="container">
                    {/** */}
                    <Title center title="our products" />
                    {/** */}
                    <ProductsFilter />
                    {/** total count*/}
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <h6 className="text-title">Total Products: {filteredProducts.length}</h6>
                        </div>
                    </div>
                    {/* products */}
                    <div className="row py=5">
                        {filteredProducts.length ===0 ? (
                            <div className="col text-title text-center">Sorry, no items matched your search</div>
                        ):
                        (                           
                            filteredProducts.map(product =>{
                            return <Product key={product.id} product={product} />
                        }))}
                    </div>
                </div>
            </section>
        }}
    </ProductConsumer>
}
