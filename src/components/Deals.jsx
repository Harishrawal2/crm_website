import React, { useState, useEffect } from "react";
import DealForm from "./DealForm";
import { GrStatusGood } from "react-icons/gr";
import { MdGppBad } from "react-icons/md";
import { MdDelete, MdEdit } from "react-icons/md";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [editingDeal, setEditingDeal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dealsPerPage = 4;

  // Load deals from local storage when the component mounts
  useEffect(() => {
    const savedDeals = localStorage.getItem("deals");
    if (savedDeals) {
      setDeals(JSON.parse(savedDeals));
    }
  }, []);

  // Save deals to local storage whenever it changes
  useEffect(() => {
    if (deals.length > 0) {
      localStorage.setItem("deals", JSON.stringify(deals));
    }
  }, [deals]);

  const handleSaveDeal = (deal) => {
    if (editingDeal !== null) {
      // If editing an existing deal, update it
      const updatedDeals = deals.map((d) =>
        d.id === editingDeal.id ? { ...d, ...deal } : d
      );
      setDeals(updatedDeals);
      setEditingDeal(null);
    } else {
      // Otherwise, add a new deal
      setDeals([...deals, { ...deal, id: Date.now(), completed: false }]);
    }
  };
  const handleEditDeal = (deal) => {
    // Set the deal to be edited
    setEditingDeal(deal);
  };

  const handleDeleteDeal = (id) => {
    // Remove the deal with the given id
    const updatedDeals = deals.filter((deal) => deal.id !== id);
    setDeals(updatedDeals);
  };

  const handleCompleteDeal = (id) => {
    // Mark the deal with the given id as complete
    const updatedDeals = deals.map((deal) =>
      deal.id === id ? { ...deal, completed: !deal.completed } : deal
    );
    setDeals(updatedDeals);
  };

  // Calculate the current page's deals
  const indexOfLastDeal = currentPage * dealsPerPage;
  const indexOfFirstDeal = indexOfLastDeal - dealsPerPage;
  const currentDeals = deals.slice(indexOfFirstDeal, indexOfLastDeal);

  // Calculate the total number of pages
  const totalPages = Math.ceil(deals.length / dealsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main className="flex-1 p-4">
      <h2 className="text-2xl font-bold">Deals</h2>
      <DealForm onSave={handleSaveDeal} editingDeal={editingDeal} />
      <div className="mt-4">
        <p>Total Deals: {deals.length}</p>
      </div>
      <ul className="mt-4 text-lg">
        {currentDeals.map((deal) => (
          <li
            key={deal.id}
            className="border-b py-2 flex items-center justify-between"
          >
            <div
              className={`flex items-center justify-between ${
                deal.completed ? "line-through text-green-500" : ""
              }`}
            >
              {deal.title} - ${deal.amount}
            </div>
            <div className="text-2xl flex justify-center items-center gap-10">
              <button
                className="mr-2 text-blue-500"
                onClick={() => handleEditDeal(deal)}
              >
                <MdEdit />
              </button>
              <button
                className="mr-2 text-green-500"
                onClick={() => handleCompleteDeal(deal.id)}
              >
                {deal.completed ? <MdGppBad /> : <GrStatusGood />}
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDeleteDeal(deal.id)}
              >
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-700 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-700 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Deals;
