import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../Layouts/PageLayout';
import { Link } from 'react-router-dom';
import { removeInCart, resetResponse } from '../../Store/CartSlice';
import { useEffect, useState } from 'react';
import { FetchCartThunk } from '../../Store/Thunks/FetchCartThunk';
import PreLoader from '../UI/PreLoader';

export default function Cart() {
	const dispatch = useDispatch();
	const { items, endPrice, loading, error, response } = useSelector(
		state => state.cart
	);

	const [offerForm, setOfferForm] = useState({
		phone: '',
		address: '',
		accept: false,
	});

	useEffect(() => {
		dispatch(resetResponse());
	}, [dispatch]);

	useEffect(() => {
		if (localStorage.phone && localStorage.address) {
			setOfferForm({
				phone: decodeURIComponent(localStorage.phone),
				address: decodeURIComponent(localStorage.address),
				accept: false,
			});
		} else {
			setOfferForm({
				phone: '',
				address: '',
				accept: false,
			});
		}
	}, [loading]);

	const handleChange = ({ target }) => {
		const { name } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		setOfferForm(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmitOffer = e => {
		e.preventDefault();
		const mappedItems = items.map(item => ({
			id: Number(item.id),
			price: item.price,
			count: item.count,
		}));
		const body = {
			owner: {
				phone: offerForm.phone,
				address: offerForm.address,
			},
			orderItems: mappedItems,
		};

		dispatch(FetchCartThunk(body));
	};

	function formatCount(count) {
		let result = [];
		const countStr = count.toString();
		const splitCountStr = countStr.split('');
		for (let i = splitCountStr.length - 1; i >= 0; i -= 1) {
			if (i !== 0 && (splitCountStr.length - i) % 3 === 0) {
				result.push(splitCountStr[i], ' ');
			} else {
				result.push(splitCountStr[i]);
			}
		}
		return result.reverse().join('');
	}

	return (
		<PageLayout>
			{loading ? (
				<PreLoader />
			) : (
				<>
					<section className='cart'>
						<h2 className='text-center'>Корзина</h2>
						<table className='table table-bordered'>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Название</th>
									<th scope='col'>Размер</th>
									<th scope='col'>Кол-во</th>
									<th scope='col'>Стоимость</th>
									<th scope='col'>Итого</th>
									<th scope='col'>Действия</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item, countId) => {
									return (
										<tr key={countId}>
											<th scope='row'>{countId + 1}</th>
											<td>
												<Link to={`/catalog/${item.id}`}>{item.title}</Link>
											</td>
											<td>{item.size}</td>
											<td>{item.count}</td>
											<td>{`${formatCount(item.price)} руб.`}</td>
											<td>{`${formatCount(item.price * item.count)} руб.`}</td>
											<td>
												<button
													className='btn btn-outline-danger btn-sm'
													onClick={() =>
														dispatch(removeInCart({ id: item.id }))
													}
												>
													Удалить
												</button>
											</td>
										</tr>
									);
								})}
								<tr>
									<td colSpan='5' className='text-right'>
										Общая стоимость
									</td>
									<td>{`${formatCount(endPrice)} руб.`}</td>
								</tr>
							</tbody>
						</table>
					</section>
					<section className='order'>
						<h2 className='text-center'>Оформить заказ</h2>
						<div
							className='card'
							style={{ maxWidth: '30rem', margin: '0 auto' }}
						>
							<form className='card-body' onSubmit={handleSubmitOffer}>
								<div className='form-group'>
									<label htmlFor='phone'>Телефон</label>
									<input
										className='form-control'
										id='phone'
										placeholder='Ваш телефон'
										name='phone'
										onChange={handleChange}
										value={offerForm.phone}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='address'>Адрес доставки</label>
									<input
										className='form-control'
										id='address'
										placeholder='Адрес доставки'
										name='address'
										onChange={handleChange}
										value={offerForm.address}
									/>
								</div>
								<div className='form-group form-check'>
									<input
										type='checkbox'
										className='form-check-input'
										id='agreement'
										name='accept'
										onChange={handleChange}
										value={offerForm.accept}
									/>
									<label className='form-check-label' htmlFor='agreement'>
										Согласен с правилами доставки
									</label>
								</div>
								<button
									type='submit'
									className='btn btn-outline-secondary'
									disabled={
										offerForm.accept &&
										offerForm.phone !== '' &&
										offerForm.address !== '' &&
										items.length
											? false
											: true
									}
								>
									Оформить
								</button>
							</form>
						</div>
					</section>
					{response && (
						<div className='error-retry'>
							<div className='alert alert-success text-center' role='alert'>
								Заказ сформирован!
							</div>
						</div>
					)}
					{error && (
						<div className='error-retry'>
							<div class='alert alert-danger text-center' role='alert'>
								Ошибка! Попробуйте позже.
							</div>
						</div>
					)}
				</>
			)}
		</PageLayout>
	);
}
