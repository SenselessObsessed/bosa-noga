import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Card({ id, title, price, images, hit }) {
	const formattedTitle = title?.split(' ');
	return (
		<div className='col-4'>
			<div className={hit ? 'card' : 'card catalog-item-card'}>
				<img
					className='card-img-top img-fluid'
					src={images && images[0]}
					alt={title}
				/>
				<div className='card-body'>
					<p className='card-text'>
						{hit ? `${formattedTitle[0]} ${formattedTitle[1]}` : title}
					</p>
					<p className='card-text'>{`${price} руб.`}</p>
					<Link to={`/catalog/${id}`} className='btn btn-outline-primary'>
						Заказать
					</Link>
				</div>
			</div>
		</div>
	);
}

Card.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	images: PropTypes.array.isRequired,
	hit: PropTypes.bool,
};
