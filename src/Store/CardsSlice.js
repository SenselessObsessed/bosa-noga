import { createSlice } from '@reduxjs/toolkit';

const CardsSlice = createSlice({
	name: 'cards',
	initialState: {
		showCards: true,
		search: '',
		activeBtn: false,
		cards: [],
		loading: false,
		error: null,
	},
	reducers: {
		changeShowCards(state, action) {
			state.showCards = action.payload;
		},
		changeSearch(state, action) {
			state.search = action.payload.search;
		},
		switchBtn(state, action) {
			state.activeBtn = action.payload;
		},
		loadingCards(state) {
			state.loading = true;
			state.activeBtn = false;
			state.error = null;
		},
		loadingInitialCards(state, action) {
			state.cards = action.payload.cards;
			state.loading = false;
		},
		loadingCardsSuccess(state, action) {
			state.loading = false;
			state.cards.push(...action.payload.cards);
		},
		loadingCardsError(state, action) {
			state.loading = false;
			state.error = action.payload.error;
		},
	},
});

export const {
	changeShowCards,
	changeSearch,
	loadingCards,
	loadingCardsSuccess,
	loadingCardsError,
	loadingInitialCards,
	switchBtn,
} = CardsSlice.actions;
export default CardsSlice.reducer;
