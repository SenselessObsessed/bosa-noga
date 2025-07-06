import CatalogComponent from '../Layouts/CatalogComponent';
import PageLayout from '../Layouts/PageLayout';

export default function Catalog() {
	return (
		<PageLayout>
			<CatalogComponent searchInput />
		</PageLayout>
	);
}
