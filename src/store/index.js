import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMW from 'redux-thunk';
import reducer from './reducer';

import * as auth from '../api/auth';
import * as adverts from '../api/adverts';

const api = { auth, adverts };

const configureStore = ({ preloadedState, history }) => {
	const middleware = [thunkMW.withExtraArgument({ api, history })];
	const store = createStore(
		reducer,
		preloadedState,
		composeWithDevTools(applyMiddleware(...middleware))
	);
	return store;
};

export default configureStore;
