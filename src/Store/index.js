import { configureStore } from '@reduxjs/toolkit';
import HitsSlice from './HitsSlice';
import CategoriesSlice from './CategoriesSlice';
import CardsSlice from './CardsSlice';
import CardSlice from './CardSlice';
import CartSlice from './CartSlice';

const store = configureStore({
	reducer: {
		hits: HitsSlice,
		categories: CategoriesSlice,
		cards: CardsSlice,
		card: CardSlice,
		cart: CartSlice,
	},
});

export default store;
