// Pagination.tsx
"use client";
import React from "react";

type Props = {
  pageNo: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<Props> = ({ pageNo, setPageNo }) => {
  return (
    <div className="mt-4 flex flex-row justify-end">
      {pageNo !== 1 && (
        <button
          onClick={() => setPageNo(pageNo - 1)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Previous
        </button>
      )}
      <button
        onClick={() => setPageNo(pageNo + 1)}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
