import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Components/Layouts/Header';
import Page404 from '../Components/Pages/Page404';
import Footer from '../Components/Layouts/Footer';
import About from '../Components/Pages/About';
import Contacts from '../Components/Pages/Contacts';
import Home from '../Components/Pages/Home';
import Catalog from '../Components/Pages/Catalog';
import CatalogItem from '../Components/Pages/CatalogItem';
import Cart from '../Components/Pages/Cart';

function App() {
	return (
		<Router basename='/bosa-noga'>
			<Header />
			<Routes>
				<Route path='/' Component={Home} />
				<Route path='/cart' Component={Cart} />
				<Route path='/catalog/:id' Component={CatalogItem} />
				<Route path='/catalog' Component={Catalog} />
				<Route path='/contacts' Component={Contacts} />
				<Route path='/about' Component={About} />
				<Route path='*' Component={Page404} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
