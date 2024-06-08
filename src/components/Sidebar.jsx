// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink
              to="/"
              exact
              className="text-white"
              activeClassName="font-bold"
            >
              Home
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/contacts"
              className="text-white"
              activeClassName="font-bold"
            >
              Contacts
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/deals"
              className="text-white"
              activeClassName="font-bold"
            >
              Deals
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/jobs"
              className="text-white"
              activeClassName="font-bold"
            >
              Jobs
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
