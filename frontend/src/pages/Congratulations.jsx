import React from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom"; // React Router eklenmeli
import "animate.css"; // animate.css eklenmeli

import Header from "../components/Header"; // Header bileşeni import edilmeli
import Footer from "../components/Footer"; // Footer bileşeni import edilmeli

export default function Congratulations() {
  return (
    <>
      <Header /> {/* Header bileşeni eklenmeli */}
      <div className="congrats-page min-h-screen flex flex-col justify-center items-center  bg-gradient-to-r from-purple-400 to-blue-500">
        <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
        <p className="mb-8">You have published your essay!</p>
        <Confetti width={window.innerWidth} height={window.innerHeight} />
        <Link
          to="/other-page" // Diğer sayfaya yönlendirme yapılmalı
          className="text-blue-500 underline animate__animated animate__fadeIn animate__delay-1s"
        >
          Go to Another Page
        </Link>
      </div>
      <Footer /> {/* Footer bileşeni eklenmeli */}
    </>
  );
}
