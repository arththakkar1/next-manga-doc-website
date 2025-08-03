import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialValue = "",
  placeholder = "Search manga...",
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <div className="w-full flex justify-center mx-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-full shadow-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition"
      >
        <svg
          className="w-5 h-5 text-zinc-400 mr-3"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500 text-base"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="ml-3 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
