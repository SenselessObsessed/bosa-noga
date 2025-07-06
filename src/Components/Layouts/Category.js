import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategory } from '../../Store/CategoriesSlice';
import PropTypes from 'prop-types';

export default function Category({ id, title }) {
	const { currCategory } = useSelector(state => state.categories);
	const dispatch = useDispatch();

	const handleClick = () => {
		if (id === currCategory) return;

		dispatch(selectCategory({ category: id }));
	};
	return (
		<li className='nav-item'>
			<Link
				className={id === currCategory ? 'nav-link active' : 'nav-link'}
				onClick={handleClick}
			>
				{title}
			</Link>
		</li>
	);
}

Category.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
};
