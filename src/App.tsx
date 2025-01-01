import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsSearch from "./components/NewsSearch";
import NewsFeed from "./components/NewsFeed";
import PersonalizeSettings from "./components/PersonalizeSettings";
import { fetchNews } from "./store/newsSlice";
import { RootState, AppDispatch } from "./store/store";
import { Loader } from "./components/Loader";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, isLoading, error } = useSelector(
    (state: RootState) => state.news
  );
  const preferences = useSelector((state: RootState) => state.preferences);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch, preferences]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">News Aggregator</h1>
      <PersonalizeSettings />
      <NewsSearch />
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && !error && <NewsFeed articles={articles} />}
    </div>
  );
};

export default App;
