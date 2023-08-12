import React from 'react';
import Header from "../components/Header"
// TODO: make Dino font as Yaren's selection.

function WelcomePage() {
  return (
    <>
    <Header />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="p-8 text-center">
        <h1 className="text-4xl font-semibold text-white mb-4">Welcome to Dino</h1>
        <p className="text-gray-300 text-lg mb-6">Yaren Çetinkaya & Hüseyin Soylu</p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
    </>
  );
}

export default WelcomePage;
