import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useDispatchCart } from '../components/ContextReducer';

function Cart() {
    let cartState = useCart();
    let dispatch = useDispatchCart()

    // State to track quantity for each cart item
    const [quantities, setQuantities] = useState(
        cartState.map((item) => item.qty) // Initialize state with cart quantities
    );

    const addQuantity = (index) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] += 1; // Increase quantity
            return newQuantities;
        });
    };

    const decQuantity = (index) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            if (newQuantities[index] > 1) newQuantities[index] -= 1; // Prevent going below 1
            return newQuantities;
        });
    };


    let checkout = async () => {
        let orderData = cartState;
        let response = await fetch("https://myfoodbackend.onrender.com/req/fetchorder", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: localStorage.getItem("orderMail"),
            orderData: cartState,
            orderDate: new Date().toDateString()
        })
        });
        // console.log(response);
        
        if (response.status === 200) {
            dispatch({type: "DROP"})
        }

      };
    

    return (
        <>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                            <div className="space-y-6">
                                {cartState.map((data, index) => (
                                    <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                            <Link to="/" className="shrink-0 md:order-1">
                                                <img className="hidden h-20 w-20 dark:block" src={data.img} alt="product" />
                                            </Link>

                                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => decQuantity(index)}
                                                        type="button"
                                                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-red-600 hover:bg-gray-200 focus:outline-none"
                                                    >
                                                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-white focus:outline-none"
                                                        value={quantities[index]}
                                                        readOnly
                                                    />
                                                    <button
                                                        onClick={() => addQuantity(index)}
                                                        type="button"
                                                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-green-400 hover:bg-gray-200 focus:outline-none"
                                                    >
                                                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="text-end md:order-4 md:w-32">
                                                    <p className="text-base font-bold text-gray-900 dark:text-white">₹{data.price * quantities[index]}</p>
                                                </div>
                                            </div>

                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <Link to="/" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{data.name}</Link>
                                            </div>
                                            <button onClick={() => dispatch({ type: "REMOVE", index: index })}>Delete</button>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        {cartState.length > 0 && (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

            {/* Order details */}
            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ₹{cartState.reduce((total, item, index) => total + item.price * quantities[index], 0)}
                </dd>
            </dl>

            <button onClick={()=>{checkout()}} className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800">
                Proceed to Checkout
            </button>
        </div>
    </div>
)}

                        
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cart;
