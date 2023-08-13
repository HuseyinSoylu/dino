import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'daisyui/dist/full.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContentPage() {
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');
  const [isCustomPrice, setIsCustomPrice] = useState(false);

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCustomPriceToggle = () => {
    setIsCustomPrice(!isCustomPrice);
    setPrice(''); // Reset price when toggling
  };

  const handlePublish = () => {
    const data = {
      text: text,
      category: selectedCategory,
      price: isCustomPrice ? 'Custom Price' : price,
    };

    const jsonData = JSON.stringify(data, null, 2);
    console.log(jsonData);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-white py-4 shadow-md">
          <div className="max-w-screen-xl mx-auto px-6">
            <h1 className="text-3xl font-semibold">
              Create New Post
            </h1>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto p-6 flex">
          <div className="w-3/4 pr-6">
            <h2 className="text-xl font-semibold mb-4">
              Write your story ...
            </h2>
            <ReactQuill
              value={text}
              onChange={handleTextChange}
              placeholder="Write your content here..."
              className="bg-white p-2 shadow-md"
            />
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Set Price:
              </label>
              <div className="flex items-center space-x-2">
                <label className="checkbox">
                  <input
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Enter price"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handlePublish}
                className="btn btn-primary w-full"
              >
                Publish
              </button>
            </div>
          </div>
          <div className="w-1/4 pl-6">
            <div className="mb-4 menu bg-base-200 w-56 rounded-box mt-10">
              <h2 className="text-xl font-semibold mb-2">
                Select Category:
              </h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="technology"
                    checked={selectedCategory === 'technology'}
                    onChange={handleCategoryChange}
                  />
                  <span>Technology</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="food"
                    checked={selectedCategory === 'food'}
                    onChange={handleCategoryChange}
                  />
                  <span>Food</span>
                </label>
                {/* Add other categories */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
