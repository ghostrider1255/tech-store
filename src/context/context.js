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
        loading: false,
        search: '',
        price: 0,
        min: 0,
        max: 0,
        company: "all",
        shipping: false
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
        // get max price
        let maxPrice = Math.max(...storeProducts.map(item=> item.price))

        this.setState({
            storeProducts,
            filteredProducts:storeProducts,
            featuredProducts,
            cart: this.getStorageCart(),
            SingleProduct: this.getStorageProduct(),
            loading: false,
            price: maxPrice,
            max: maxPrice

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

//cart functionality
increment = (id) => {
    let tempCart  = [...this.state.cart];
    const cartItem = tempCart.find( item => item.id === id);
    cartItem.count ++;
    cartItem.total = cartItem.count * cartItem.price;
    cartItem.total = parseFloat(cartItem.total.toFixed(2));
    this.setState(() => {
        return{
            cart:[...tempCart]
        }
    }, () => {
        this.addTotal();
        this.syncStorage()
    })
}

decrement= (id) => {
    let tempCart  = [...this.state.cart];
    const cartItem = tempCart.find( item => item.id === id);
    cartItem.count --;
    if(cartItem.count ===0){
        this.removeItem(cartItem.id)
    }
    else{
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));
        this.setState(() => {
            return{
                cart:[...tempCart]
            }
        }, () => {
            this.addTotal();
            this.syncStorage()
        })
    }    
}

removeItem = (id) =>
{
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter( item => item.id!==id);
    this.setState ({
        cart: [...tempCart]
    }, () => {
        this.addTotal();
        this.syncStorage()
    })
}

clearCart = ()=>{
    this.setState({
        cart:  []
    }, () => {
        this.addTotal();
        this.syncStorage()
    })
}

// handle filtering
handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === "checkbox" ? event.target.checked: event.target.value;

    this.setState({
        [name]: value
    },this.sortData)
}

sortData = () =>{
    const {storeProducts,price,company,shipping,search} = this.state;
    let tempPrice = parseInt(price);
    let tempProducts = [...storeProducts];

    tempProducts = tempProducts.filter(item=>item.price <= tempPrice)

    if(company!=="all"){
        tempProducts = tempProducts.filter(item=>item.company === company)
    }

    if(search.length >0){
        tempProducts = tempProducts.filter(item => {
            let tempSearch=search.toLowerCase();
            let tempTitle = item.title.toLowerCase().slice(0,search.length);
            if(tempSearch === tempTitle){
                return item;
            }
        })
    }
    if(shipping){
        tempProducts = tempProducts.filter(item=>item.shipping === true)
    }

    this.setState({

        filteredProducts:tempProducts
    })
}
    render(){
            return (
            <ProductContext.Provider value={{...this.state,
            handleSideBar:this.handleSideBar,
            handleCart:this.handleCart,
            closeCart: this.closeCart,
            openCart: this.openCart,
            addToCart: this.addToCart,
            setSingleProduct: this.setSingleProduct,
            increment: this.increment,
            decrement: this.decrement,
            removeItem: this.removeItem,
            clearCart: this.clearCart,
            handleChange: this.handleChange
            }}>
            {
                this.props.children
            }
            </ProductContext.Provider>)
        
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}