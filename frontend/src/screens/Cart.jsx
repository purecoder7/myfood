import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, useDispatchCart } from "../components/ContextReducer";

function Cart() {
  let cartState = useCart();
  let dispatch = useDispatchCart();

  // State to track quantity for each cart item
  const [quantities, setQuantities] = useState(
    cartState.map((item) => item.qty) // Initialize state with cart quantities
  );

  const addQuantity = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const decQuantity = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) newQuantities[index] -= 1;
      return newQuantities;
    });
  };

  let checkout = async () => {
    let response = await fetch(
      "https://myfoodbackend.onrender.com/req/fetchorder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("orderMail"),
          orderData: cartState,
          orderDate: new Date().toDateString(),
        }),
      }
    );

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8">
          {cartState.length > 0 ? (
            cartState.map((data, index) => (
              <div key={index} className="card mb-3 shadow-sm">
                <div className="row g-0">
                  <div className="col-md-2 d-flex align-items-center">
                    <Link to="/">
                      <img
                        src={data.img}
                        alt="product"
                        className="img-fluid rounded-start"
                      />
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{data.name}</h5>
                      <p className="card-text">
                        Price: ₹{data.price * quantities[index]}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex flex-column align-items-end p-3">
                    <div className="btn-group">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => decQuantity(index)}
                      >
                        −
                      </button>
                      <span className="px-3">{quantities[index]}</span>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => addQuantity(index)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm mt-2"
                      onClick={() => dispatch({ type: "REMOVE", index: index })}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Your cart is empty</p>
          )}
        </div>

        {/* Order Summary */}
        {cartState.length > 0 && (
          <div className="col-lg-4">
            <div className="card shadow-sm p-3">
              <h5>Order Summary</h5>
              <hr />
              <p className="fw-bold">
                Total: ₹
                {cartState.reduce(
                  (total, item, index) => total + item.price * quantities[index],
                  0
                )}
              </p>
              <button
                onClick={checkout}
                className="btn btn-primary w-100 mt-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
