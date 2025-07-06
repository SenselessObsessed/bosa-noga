import Banner from './Banner';
import PropTypes from 'prop-types';

export default function PageLayout({ children }) {
	return (
		<main className='container'>
			<div className='row'>
				<div className='col'>
					<Banner />
					{children}
				</div>
			</div>
		</main>
	);
}

PageLayout.propTypes = {
	children: PropTypes.array.isRequired,
};
