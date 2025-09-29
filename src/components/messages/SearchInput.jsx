import useMessageStore from "@/stores/useMessageStore";
import { Search } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function SearchInput() {
  const { conversations, setSelectedConversation } = useMessageStore();
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form className="flex items-center gap-3 " onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <div
          className={`
          relative overflow-hidden rounded-full border-2 transition-all duration-300 ease-in-out
          ${
            isFocused
              ? "border-sky-400 shadow-lg shadow-sky-200/50 bg-white"
              : "border-slate-300 hover:border-slate-400 bg-slate-50/80"
          }
        `}
        >
          {/* Animated background gradient */}
          <div
            className={`
            absolute inset-0 bg-gradient-to-r from-sky-50 to-blue-50 opacity-0 transition-opacity duration-300
            ${isFocused ? "opacity-100" : "opacity-0"}
          `}
          />

          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Search
              className={`
              w-4 h-4 md:w-5 md:h-5 transition-colors duration-200
              ${isFocused ? "text-sky-500" : "text-slate-400"}
            `}
            />
          </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search conversations..."
            className="
              w-full pl-11 md:pl-12 pr-4 py-3 md:py-4 
              bg-transparent border-none outline-none 
              text-sm md:text-base text-slate-700 placeholder-slate-400
              transition-all duration-200 relative z-10
            "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* Clear button (appears when typing) */}
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                absolute right-12 md:right-14 top-1/2 transform -translate-y-1/2 z-10
                w-5 h-5 rounded-full bg-slate-300 hover:bg-slate-400 
                flex items-center justify-center transition-all duration-200
                opacity-60 hover:opacity-100
              "
            >
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Search suggestions indicator */}
        {search.length > 0 && search.length < 3 && (
          <div className="absolute top-full mt-1 left-0 text-xs text-slate-500">
            Type {3 - search.length} more character
            {3 - search.length !== 1 ? "s" : ""} to search
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!search || search.length < 3}
        className={`
          p-3 md:p-4 rounded-full transition-all duration-300 ease-in-out
          transform hover:scale-105 active:scale-95 
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          ${
            search && search.length >= 3
              ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl text-white"
              : "bg-slate-200 text-slate-400"
          }
        `}
      >
        <Search className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </form>
  );
}

export default SearchInput;
