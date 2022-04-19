import React from 'react';
import Aside from './Aside';
import Product from './Product'
import Cart from './Cart'
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeSize : [],
            productCart :[],
        }
    }

    componentDidMount() {
        if (localStorage.carts) {
            this.setState({ productCart: JSON.parse(localStorage.carts) })
        }
        this.eventId = window.addEventListener("beforeunload", this.handleUpdateLocalStorage)
    }

    componentWillUnmount(){
        window.removeEventListener("beforeunload", this.handleUpdateLocalStorage)
    }
    handleUpdateLocalStorage = ()=>{
        localStorage.setItem("carts",JSON.stringify(this.state.productCart))
    }

    handleSize = (event)=>{
        let val = event.target.innerText;
        let sizes = this.state.activeSize;
        if(sizes.indexOf(val) == -1){
            sizes.push(val);
        }
        else{
            sizes.splice(sizes.indexOf(val),1)
        }
        this.setState({
            activeSize:sizes
        });
    }

    addToCart = (product)=>{
        let productArr= this.state.productCart;
        if(productArr.indexOf(product) === -1){
            productArr.push(product)
        }
        else{
            productArr.map(item=>{
               if(item.id == product.id){
                   item.quantity = item.quantity + 1
               }
            })
        }
        this.setState({
            productCart:productArr
        })
    }
    handleIncrement = (product)=>{
        let productArr= this.state.productCart;
            productArr.map(item=>{
               if(item.id == product.id){
                   item.quantity = item.quantity + 1
               }
            })
        this.setState({
                productCart:productArr
        })
    }
    handleDecrement = (product,index)=>{
        let productArr= this.state.productCart;
            productArr.map(item=>{
               if(item.id == product.id && item.quantity >1){
                   item.quantity = item.quantity - 1
               }
            })
        this.setState({
                productCart:productArr
        })
    }
    removeProduct = (product)=>{
        let productArr= this.state.productCart;
        productArr.map((item,index)=>{
            if(item.id == product.id){
                productArr.splice(index,1)
            }
         })
     this.setState({
             productCart:productArr
     })
    }
    
    render(){
    return (
    <>
    <main className="flex container">
        <Aside activeSize={this.state.activeSize}  handleSize={this.handleSize}/>
        <Product activeSize={this.state.activeSize} addToCart={this.addToCart}/>
        <Cart productCart={this.state.productCart} 
        handleIncrement={this.handleIncrement} 
        handleDecrement={this.handleDecrement}
        removeProduct={this.removeProduct}
        state={this.state}
        />
    </main>

    </>
    )
}
}

export default App;