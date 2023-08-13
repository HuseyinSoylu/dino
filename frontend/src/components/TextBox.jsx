import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextBox() {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
  };

  const handlePublish = () => {
    console.log(text);
    // Add your publish logic here
  };

  return (
    <div className="w-3/4 h-full bg-white border-l border-gray-300 shadow-lg overflow-y-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Write your story ...</h2>
      <ReactQuill
        value={text}
        onChange={handleChange}
        placeholder="Type something here..."
        className="bg-white p-2 shadow-md"
      />
      <button className="btn mt-4" onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
}
