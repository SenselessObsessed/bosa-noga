import { useSelector, useDispatch } from 'react-redux';
import Hits from '../Layouts/Hits';
import PageLayout from '../Layouts/PageLayout';
import CatalogComponent from '../Layouts/CatalogComponent';
import { useEffect } from 'react';
import { changeSearch } from '../../Store/CardsSlice';

export default function Home() {
	const { nothing } = useSelector(state => state.hits);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeSearch({ search: '' }));
	}, [dispatch]);

	return (
		<PageLayout>
			{!nothing && <Hits />}
			<CatalogComponent />
		</PageLayout>
	);
}
