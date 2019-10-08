import React,{Component} from 'react';
import {linkData} from './LinkData';
import {socialData} from './socialData';
import {items} from './productData';

const ProductContext = React.createContext();

class ProductProvider extends Component{

    state={
        sideBarOpen: false,
        cartOpen: false,
        cartItems: 0,
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
        loading: false
    }

    componentDidMount(){
        this.setProducts(items);
    }

    //set products
    setProducts = (products) =>{
        let storeProducts = products.map(item=>{
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            const product = {id,...item.fields,image};
            return product
        })
        //featured products
        let featuredProducts = storeProducts.filter(item => item.featured === true);

        this.setState({
            storeProducts,
            filteredProducts:storeProducts,
            featuredProducts,
            cart: this.getStorageCart(),
            SingleProduct: this.getStorageProduct(),
            loading: false

        },() => {this.addTotal()})
    }

    //get product from local storage
    getStorageProduct = () =>{
        return localStorage.getItem('singleProduct')? JSON.parse(localStorage.getItem('singleProduct')): {};
    }

    //get cart from local storage
    getStorageCart=() =>{
        let cart;
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        else{
            cart = []
        }
        return cart;
    }

    //get total
    getTotal = () =>{
        let subTotal =0;
        let cartItems = 0;
        this.state.cart.forEach( item =>{
            subTotal +=item.total;
            cartItems +=item.count;
            
        })
        subTotal= parseFloat(subTotal.toFixed(2));
        let tax = subTotal * 0.2;
        tax = parseFloat(tax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));   

        return {
            cartItems,
            subTotal,
            tax,
            total
        }
    };

    //add total
    addTotal = () =>{
        const total = this.getTotal();
        this.setState({
            cartItems: total.cartItems,
            cartSubtotal: total.subTotal,
            cartTax: total.tax,
            cartTotal: total.total
        })
    }

    //sync totals
    syncStorage = () =>{
        localStorage.setItem('cart',JSON.stringify(this.state.cart));
    }

    //add to cart 
    addToCart = (id) => {
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find( item => item.id ===id );
        if(!tempItem){
            tempItem = tempProducts.find( item => item.id === id);
            let total = tempItem.price;
            let cartItem = {...tempItem, count:1,total}
            tempCart = [...tempCart, cartItem]
        }else{
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }
        this.setState( () =>{
            return {cart:tempCart}
        },() => {
            this.addTotal()
            this.syncStorage()
            this.openCart()

        })
    }

    //set single product
    setSingleProduct = (id) =>{
        let product = this.state.storeProducts.find( item=> item.id ===id );
        localStorage.setItem('singleProduct',JSON.stringify(product));
        this.setState({
            singleProduct: {...product},
            loading: false
        })
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
            openCart: this.openCart,
            addToCart: this.addToCart,
            setSingleProduct: this.setSingleProduct
            }}>
            {
                this.props.children
            }
            </ProductContext.Provider>)
        
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}