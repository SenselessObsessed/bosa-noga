import { useSelector, useDispatch } from 'react-redux';
import PreLoader from '../UI/PreLoader';
import { useEffect, useState } from 'react';
import { FetchCategoriesThunk } from '../../Store/Thunks/FetchCategoriesThunk';
import ErrorRetry from '../UI/ErrorRetry';
import Category from './Category';
import { FetchCardsThunk } from '../../Store/Thunks/FetchCardsThunk';
import Card from './Card';
import { changeSearch } from '../../Store/CardsSlice';
import PropTypes from 'prop-types';

export default function CatalogComponent({ searchInput }) {
	const { categories, currCategory } = useSelector(state => state.categories);
	const { showCards, search, activeBtn, cards, loading, error } = useSelector(
		state => state.cards
	);
	const dispatch = useDispatch();

	const [input, setInput] = useState('');

	useEffect(() => {
		dispatch(FetchCategoriesThunk());
		dispatch(FetchCardsThunk(0, currCategory, search));
		setInput(search);
	}, [currCategory, dispatch, search]);

	const handlerClick = () => {
		dispatch(FetchCardsThunk(cards.length, currCategory, search, true));
	};

	const handleChange = ({ target }) => {
		const { value } = target;
		setInput(value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(changeSearch({ search: input }));
	};

	return (
		<section className='catalog'>
			<h2 className='text-center'>Каталог</h2>
			{searchInput && (
				<form
					className='catalog-search-form form-inline'
					onSubmit={e => handleSubmit(e)}
				>
					<input
						className='form-control'
						placeholder='Поиск'
						value={input}
						onChange={handleChange}
					/>
				</form>
			)}
			{categories && (
				<ul className='catalog-categories nav justify-content-center'>
					{categories?.map(category => (
						<Category {...category} key={category.id} />
					))}
				</ul>
			)}

			{error ? (
				<ErrorRetry retry={() => FetchCardsThunk(cards.length, currCategory)} />
			) : (
				<>
					{showCards && (
						<div className='row'>
							{cards?.map(card => (
								<Card {...card} key={card.id} />
							))}
						</div>
					)}
					{!cards.length && !loading && (
						<div className='alert alert-info text-center' role='alert'>
							Ничего не найдено.
						</div>
					)}
					{loading && <PreLoader />}
					{activeBtn && (
						<div className='text-center'>
							<button
								className='btn btn-outline-primary'
								onClick={handlerClick}
								disabled={loading ? true : false}
							>
								Загрузить ещё
							</button>
						</div>
					)}
				</>
			)}
		</section>
	);
}

CatalogComponent.propTypes = {
	searchInput: PropTypes.bool,
};
