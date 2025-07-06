import {
	switchBtn,
	loadingCards,
	loadingCardsError,
	loadingCardsSuccess,
	loadingInitialCards,
	changeShowCards,
} from '../CardsSlice';

export const FetchCardsThunk =
	(offset = 0, category = 0, search = '', more = false) =>
	async (dispatch, getState) => {
		if (!more) {
			dispatch(changeShowCards(false));
		}
		dispatch(loadingCards());
		const urlParams = new URLSearchParams();

		if (category) {
			urlParams.append('categoryId', category);
		}

		if (offset) {
			urlParams.append('offset', offset);
		}

		if (search) {
			urlParams.append('q', search);
		}

		const url = `http://localhost:7070/api/items?${urlParams}`;

		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error('Failed to fetch');
			}
			const data = await response.json();
			if (data.length < 6) {
				dispatch(switchBtn(false));
			} else {
				dispatch(switchBtn(true));
			}

			if (search && offset) {
				dispatch(loadingCardsSuccess({ cards: data }));
			} else if (search && !offset) {
				dispatch(loadingInitialCards({ cards: data }));
			} else if (!search && offset) {
				dispatch(loadingCardsSuccess({ cards: data }));
			} else {
				dispatch(loadingInitialCards({ cards: data }));
			}
			if (!more) {
				dispatch(changeShowCards(true));
			}
		} catch (error) {
			dispatch(loadingCardsError({ error: 'Failed to fetch' }));
		}
	};
