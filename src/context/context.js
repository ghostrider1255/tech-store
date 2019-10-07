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

        })
    }

    //get product from local storage
    getStorageProduct = () =>{
        return {}
    }

    //get cart from local storage
    getStorageCart=() =>{
        return [];
    }

    //get total
    getTotal = () =>{

    };

    //add total
    addTotal = () =>{

    }

    //sync totals
    syncStorage = () =>{

    }

    //add to cart 
    addToCart = (id) => {
        console.log(`add to cart ${id}`);
    }

    //set single product
    setSingleProduct = (id) =>{
        console.log(`set single product ${id}` );
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