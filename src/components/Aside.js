import React from 'react'
class Aside extends React.Component{
    constructor(props){
        super(props)
    }

    changeBackground = (e)=>{
        e.target.style.border = "1px solid"
    }
    changeBackgroundNormal = (e)=>{
        e.target.style.border = ""
    }
    render(){
        let sizes = ["XS","S","M","ML","L","XL","XXL"];
        let activeSize = this.props.activeSize;
        return (
            <>
            <div className ="flex-16 mt-20">
                <h4 className="font-bold mb-1">Sizes:</h4>
                <div className="flex flex-wrap items-center">
                    {sizes.map((size,index)=>(
                        <div key={index} className={
                           activeSize.indexOf(size) !== -1 ?
                            "rounded-full bg-black text-white text-xs h-10 w-10 flex items-center justify-center mr-2 mb-5":
                            "rounded-full bg-gray-200 text-black text-xs h-10 w-10 flex items-center justify-center mr-2 mb-5"}
                             onMouseLeave={this.changeBackgroundNormal} onMouseOver={this.changeBackground} 
                             onClick={this.props.handleSize} >{size}</div>
                    ))}
                </div>
            </div>
            </>
        )
    }

}

export default Aside