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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
      {orderData.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orderData.slice().reverse().map((data, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Date: {data.date}</h2>
            {data.items.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b last:border-b-0">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Order:</p>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Quantity:</p>
                    <p className="font-semibold text-gray-900">{item.qty}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Price:</p>
                    <p className="font-semibold text-gray-900">₹{item.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status:</p>
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded">
                      ✅ Confirmed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
