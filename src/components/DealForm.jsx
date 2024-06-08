import React, { useState, useEffect } from "react";

const DealForm = ({ onSave, editingDeal }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editingDeal) {
      setTitle(editingDeal.title);
      setAmount(editingDeal.amount);
    } else {
      setTitle("");
      setAmount("");
    }
  }, [editingDeal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, amount });
    setTitle("");
    setAmount("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter Deals Title"
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter Deals Amount"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded ${
            !title || !amount ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!title || !amount}
        >
          {editingDeal ? "Update Deal" : "Add Deal"}
        </button>
      </form>
    </>
  );
};

export default DealForm;
