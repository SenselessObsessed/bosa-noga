import { loadingCategoriesSuccess } from '../CategoriesSlice';

export const FetchCategoriesThunk = () => async (dispatch, getState) => {
	const url = 'https://bosa-noga-backend-kc9h.onrender.com/api/categories';
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		const data = await response.json();
		dispatch(
			loadingCategoriesSuccess({
				categories: [{ id: 0, title: 'Все' }, ...data],
			})
		);
	} catch (error) {
		setTimeout(() => {
			dispatch(FetchCategoriesThunk());
		}, 3000);
	}
};
