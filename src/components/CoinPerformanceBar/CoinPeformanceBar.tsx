"use client";
import React from "react";

type Props = {
  low24h: number;
  high24h: number;
  low52w: number;
  high52w: number;
};

const CoinPerformanceBar: React.FC<Props> = ({
  low24h,
  high24h,
  low52w,
  high52w,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Performance Metrics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border">
          <span className="font-semibold text-gray-700">Today&apos;s Low:</span>
          <span className="text-gray-900">${low24h.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border">
          <span className="font-semibold text-gray-700">
            Today&apos;s High:
          </span>
          <span className="text-gray-900">${high24h.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border">
          <span className="font-semibold text-gray-700">52-Week Low:</span>
          <span className="text-gray-900">${low52w.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border">
          <span className="font-semibold text-gray-700">52-Week High:</span>
          <span className="text-gray-900">${high52w.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CoinPerformanceBar;
