import {
	loadingCart,
	loadingCartFailed,
	loadingCartSuccess,
	resetCart,
} from '../CartSlice';

export const FetchCartThunk = body => async (dispatch, getState) => {
	const url = 'https://bosa-noga-backend-kc9h.onrender.com/api/order';
	dispatch(loadingCart());

	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error('Failed to fetch');
		}

		localStorage.setItem('phone', encodeURIComponent(body.owner.phone));
		localStorage.setItem('address', encodeURIComponent(body.owner.address));

		dispatch(loadingCartSuccess({ response: response.status }));
		dispatch(resetCart());
	} catch (error) {
		dispatch(loadingCartFailed({ error: 'Failed to fetch' }));
	}
};
