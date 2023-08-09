import React from "react";

export default function Categories() {
  const categories = [
    "Yemek",
    "Spor",
    "Teknoloji",
    "Hap Bilgiler",
    "Hap Bilgiler",
    "Hap Bilgiler",
    // Add more categories as needed
  ];

  return (
    <div className="fixed top-150 right-14 p-11 bg-yellow-100">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="flex items-center space-x-2 mb-2">
            <input type="checkbox" className="form-checkbox" />
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
