import { createSlice } from '@reduxjs/toolkit';

const HitsSlice = createSlice({
	name: 'hits',
	initialState: {
		nothing: false,
		hits: null,
		loading: false,
		error: null,
	},
	reducers: {
		loadingHits(state) {
			state.loading = true;
			state.error = null;
		},
		loadingHitsSuccess(state, action) {
			state.loading = false;
			state.hits = action.payload.hits;
		},
		loadingHitsError(state, action) {
			state.loading = false;
			state.error = action.payload.error;
		},
		setNothing(state) {
			state.nothing = true;
		},
	},
});

export const { loadingHits, loadingHitsSuccess, loadingHitsError, setNothing } =
	HitsSlice.actions;
export default HitsSlice.reducer;
