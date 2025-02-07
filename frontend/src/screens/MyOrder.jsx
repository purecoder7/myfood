import React, { useState, useEffect } from 'react';

function MyOrders() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("https://myfoodbackend.onrender.com/req/myorder", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: localStorage.getItem("orderMail")
          })
        });
        let resData = await response.json();
        setOrderData(resData.data.order);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">My Orders</h1>
      {orderData.length === 0 ? (
        <p className="text-muted text-center">No orders found.</p>
      ) : (
        orderData.slice().reverse().map((data, index) => (
          <div key={index} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Order Date: {data.date}</h5>
              {data.items.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center border-bottom pb-3 mb-3">
                  <img src={item.img} alt={item.name} className="rounded me-3" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                  <div className="row w-100">
                    <div className="col-md-3">
                      <p className="mb-1 fw-bold">Order:</p>
                      <p>{item.name}</p>
                    </div>
                    <div className="col-md-3">
                      <p className="mb-1 fw-bold">Quantity:</p>
                      <p>{item.qty}</p>
                    </div>
                    <div className="col-md-3">
                      <p className="mb-1 fw-bold">Price:</p>
                      <p>₹{item.price}</p>
                    </div>
                    <div className="col-md-3">
                      <p className="mb-1 fw-bold">Status:</p>
                      <span className="badge bg-success">✅ Confirmed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;