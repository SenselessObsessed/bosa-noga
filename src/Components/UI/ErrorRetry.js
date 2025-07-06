import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

export default function ErrorRetry({ retry }) {
	const dispatch = useDispatch();
	return (
		<div className='error-retry'>
			<div className='alert alert-danger text-center' role='alert'>
				Ошибка при загрузке!
			</div>

			<button
				type='button'
				className='btn btn-danger'
				onClick={() => dispatch(retry())}
			>
				Перезагрузить
			</button>
		</div>
	);
}

ErrorRetry.propTypes = {
	retry: PropTypes.func.isRequired,
};
