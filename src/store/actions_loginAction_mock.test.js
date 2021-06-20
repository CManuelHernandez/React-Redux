import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { loginAction } from './actions';
import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS } from './types';

const createStore = (extraArgument) => (state) => {
	const middleware = [thunk.withExtraArgument(extraArgument)];
	const mockStore = configureStore(middleware);
	const store = mockStore(state);
	return store;
};

describe('loginAction', () => {
	describe('when login api resolve', () => {
		const credentials = 'credentials';
		const history = {
			location: {},
			replace: jest.fn(),
		};

		const api = {
			auth: { login: jest.fn().mockResolvedValue() },
		};

		const store = createStore({ api, history })();

		test('should dispatch AUTH_LOGIN_SUCCESS action', async () => {
			await store.dispatch(loginAction(credentials));
			const actions = store.getActions();
			expect(actions).toEqual([
				{ type: AUTH_LOGIN_REQUEST },
				{ type: AUTH_LOGIN_SUCCESS },
			]);
			expect(api.auth.login).toBeCalledWith(credentials);
		});
	});
});
