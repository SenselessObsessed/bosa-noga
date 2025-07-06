import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: null,
	endPrice: 0,
	response: null,
	loading: false,
	error: null,
};

if (!localStorage.items) {
	localStorage.setItem('items', JSON.stringify([]));
	initialState.items = JSON.parse(localStorage.items);
} else {
	const items = JSON.parse(localStorage.items);
	initialState.items = items;
	const sumPrice = items.reduce(
		(acc, curr) => acc + curr.count * curr.price,
		0
	);
	initialState.endPrice = sumPrice;
}

const CartSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		addToCart(state, action) {
			const haveItem = state.items.findIndex(
				item => item.id === action.payload.item.id
			);
			if (
				haveItem >= 0 &&
				state.items[haveItem].size === action.payload.item.size
			) {
				state.items[haveItem].count += action.payload.item.count;
			} else {
				state.items.push(action.payload.item);
			}

			state.endPrice += action.payload.item.count * action.payload.item.price;

			localStorage.setItem('items', JSON.stringify(state.items));
		},
		removeInCart(state, action) {
			const itemId = state.items.findIndex(
				item => item.id === action.payload.id
			);

			state.endPrice -= state.items[itemId].count * state.items[itemId].price;

			state.items.splice(itemId, 1);
			localStorage.setItem('items', JSON.stringify(state.items));
		},
		loadingCart(state) {
			state.loading = true;
			state.error = null;
		},
		loadingCartSuccess(state, action) {
			state.loading = false;
			state.response = action.payload.response;
		},
		loadingCartFailed(state, action) {
			state.loading = false;
			state.error = action.payload.error;
		},
		resetResponse(state) {
			state.loading = false;
			state.error = null;
			state.response = null;
		},
		resetCart(state) {
			state.items = [];
			state.endPrice = 0;
			localStorage.setItem('items', JSON.stringify([]));
		},
	},
});

export const {
	addToCart,
	removeInCart,
	loadingCart,
	loadingCartSuccess,
	loadingCartFailed,
	resetResponse,
	resetCart,
} = CartSlice.actions;
export default CartSlice.reducer;
