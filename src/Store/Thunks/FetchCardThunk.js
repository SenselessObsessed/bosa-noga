import {
	loadingCard,
	loadingCardSuccess,
	setAvailableSizes,
} from '../CardSlice';

export const FetchCardThunk = id => async (dispatch, getState) => {
	const url = `http://localhost:7070/api/items/${id}`;
	dispatch(loadingCard());

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		const data = await response.json();

		let available = false;
		data.sizes.forEach(size => {
			if (size.available) available = true;
		});

		if (!available) {
			dispatch(setAvailableSizes());
		}
		dispatch(loadingCardSuccess({ card: data }));
	} catch (error) {
		setTimeout(() => {
			dispatch(FetchCardThunk(id));
		}, 3000);
	}
};
