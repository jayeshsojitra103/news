import React from "react";
import { Article } from "../types";

interface NewsFeedProps {
  articles: Article[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <p className="text-center text-xl text-black font-bold">
        No Articles found. Try Adjusting Your Search or Preferences.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="border rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={
              article.urlToImage ||
              "https://placehold.co/600x400?text=No%20Image%20Found"
            }
            alt={article.title}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{article.source}</span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
