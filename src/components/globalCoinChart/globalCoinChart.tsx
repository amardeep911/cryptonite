"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {};

const GlobalCoinChart = (props: Props) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/coins/charData"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        const data = json.coinGraphData.data;

        if (!data || !data.total_market_cap) {
          throw new Error("Data structure is not as expected");
        }

        const labels = Object.keys(data.total_market_cap);
        const values = Object.values(data.total_market_cap);

        const formattedData: any = {
          labels: labels,
          datasets: [
            {
              label: "Total Market Cap (USD)",
              data: values,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
              tension: 0.1,
            },
          ],
        };

        setChartData(formattedData);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Global Coin Market Cap
      </h2>
      <div className="flex items-center justify-center ">
        {loading && (
          <div className=" mt-10 flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500">Error: {error}</div>
        )}
        {chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Cryptocurrency",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Market Cap in USD",
                  },
                  beginAtZero: false,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GlobalCoinChart;
