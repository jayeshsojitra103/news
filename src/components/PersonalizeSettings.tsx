import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSource, toggleCategory } from "../store/preferencesSlice";
import { RootState } from "../store/store";

const PersonalizeSettings: React.FC = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.preferences);
  const [isOpen, setIsOpen] = useState(false);

  const handleSourceChange = (source: string) => {
    dispatch(toggleSource(source));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(toggleCategory(category));
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 px-4 py-2 rounded mb-4 hover:bg-gray-300 transition-colors"
      >
        {isOpen ? "Hide" : "Show"} Personalization Settings
      </button>
      {isOpen && (
        <div className="border rounded p-4">
          <h3 className="text-lg font-semibold mb-4">
            Customize Your News Feed
          </h3>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Preferred Sources:</h4>
            <div className="flex flex-wrap">
              {["NewsAPI", "The Guardian", "BBC News"].map((source) => (
                <label key={source} className="mr-4 mb-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.sources.includes(source)}
                    onChange={() => handleSourceChange(source)}
                    className="mr-2"
                  />
                  <span>{source}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Preferred Categories:</h4>
            <div className="flex flex-wrap">
              {["Business", "Technology", "Sports", "Entertainment"].map(
                (category) => (
                  <label key={category} className="mr-4 mb-2 flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    <span>{category}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizeSettings;
