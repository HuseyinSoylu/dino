import React from "react";
import Categories from "../components/Categories";
import TextBox from "../components/TextBox";
import SetFee from "../components/SetFee";

export default function Write() {
  return (
    <div>
      <TextBox />
      <Categories />
      <SetFee />
    </div>
  );
}
