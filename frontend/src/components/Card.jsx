import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useDispatchCart } from './ContextReducer';

function Card(props) {

    const [foodSize, setfoodSize] = useState()
    const [qty, setqty] = useState(1)
    let price = props.options
    let finalPrice = price[foodSize] * qty
    let priceref = useRef()
    let dispatch = useDispatchCart()
    let cartState = useCart()
    let food = []
    let addCart = async () => {
    //     food = cartState
    //    for (const key in food) {
    //         if (props.foodData._id === food.id) {
    //             await dispatch({type: "REMOVE", id:props.foodData._id, qty: qty, price: finalPrice })
    //         }
        
    //    }
        let checkToken = localStorage.getItem("authToken")
        if (!checkToken) {
            alert("Please Login To Add To Cart")
        }
        await dispatch({ type: "ADD", id: props.foodData._id, name: props.foodData.name, price: finalPrice, img: props.foodData.img, qty: qty })
        
    }

    const [quantity, setQuantity] = useState(1);
    let size = Object.keys(props.options)

useEffect(() => {
  setfoodSize(priceref.current.value)
}, [])





    return (
      

            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm bg-yellow-300 border-black-700">
                <Link to="/">
                    <img className="p-8 rounded-t-lg h-52 w-72" src={props.foodData.img} alt="product image" />
                </Link>
                <div  className="px-5 pb-5">
                    <Link to="/">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{props.foodData.name}</h5>
                    </Link>
                    <div className="flex items-center mt-2.5 mb-5">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={qty}
                            onChange={(e)=>setqty(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1 text-gray-900"/>
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700">Size</label>
                        <select
                            ref={priceref}
                            value={foodSize}
                            onChange={(e) => setfoodSize(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1 text-gray-900">
                            {!size ? (<div>No Options</div>) : (size.map((data) => {
                                return (
                                    <option value={data}>{data}</option>
                                )
                            }))}
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-black">₹{finalPrice}</span>
                        <button onClick={addCart}>
                            <Link to="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</Link>
                        </button>
                    </div>
                </div>
            </div>

    );
}

export default Card;