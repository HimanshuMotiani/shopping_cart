import React from 'react'
import data from '../data.json'
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            products:[]
        };
    }
    changeBackground = (e) => {
        e.target.style.border = "1px solid yellow"
    }
    changeBackgroundNormal = (e) => {
        e.target.style.border = ""
    }

    handleByPrice =(event)=> {
        
        if(event.target.value === "lh"){
            data.products.sort(function(a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
        }
        else if(event.target.value === "hl"){
            data.products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        this.setState({value: event.target.value});
    }

    render() {
        let activeSize = this.props.activeSize;
        var products = []
        if (activeSize.length === 0) {
                products = data.products
        }
        else {
            data.products.filter((product) => {
                for (let i = 0; i < activeSize.length; i++) {
                    let flag = product.availableSizes.includes(activeSize[i])
                    if (flag) {
                        products.push(product)}
                    }
            })
        }
        products = [...new Set(products)];
        var productCount = products.length;

        return (
            <>
                <div className="flex-80 mt-20">
                    <div className="flex justify-between">
                        <p className="text-sm">{productCount} Product(s) found</p>
                        <label className="">Order by
                    <select value={this.state.value} onChange={this.handleByPrice} className="border p-1 ml-2">
                                <option>Select</option>
                                <option  name="lh" value="lh">Lowest to Highest</option>
                                <option  name="hl" value="hl">Highest to Lowest</option>
                            </select>
                        </label>
                    </div>

                    <article className="flex flex-wrap mt-4 ">
                        {products.map((product, index) => (
                            <article key={index} className={"flex-24 text-center mr-1 mb-7 p-4 relative hover:border border-yellow-500"}
                            >
                                <img src={"/images/static/products/" + product.sku + "_1.jpg"} />
                                <h5 className="my-3 h-11">{product.title}</h5>
                                <hr className="w-1/6 text-yellow-200 my-0 mx-auto w-1/12 mb-3" />
                                <h6 className="text-sm inline-block mr-1.5">$</h6><span className="text-xl">{product.price.toFixed(2)}</span>
                                <p className="bg-black w-17 px-1 py-.5 font-extralight text-xs font-thin text-white absolute top-0 right-0">Free Shipping</p>
                                <h4 className="text-gray-400">{`or`} {product.installments} * {(product.price / product.installments).toFixed(2)}</h4>
                                <button onClick={()=>this.props.addToCart(product)} className="bg-black text-white my-3 py-4 w-11/12 hover:bg-yellow-400">Add to Cart</button>
                            </article>
                        ))}


                    </article>

                </div>
            </>
        )
    }

}

export default Product;