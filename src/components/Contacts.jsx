import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { GrStatusGood } from "react-icons/gr";
import { MdGppBad } from "react-icons/md";
import { MdDelete, MdEdit } from "react-icons/md";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 4;

  // Load deals from local storage when the component mounts
  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save deals to local storage whenever it changes
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleSaveContact = (contact) => {
    if (editingContact !== null) {
      // If editing an existing contact, update it
      const updatedContacts = contacts.map((c) =>
        c.id === editingContact.id ? { ...c, ...contact } : c
      );
      setContacts(updatedContacts);
      setEditingContact(null);
    } else {
      // Otherwise, add a new contact
      setContacts([
        ...contacts,
        { ...contact, id: Date.now(), completed: false },
      ]);
    }
  };

  const handleEditContact = (contact) => {
    // Set the contact to be edited
    setEditingContact(contact);
  };

  const handleDeleteContact = (id) => {
    // Remove the contact with the given id
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleCompleteContact = (id) => {
    // Mark the contact with the given id as complete
    const updatedContacts = contacts.map((contact) =>
      contact.id === id
        ? { ...contact, completed: !contact.completed }
        : contact
    );
    setContacts(updatedContacts);
  };

  // Calculate the current page's contacts
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main className="flex-1 p-4">
      <h2 className="text-2xl font-bold">Contacts</h2>
      <ContactForm onSave={handleSaveContact} editingContact={editingContact} />
      <div className="mt-4">
        <p>Total Contacts: {contacts.length}</p>
      </div>
      <ul className="mt-4">
        {currentContacts.map((contact) => (
          <li
            key={contact.id}
            className={"border-b py-2 flex items-center justify-between"}
          >
            <div
              className={`${
                contact.completed ? "line-through text-green-500" : ""
              }`}
            >
              {contact.name} - {contact.email}
            </div>
            <div className="text-2xl flex justify-center items-center gap-10">
              <button
                className="mr-2 text-blue-500"
                onClick={() => handleEditContact(contact)}
              >
                <MdEdit />
              </button>
              <button
                className="mr-2 text-green-500"
                onClick={() => handleCompleteContact(contact.id)}
              >
                {contact.completed ? <MdGppBad /> : <GrStatusGood />}
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDeleteContact(contact.id)}
              >
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Contacts;
