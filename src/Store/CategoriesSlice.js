import { createSlice } from '@reduxjs/toolkit';

const CategoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		currCategory: 0,
		categories: [],
		loading: false,
		error: null,
	},
	reducers: {
		loadingCategoriesSuccess(state, action) {
			state.loading = false;
			state.categories = action.payload.categories;
		},
		selectCategory(state, action) {
			state.currCategory = action.payload.category;
		},
	},
});

export const { loadingCategoriesSuccess, selectCategory } =
	CategoriesSlice.actions;
export default CategoriesSlice.reducer;
