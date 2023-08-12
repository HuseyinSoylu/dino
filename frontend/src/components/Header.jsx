import React, { useState } from 'react';
import WalletConnection from './WalletConnection'; // Import the new component

function Header() {


  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-semibold text-purple-600">Dino</div>
        </div>
        <ul className="flex space-x-4">
          <li><a href="/write" className="text-gray-600 hover:text-purple-600">Write</a></li>
          <li><a href="/read" className="text-gray-600 hover:text-purple-600">Read</a></li>
        </ul>
        <div className="flex items-center space-x-4">
          <div className="dropdown dropdown-end">
            <div tabIndex="0" className="btn btn-secondary">Dropdown</div>
            <ul className="shadow menu dropdown-content bg-base-100 w-32">
              <li>
                <a className="flex items-center">
                  <img src="/path/to/op-logo.png" alt="OP Logo" className="w-6 h-6 rounded mr-2" />
                  OP
                </a>
              </li>
              <li>
                <a className="flex items-center">
                  <img src="/path/to/bp-logo.png" alt="BP Logo" className="w-6 h-6 rounded mr-2" />
                  BP
                </a>
              </li>
            </ul>
          </div>
          <WalletConnection />
        </div>
      </nav>
    </header>
  );
}

export default Header;

