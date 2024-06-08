// src/components/ApplyForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ApplyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", resume: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", resume: "", phone: "" });
  };

  return (
    <div className="flex-1 p-4">
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">
            Mobile Number
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block text-gray-700">
            Resume (PDF)
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept="application/pdf"
            onChange={handleChange}
            className="mt-1 block w-full border rounded py-2 px-3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          <Link to="/thanks">Submit Application</Link>
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
