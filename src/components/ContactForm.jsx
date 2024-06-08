import React, { useState, useEffect } from "react";

const ContactForm = ({ onSave, editingContact }) => {
  const [contact, setContact] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editingContact) {
      setContact(editingContact);
    } else {
      setContact({ name: "", email: "" });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contact.name && contact.email) {
      onSave(contact);
      setContact({ name: "", email: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
          className="border p-1 w-full"
          placeholder="Enter Your Full Name"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          className="border p-1 w-full"
          placeholder="Enter your email address"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editingContact ? "Update" : "Add"} Contact
      </button>
    </form>
  );
};

export default ContactForm;
