import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticles } from '../utils/api';
import { Article, UserPreferences, SearchFilters } from '../types';

interface NewsState {
    articles: Article[];
    isLoading: boolean;
    error: string | null;
    searchTerm: string;
    filters: SearchFilters;
}

const initialState: NewsState = {
    articles: [],
    isLoading: false,
    error: null,
    searchTerm: '',
    filters: {},
};

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, { getState }) => {
        const state = getState() as { news: NewsState; preferences: UserPreferences };
        const { searchTerm, filters } = state.news;
        const { sources, categories, authors } = state.preferences;

        return await fetchArticles({
            sources,
            categories,
            authors,
            searchTerm,
            ...filters
        });
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setFilters: (state, action: PayloadAction<SearchFilters>) => {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export const { setSearchTerm, setFilters } = newsSlice.actions;
export default newsSlice.reducer;

