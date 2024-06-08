// src/components/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";

const Dashboard = ({ totalJobs, totalContacts, totalDeals }) => {
  const data = {
    labels: ["Jobs", "Contacts", "Deals"],
    datasets: [
      {
        label: "Total",
        // data: [totalJobs, totalContacts, totalDeals],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/jobs">
          <div className="bg-white p-8 rounded shadow-md cursor-pointer">
            <h2 className="text-xl font-bold mb-4">Jobs</h2>
            <p className="text-gray-600">View and manage job postings</p>
          </div>
        </Link>
        <Link to="/contacts">
          <div className="bg-white p-8 rounded shadow-md cursor-pointer">
            <h2 className="text-xl font-bold mb-4">Contacts</h2>
            <p className="text-gray-600">View and manage contacts</p>
          </div>
        </Link>
        <Link to="/deals">
          <div className="bg-white p-8 rounded shadow-md cursor-pointer">
            <h2 className="text-xl font-bold mb-4">Deals</h2>
            <p className="text-gray-600">View and manage deals</p>
          </div>
        </Link>
      </div>

      <div className="col-span-3">
        {/* <Bar /> */}
        hi
      </div>
    </>
  );
};

export default Dashboard;
