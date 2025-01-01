import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences } from '../types';

const initialState: UserPreferences = {
    sources: ['The Guardian'],
    categories: [],
    authors: [],
};

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        setPreferences: (_state, action: PayloadAction<UserPreferences>) => {
            return action.payload;
        },
        toggleSource: (state, action: PayloadAction<string>) => {
            const source = action.payload;
            if (state.sources.includes(source)) {
                state.sources = state.sources.filter(s => s !== source);
            } else {
                state.sources.push(source);
            }
            if (state.sources.length === 0) {
                state.sources.push('The Guardian');
            }

        },
        toggleCategory: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            if (state.categories.includes(category)) {
                state.categories = state.categories.filter(c => c !== category);
            } else {
                state.categories.push(category);
            }
        },
    },
});

export const { setPreferences, toggleSource, toggleCategory } = preferencesSlice.actions;
export default preferencesSlice.reducer;

