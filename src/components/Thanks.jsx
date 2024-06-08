import React from "react";
import { Link } from "react-router-dom";

export default function Thanks() {
  return (
    <>
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-green-600">
          Thank you, we will connect soon!
        </h2>
        <p className="mt-2 flex justify-center items-center gap-1 text-xl ">
          {" "}
          Apply Others Catagories
          <Link to="/jobs" className="text-blue-600 italic">
            Jobs
          </Link>
        </p>
      </div>
    </>
  );
}
