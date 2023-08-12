import React from "react";
import Categories from "../components/Categories";
import TextBox from "../components/TextBox";
import SetFee from "../components/SetFee";
import Header from "../components/Header";

export default function Write() {
  return (
    <div>
      <Header />
      <TextBox />
      <Categories />
      <SetFee />
    </div>
  );
}
