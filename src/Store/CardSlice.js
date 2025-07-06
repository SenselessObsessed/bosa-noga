import { createSlice } from '@reduxjs/toolkit';

const CardSlice = createSlice({
	name: 'card',
	initialState: {
		availableSizes: true,
		count: 1,
		selectedSize: null,
		card: {},
		loading: false,
		error: null,
	},
	reducers: {
		setAvailableSizes(state) {
			state.availableSizes = false;
		},
		incrementCount(state) {
			state.count += 1;
		},
		decrementCount(state) {
			state.count -= 1;
		},
		selectSize(state, action) {
			state.selectedSize = action.payload.size;
		},
		loadingCard(state) {
			state.loading = true;
			state.error = null;
		},
		loadingCardSuccess(state, action) {
			state.loading = false;
			state.card = action.payload.card;
		},
		resetCard(state) {
			state.card = {};
		},
	},
});

export const {
	setAvailableSizes,
	incrementCount,
	decrementCount,
	selectSize,
	loadingCard,
	loadingCardSuccess,
	resetCard,
} = CardSlice.actions;
export default CardSlice.reducer;
