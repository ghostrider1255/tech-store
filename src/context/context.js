import React,{Component} from 'react';
import {linkData} from './LinkData';

const ProductContext = React.createContext();

class ProductProvider extends Component{

    state={
        sideBarOpen: false,
        cartOpen: false,
        cartItems: 99,
        links: linkData,
        cart: []

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