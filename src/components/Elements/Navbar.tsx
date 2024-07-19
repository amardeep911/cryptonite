"use client";
import React, { useState, useEffect, useRef } from "react";

type Props = {};

const Navbar: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchSearchResults = async (query: string) => {
    if (query.length > 0) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const data = await response.json();
      setSearchResults(data.coins.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleResultClick = (coinId: string) => {
    window.location.href = `http://localhost:3000/coinDetail/${coinId}`;
  };

  return (
    <>
      <nav className="bg-gray-800  p-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row align-middle text-center items-center justify-between">
          <div className="text-white text-xl flex-row justify-center items-center align-middle font-bold">
            <a href="/">Cryptonite</a>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center w-full max-w-md mx-auto  lg:mx-0 lg:ml-auto"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full p-2 rounded-l-md border border-gray-300"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-r-md border border-blue-600 hover:bg-blue-600"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {searchResults.length > 0 && (
        <div className="bg-white shadow-md w-screen p-4 absolute sticky  left-0 right-0 top-16 mx-auto z-40">
          <ul>
            {searchResults.map((coin: any) => (
              <li
                key={coin.id}
                onClick={() => handleResultClick(coin.id)}
                className="border-b border-gray-200 py-2 cursor-pointer hover:bg-gray-100"
              >
                {coin.name} ({coin.symbol.toUpperCase()})
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
