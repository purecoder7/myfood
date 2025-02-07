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
      let response = await fetch("http://localhost:4000/req/fetchdata", {
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
      <div className='w-[98%] ml-auto mr-auto'>
        <Carousel />
      </div>

      {loading ? (
        <div className="flex justify-center mt-6">
          <div className="animate-pulse w-11/12 max-w-screen-lg">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-40 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">Error: {error}</p>
      ) : (
        <div className='mt-6 px-4'>
          {categories.length > 0 ? categories.map((catData) => {
            const filteredItems = items.filter(item => item.CategoryName === catData.CategoryName);
            return (
              <div key={catData._id} className='mb-8'>
                <div className='text-xl font-semibold text-center md:text-left'>{catData.CategoryName}</div>
                <hr className="my-2" />

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((newData) => (
                      <Card key={newData._id} foodData={newData} options={newData.options[0]} />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center col-span-full">No Data</p>
                  )}
                </div>
              </div>
            );
          }) : (
            <p className="text-gray-500 text-center">No Categories Found</p>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default Home;
