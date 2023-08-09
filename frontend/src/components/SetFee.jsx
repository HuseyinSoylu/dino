import React, { useState } from "react";

export default function SetFee() {
  const [selectedOption, setSelectedOption] = useState("specific");
  const [feeValue, setFeeValue] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFeeChange = (event) => {
    setFeeValue(event.target.value);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Set Fee</h2>
      <div className="space-y-2">
        <label className="block font-medium">
          <input
            type="radio"
            value="specific"
            checked={selectedOption === "specific"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Enter a specific number:
        </label>
        {selectedOption === "specific" && (
          <input
            type="number"
            value={feeValue}
            onChange={handleFeeChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        )}

        <label className="block font-medium">
          <input
            type="radio"
            value="average"
            checked={selectedOption === "average"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          Set an average number for context general
        </label>
      </div>
    </div>
  );
}
