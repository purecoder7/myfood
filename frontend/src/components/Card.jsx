import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useDispatchCart } from './ContextReducer';

function Card(props) {
    const [foodSize, setFoodSize] = useState();
    const [qty, setQty] = useState(1);
    let price = props.options;
    let finalPrice = price[foodSize] * qty;
    let priceRef = useRef();
    let dispatch = useDispatchCart();
    let cartState = useCart();

    let addCart = async () => {
        let checkToken = localStorage.getItem("authToken");
        if (!checkToken) {
            alert("Please Login To Add To Cart");
            return;
        }
        await dispatch({
            type: "ADD",
            id: props.foodData._id,
            name: props.foodData.name,
            price: finalPrice,
            img: props.foodData.img,
            qty: qty
        });
    };

    let size = Object.keys(props.options);

    useEffect(() => {
        setFoodSize(priceRef.current.value);
    }, []);

    return (
        <div className="card border-1 shadow-sm bg-warning text-dark" style={{ maxWidth: "18rem" }}>
            <Link to="/">
                <img className="card-img-top p-3" src={props.foodData.img} alt="Product" style={{ height: "200px", objectFit: "cover" }} />
            </Link>
            <div className="card-body">
                <Link to="/" className="text-decoration-none text-dark">
                    <h5 className="card-title">{props.foodData.name}</h5>
                </Link>
                <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary">5.0</span>
                </div>

                {/* Quantity Input */}
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Size Selection */}
                <div className="mb-3">
                    <label className="form-label">Size</label>
                    <select
                        ref={priceRef}
                        value={foodSize}
                        onChange={(e) => setFoodSize(e.target.value)}
                        className="form-select"
                    >
                        {!size.length ? (
                            <option>No Options</option>
                        ) : (
                            size.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                            ))
                        )}
                    </select>
                </div>

                {/* Price and Add to Cart */}
                <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold">₹{finalPrice}</span>
                    <button onClick={addCart} className="btn btn-primary">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
