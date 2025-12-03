import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
    title: string;
    author: string;
}

const initialState: FilterState = {
    title: '',
    author: '',
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setAuthor: (state, action: PayloadAction<string>) => {
            state.author = action.payload;
        },
        clearFilters: (state) => {
            state.title = '';
            state.author = '';
        },
    },
});

export const { setTitle, setAuthor, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;