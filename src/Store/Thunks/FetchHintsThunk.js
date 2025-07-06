import {
	loadingHits,
	loadingHitsSuccess,
	loadingHitsError,
	setNothing,
} from '../HitsSlice';

export const FetchHintsThunk = () => async (dispatch, getState) => {
	const url = 'https://bosa-noga-backend-kc9h.onrender.com/api/top-sales';
	dispatch(loadingHits());

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		const data = await response.json();

		if (data.length === 0) {
			dispatch(setNothing(true));
		} else {
			dispatch(loadingHitsSuccess({ hits: data }));
		}
	} catch (error) {
		dispatch(loadingHitsError({ error: 'Failed to fetch' }));
	}
};
