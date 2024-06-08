import React, { useState, useEffect } from "react";
import JobForm from "./JobForm";
import { MdDelete, MdEdit } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  // Load deals from local storage when the component mounts
  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  // Save deals to local storage whenever it changes
  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem("jobs", JSON.stringify(jobs));
    }
  }, [jobs]);

  const handleSaveJob = (job) => {
    if (editingJob !== null) {
      // If editing an existing job, update it
      const updatedJobs = jobs.map((j) =>
        j.id === editingJob.id ? { ...j, ...job } : j
      );
      setJobs(updatedJobs);
      setEditingJob(null);
    } else {
      // Otherwise, add a new job
      setJobs([...jobs, { ...job, id: Date.now(), completed: false }]);
    }
  };

  const handleEditJob = (job) => {
    // Set the job to be edited
    setEditingJob(job);
  };

  const handleDeleteJob = (id) => {
    // Remove the job with the given id
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  };

  const handleCompleteJob = (id) => {
    // Mark the job with the given id as complete
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, completed: !job.completed } : job
    );
    setJobs(updatedJobs);
  };

  // Calculate the current page's jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate the total number of pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main className="flex-1 p-4">
      <h2 className="text-2xl font-bold">Job Postings</h2>
      <JobForm onSave={handleSaveJob} editingJob={editingJob} />
      <div className="mt-4">
        <p>Total Jobs: {jobs.length}</p>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className={`border py-4 px-6 rounded-md ${
              job.completed
                ? "line-through text-green-500 bg-gray-200"
                : "bg-white"
            }`}
          >
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">
                {job.company}, {job.location}
              </p>
              <p className="mt-2">{job.description}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <button className="bg-black text-white py-1 px-5 rounded hover:bg-gray-900 hover:text-white">
                  <Link
                    to="/apply-jobs"
                    className="flex justify-center items-center gap-1 italic"
                  >
                    Apply <FiExternalLink />
                  </Link>
                </button>
              </div>
              <div className="gap-5 text-xl">
                <button className="mr-2" onClick={() => handleEditJob(jobs)}>
                  <MdEdit className="text-yellow-500" />
                </button>
                <button onClick={() => handleDeleteJob(job.id)}>
                  <MdDelete className="text-red-500 font-semibold" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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

export default Jobs;
