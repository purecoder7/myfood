import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import Footer from '../components/Footer';

function Home() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      let response = await fetch("https://myfoodbackend.onrender.com/req/fetchdata", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Failed to fetch data');

      let data = await response.json();
      setItems(data.foodItems || []);
      setCategories(data.foodCategories || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (items.length === 0 && categories.length === 0) {
      loadData();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className='container mt-3'>
        <Carousel />
      </div>

      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p className="text-center text-danger mt-4">Error: {error}</p>
      ) : (
        <div className='container mt-4'>
          {categories.length > 0 ? categories.map((catData) => {
            const filteredItems = items.filter(item => item.CategoryName === catData.CategoryName);
            return (
              <div key={catData._id} className='mb-4'>
                <h4 className='text-center text-md-start'>{catData.CategoryName}</h4>
                <hr />

                <div className='row'>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((newData) => (
                      <div key={newData._id} className='col-12 col-sm-6 col-md-4 col-lg-3 mb-3'>
                        <Card foodData={newData} options={newData.options[0]} />
                      </div>
                    ))
                  ) : (
                    <p className="text-muted text-center">No Data</p>
                  )}
                </div>
              </div>
            );
          }) : (
            <p className="text-muted text-center">No Categories Found</p>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default Home;