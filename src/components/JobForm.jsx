import React, { useState, useEffect } from "react";

const JobForm = ({ onSave, editingJob }) => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (editingJob) {
      setJob(editingJob);
    } else {
      setJob({ title: "", company: "", location: "", description: "" });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job.title && job.company && job.location && job.description) {
      onSave(job);
      setJob({ title: "", company: "", location: "", description: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label className="block text-gray-700">Job Title</label>
        <input
          type="text"
          name="title"
          value={job.title}
          onChange={handleChange}
          className="mt-1 block w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Company</label>
        <input
          type="text"
          name="company"
          value={job.company}
          onChange={handleChange}
          className="mt-1 block w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={job.location}
          onChange={handleChange}
          className="mt-1 block w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          className="mt-1 block w-full border rounded py-2 px-3"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={
          !job.title || !job.company || !job.location || !job.description
        }
      >
        {editingJob ? "Update" : "Add"} Job
      </button>
    </form>
  );
};

export default JobForm;
