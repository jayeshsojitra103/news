import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm, setFilters, fetchNews } from "../store/newsSlice";
import { SearchFilters } from "../types";
import { AppDispatch } from "../store/store";

const NewsSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearchTerm));
    dispatch(
      setFilters({
        date: dateFilter,
        category: categoryFilter,
      } as SearchFilters)
    );
    dispatch(fetchNews());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Filter by date</option>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full px-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Filter by category</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default NewsSearch;
