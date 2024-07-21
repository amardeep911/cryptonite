"use client";
import React, { useState, useEffect, FC, useCallback } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

type HistoricData = {
  prices: [number, number][];
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    pointRadius: number;
    pointHoverRadius: number;
  }[];
};

interface Props {
  id: string;
}

const Coingraph: FC<Props> = ({ id }) => {
  const [historicData, setHistoricData] = useState<HistoricData | null>(null);
  const [noOfDays, setNoOfDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/api/coins/historicData?id=${id}&days=${noOfDays}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.APIKEY}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "You've exceeded the API rate limit. Please wait a few minutes before trying again."
          );
        }
        throw new Error("Network response was not ok");
      }
      const data: HistoricData = await response.json();
      setHistoricData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id, noOfDays]);

  useEffect(() => {
    fetchData();
  }, []);

  const formatDataForChart = (): ChartData => {
    if (!historicData?.prices) {
      setError(
        "You've exceeded the API rate limit. Please wait a few minutes before trying again."
      );

      return {
        labels: [],
        datasets: [],
      };
    }

    const labels = historicData.prices.map((price) => {
      let date = new Date(price[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return noOfDays === 1 ? time : date.toLocaleDateString();
    });

    const data = historicData.prices.map((price) => price[1]);

    return {
      labels,
      datasets: [
        {
          label: "Price",
          data,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "rgba(75,192,192,1)",
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    };
  };

  console.log(historicData);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="flex items-center justify-center ">
        {loading && (
          <div className="mt-10 flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        {error && (
          <div className="text-center h-40 justify-center mt-24 text-red-500">
            {error.includes("rate limit")
              ? "You've exceeded the API rate limit. Please wait a few minutes before trying again."
              : `Error: ${error}`}
          </div>
        )}
        {!loading && !error && historicData && (
          <Line key={noOfDays} data={formatDataForChart()} />
        )}
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => setNoOfDays(1)}
          className={`px-4 py-2 rounded ${
            noOfDays === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          1D
        </button>
        <button
          onClick={() => setNoOfDays(7)}
          className={`px-4 py-2 rounded ${
            noOfDays === 7 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          7D
        </button>
        <button
          onClick={() => setNoOfDays(30)}
          className={`px-4 py-2 rounded ${
            noOfDays === 30
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          30D
        </button>
        <button
          onClick={() => setNoOfDays(365)}
          className={`px-4 py-2 rounded ${
            noOfDays === 365
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          1Y
        </button>
      </div>
    </div>
  );
};

export default Coingraph;
