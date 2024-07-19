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
    <div className="bg-white rounded shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Performance Metrics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex justify-between items-center p-2 border-b">
          <span className="font-semibold">Today's Low:</span>
          <span>${low24h.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center p-2 border-b">
          <span className="font-semibold">Today's High:</span>
          <span>${high24h.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center p-2 border-b">
          <span className="font-semibold">52-Week Low:</span>
          <span>${low52w.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center p-2">
          <span className="font-semibold">52-Week High:</span>
          <span>${high52w.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CoinPerformanceBar;
