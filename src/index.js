import ReactDOM from 'react-dom/client';
import './App/Styles/style.css';
import App from './App/App';
import { Provider } from 'react-redux';
import store from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
