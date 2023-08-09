import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

export default function TextBox() {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div className=" top-0 right-0 p-4 w-3/4 h-full bg-white border-l border-gray-300 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Write your story ...</h2>
      <ReactQuill
        value={text}
        onChange={handleChange}
        placeholder="Type something here..."
        className="bg-white p-2 shadow-md"
      />
      <button className="btn" onClick={console.log(text)}>
        {" "}
        Publish
      </button>
    </div>
  );
}
