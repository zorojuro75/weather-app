'use client'
import React, { useState } from "react";
import MainComponent from "./MainComponent";

type Props = {};

const SearchBox = (props: Props) => {
  const [location, setLocation] = useState<string>("Dhaka");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loc = formData.get("location");
    setLocation(loc?.toString() || 'Dhaka');
  };

  return (
    <div className="backdrop-blur-xl rounded-lg shadow-2xl px-4 py-6 md:p-8 md:w-[65%]">
      <form className="flex mb-4 px-4 bg-transparent" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a location"
          id="location"
          name="location"
          className="bg-transparent w-full rounded border mr-0 border-gray-400 text-gray-800 p-3 block focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 border-0 rounded-sm">Get Weather</button>
      </form>
      <MainComponent location={location} />
    </div>
  );
};

export default SearchBox;