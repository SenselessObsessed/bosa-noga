import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/header-logo.png';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearch } from '../../Store/CardsSlice';

export default function Header() {
	const { items } = useSelector(state => state.cart);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [searchClicked, setSearchClicked] = useState(false);
	const [input, setInput] = useState('');

	const handleClick = () => {
		if (input === '') {
			setSearchClicked(prev => !prev);
		} else if (input && !searchClicked) {
			setSearchClicked(prev => !prev);
		} else {
			dispatch(changeSearch({ search: input }));
			setInput('');
			setSearchClicked(false);
			navigate('/catalog');
		}
	};

	const handleChange = ({ target }) => {
		const { value } = target;
		setInput(value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(changeSearch({ search: input }));
		setInput('');
		setSearchClicked(false);
		navigate('/catalog');
	};

	const handleClickCart = () => {
		navigate('/cart');
	};

	return (
		<header className='container'>
			<div className='row'>
				<div className='col'>
					<nav className='navbar navbar-expand-sm navbar-light bg-light'>
						<Link to='/' className='navbar-brand'>
							<img src={logo} alt='Bosa Noga' />
						</Link>
						<div className='collapse navbar-collapse' id='navbarMain'>
							<ul className='navbar-nav mr-auto'>
								<li className='nav-item'>
									<NavLink to='/' className='nav-link'>
										Главная
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink to='/catalog' className='nav-link'>
										Каталог
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink to='/about' className='nav-link'>
										О магазине
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink to='/contacts' className='nav-link'>
										Контакты
									</NavLink>
								</li>
							</ul>
							<div className='flex'>
								<div className='header-controls-pics'>
									<div
										className='header-controls-pic header-controls-search'
										onClick={handleClick}
									></div>
									<div
										className='header-controls-pic header-controls-cart'
										onClick={handleClickCart}
									>
										<div
											className={
												items.length
													? 'header-controls-cart-full'
													: 'header-controls-cart-full invisible'
											}
										>
											{items.length}
										</div>
										<div className='header-controls-cart-menu'></div>
									</div>
								</div>

								<form
									data-id='search-form'
									className={
										searchClicked
											? 'header-controls-search-form form-inline'
											: 'header-controls-search-form form-inline invisible'
									}
									onSubmit={e => handleSubmit(e)}
								>
									<input
										className='form-control'
										placeholder='Поиск'
										value={input}
										onChange={handleChange}
									/>
								</form>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}
