import React,{Component} from 'react';
import {linkData} from './LinkData';
import {socialData} from './socialData';
import {items} from './productData';

const ProductContext = React.createContext();

class ProductProvider extends Component{

    state={
        sideBarOpen: false,
        cartOpen: false,
        cartItems: 12,
        links: linkData,
        socialLinks: socialData,
        cart: [],
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        SingleProduct:{},
        loading: true
    }

    componentDidMount(){
        this.setP
    }

    //set products
    setProducts = (products) =>{
        
    }

    //handle side bar toggle
    handleSideBar= () =>{
        this.setState({
            sideBarOpen: !this.state.sideBarOpen
        })
    }

    //handle cart bar toggle
    handleCart = () => {
        this.setState ({cartOpen: !this.state.cartOpen})
    }

    //close cart
    closeCart = () =>{
        this.setState({cartOpen:false})
    }

    //open cart
    openCart = () => {
        this.setState({cartOpen:true})
    }

    render(){
            return (
            <ProductContext.Provider value={{...this.state,
            handleSideBar:this.handleSideBar,
            handleCart:this.handleCart,
            closeCart: this.closeCart,
            openCart: this.openCart}}>
            {
                this.props.children
            }
            </ProductContext.Provider>)
        
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}