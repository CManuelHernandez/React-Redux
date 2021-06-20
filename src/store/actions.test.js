import {authLoginRequest, advertsLoadedSuccess,loginAction} from './actions';
import {AUTH_LOGIN_REQUEST,
        AUTH_LOGIN_SUCCESS,
        AUTH_LOGIN_FAILURE,
        ADVERTS_LOADED_SUCCESS
        } from './types';

describe('authLoginRequest', () => {
    test('should return an AUTH_LOGIN_REQUEST action', () => {
        const result = authLoginRequest();
        expect(result).toEqual({ type: AUTH_LOGIN_REQUEST });
    });
});

describe('advertsLoadedSuccess', () => {
    test('should return a ADVERTS_LOADED_SUCCESS action', () => {
      const adverts = 'adverts';
      const expectedAction = { type: ADVERTS_LOADED_SUCCESS, payload: adverts };
      const result = advertsLoadedSuccess(adverts);
      expect(result).toEqual(expectedAction);
    });
});

// ASYNC TEST

describe('loginAction', () => {
    describe('when login api resolves', () => {
        const credentials = 'credentials';
        const action = loginAction(credentials);
        const dispatch = jest.fn();
        const getState = () => {};
        const history = {
        location: {},
        replace: jest.fn(),
        };
        const api = {
        auth: { login: jest.fn().mockResolvedValue() },
        };

        test('should dispatch an AUTH_LOGIN_REQUEST action', () => {
        action(dispatch, getState, { api, history });
        expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
        });

        test('should call api.auth.login', () => {
        action(dispatch, getState, { api, history });
        expect(api.auth.login).toHaveBeenCalledWith(credentials);
        });

        test('should dispatch an AUTH_LOGIN_SUCCESS action', async () => {
        await action(dispatch, getState, { api, history });
        expect(dispatch).toHaveBeenNthCalledWith(2, { type: AUTH_LOGIN_SUCCESS });
        });

        test('should redirect to /', async () => {
        await action(dispatch, getState, { api, history });
        expect(history.replace).toHaveBeenCalledWith({ pathname: '/' });
        });
    });
    describe('when login api throws', () => {
        const credentials = 'credentials';
        const action = loginAction(credentials);
        const dispatch = jest.fn();
        const getState = () => {};
        const error = 'Unauthorized';
        const api = {
        auth: { login: jest.fn() },
        };

        test('should dispatch an AUTH_LOGIN_FAILURE action', async () => {
        api.auth.login.mockRejectedValue(error);
        await action(dispatch, getState, { api });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: AUTH_LOGIN_FAILURE,
            payload: error,
            error: true,
        });
        });
    });
});
  
  
