// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Contacts from "./components/Contacts";
import Deals from "./components/Deals";
import Jobs from "./components/Jobs";
import ApplyForm from "./components/ApplyForm";
import Thanks from "./components/Thanks";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 min-h-screen">
          <Header />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/apply-jobs" element={<ApplyForm />} />
              <Route path="/thanks" element={<Thanks />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
