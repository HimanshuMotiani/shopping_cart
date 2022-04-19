import React from 'react'
class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            cartOpen:false
        }

    }
    handleCart= ()=>{
        this.setState({
            cartOpen:!this.state.cartOpen
        })
    }
    closeCart = ()=>{
        this.setState((prevState)=>({
            cartOpen: !prevState.cartOpen
          }))
    }

    render() {
        var allProducts = this.props.productCart;
        var totalProducts = allProducts.reduce( (acc, cv)=> { 
            acc =  acc + cv.quantity; 
            return acc;
        }, 0);
        var totalSum = allProducts.reduce( (acc, cv)=> { 
            acc =  acc + cv.price * cv.quantity; 
            return acc;
        }, 0);

        
        return (
            <>
                <div className={this.state.cartOpen == false ?"relative ":"relative hidden"}>
                <button  onClick={this.handleCart}><img className="h-18 w-20 bg-black p-4" src="/images/static/bag-icon.png"/></button>
                <div className="bg-yellow-400 text-black rounded-full w-6 flex items-center justify-center absolute top-12 right-120">{totalProducts}</div>
                </div>

                <div className="bg-black flex">
                    <div className={ this.state.cartOpen?"absolute top-0 right-0  min-h-screen w-4/12":"absolute top-0 right-0  min-h-screen w-4/12 hidden"}>
                        <div className="pt-12 bg-black mx-auto px-4">
                            <span className="text-white cursor-pointer" onClick={this.closeCart}>X</span>
                            <div className="relative align-top text-center">
                                <button onClick={this.handleCart}><img className="h-14 w-14 bg-black" src="/images/static/bag-icon.png" /></button>
                                <div className="bg-yellow-400 text-black rounded-full w-6 flex items-center justify-center absolute top-10 right-52">{totalProducts}</div>
                                <span className="text-white text-2xl ml-4">Cart</span>
                            </div>
                            {
                                allProducts.map((product, index) => (
                                    <article className="flex items-center text-white mt-8 mb-4 bg-gray-800 justify-between">
                                        <div>
                                            <img className="w-26 h-28" src={`/images/static/products/${product.sku}_2.jpg`} />
                                        </div>
                                        <div className="ml-4">
                                            <h5>{product.title}</h5>
                                            <span className="text-gray-500">{allProducts[index]['availableSizes'][0]} |{' '} </span>
                                            <h5 className="inline-block text-gray-500">{product.style}</h5>
                                            <h6 className="text-gray-500">Quantity: {product.quantity}</h6>
                                        </div>
                                        <div className="ml-14 mr-2">
                                            <h4 onClick={()=>this.props.removeProduct(product)} className="text-red-300 text-xl mb-3">X</h4>
                                            <h5 className="text-yellow-300">{product.currencyFormat} {product.price.toFixed(2)}</h5>
                                            <div className="mt-2">
                                                <button onClick={()=>this.props.handleIncrement(product)} className="ml-1 mr-3 bg-black py-.5 px-1.5">+</button>
                                                <button onClick={()=>this.props.handleDecrement(product)} className="bg-black py-.5 px-1.5">-</button>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            }
                            <div className="flex justify-between items-center my-5">

                                <div>
                                    <h4 className="text-gray-500 text-2xl">SUBTOTAL</h4>
                                </div>
                                <div>
                                    <h5 className="text-yellow-400 text-2xl">${totalSum.toFixed(2)}</h5>
                                    <h6 className="text-gray-600">OR UP T0 9*{(totalSum / 9).toFixed(2)}</h6>
                                </div>
                            </div>
                            <div className="w-11/12">
                                <button onClick={()=>alert(`Your total sum is ${totalSum}$`)} className=" w-11/12 ml-10 bg-gray-800 py-2 px-6 text-white text-2xl mb-5">CHECKOUT</button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

}

export default Cart;