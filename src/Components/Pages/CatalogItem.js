import { useEffect } from 'react';
import PageLayout from '../Layouts/PageLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchCardThunk } from '../../Store/Thunks/FetchCardThunk';
import PreLoader from '../UI/PreLoader';
import ErrorRetry from '../UI/ErrorRetry';
import {
	decrementCount,
	incrementCount,
	resetCard,
	selectSize,
} from '../../Store/CardSlice';
import { addToCart } from '../../Store/CartSlice';

export default function CatalogItem() {
	const { availableSizes, count, selectedSize, card, loading, error } =
		useSelector(state => state.card);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		dispatch(resetCard());
		dispatch(FetchCardThunk(params.id));
	}, [dispatch, params]);

	const handleIncrement = () => {
		if (count === 10) return;
		dispatch(incrementCount());
	};

	const handleDecrement = () => {
		if (count === 1) return;
		dispatch(decrementCount());
	};

	const handleClickAddToCart = () => {
		const item = {
			title: card.title,
			size: selectedSize,
			id: params.id,
			price: card.price,
			count: count,
		};

		dispatch(addToCart({ item: item }));
		navigate('/cart');
	};

	return (
		<PageLayout>
			{loading && <PreLoader />}
			{error && (
				<ErrorRetry retry={() => dispatch(FetchCardThunk(params.id))} />
			)}
			{card.title && (
				<section className='catalog-item'>
					<h2 className='text-center'>{card?.title}</h2>
					<div className='row'>
						<div className='col-5'>
							<img
								src={card.images[0]}
								className='img-fluid'
								alt={card?.title}
							/>
						</div>
						<div className='col-7'>
							<table className='table table-bordered'>
								<tbody>
									<tr>
										<td>Артикул</td>
										<td>{card?.sku}</td>
									</tr>
									<tr>
										<td>Производитель</td>
										<td>{card?.manufacturer}</td>
									</tr>
									<tr>
										<td>Цвет</td>
										<td>{card?.color}</td>
									</tr>
									<tr>
										<td>Материалы</td>
										<td>{card?.material}</td>
									</tr>
									<tr>
										<td>Сезон</td>
										<td>{card?.season}</td>
									</tr>
									<tr>
										<td>Повод</td>
										<td>{card?.reason}</td>
									</tr>
								</tbody>
							</table>
							<div className='text-center'>
								<p>
									Размеры в наличии:
									{card?.sizes?.map((size, id) => {
										if (!size.available) return null;
										const handleClick = () => {
											if (size.size === selectedSize) {
												dispatch(selectSize({ size: null }));
											} else {
												dispatch(selectSize({ size: size.size }));
											}
										};

										return (
											<span
												className={
													size.size === selectedSize
														? 'catalog-item-size size selected'
														: 'catalog-item-size size'
												}
												key={id}
												onClick={handleClick}
											>
												{size.size}
											</span>
										);
									})}
								</p>
								{availableSizes && (
									<p>
										Количество:
										<span className='btn-group btn-group-sm pl-2'>
											<button
												className='btn btn-secondary'
												onClick={handleDecrement}
											>
												-
											</button>
											<span className='btn btn-outline-primary'>{count}</span>
											<button
												className='btn btn-secondary'
												onClick={handleIncrement}
											>
												+
											</button>
										</span>
									</p>
								)}
							</div>
							{availableSizes && (
								<button
									className='btn btn-danger btn-block btn-lg'
									disabled={selectedSize ? false : true}
									onClick={handleClickAddToCart}
								>
									В корзину
								</button>
							)}
						</div>
					</div>
				</section>
			)}
		</PageLayout>
	);
}
