import { adverts, initialState } from './reducer';
import { ADVERTS_LOADED_SUCCESS, ADVERT_DETAIL_SUCCESS } from './types';

describe('adverts', () => {
	test('should manage ANY action', () => {
		const state = initialState.adverts;
		console.log(initialState);

		const action = { type: 'ANY' };
		const nextState = adverts(state, action);

		expect(nextState).toBe(state);
	});

	test('should manage ADVERTS_LOADED_SUCCESS action', () => {
		const state = initialState.adverts;
		const action = { type: ADVERTS_LOADED_SUCCESS, payload: [] };
		const expectedState = {
			...initialState.adverts,
			loaded: true,
			data: action.payload,
		};
		const nextState = adverts(state, action);
		expect(nextState).toStrictEqual(expectedState);
	});

	test('should manage ADVERT_DETAIL_SUCCESS action', () => {
		const state = initialState.adverts;
		const advert = {};
		const action = { type: ADVERT_DETAIL_SUCCESS, payload: advert };
		const expectedState = {
			...initialState.adverts,
			loaded: false,
			data: [...initialState.adverts.data, action.payload],
		};
		const nextState = adverts(state, action);
		expect(nextState).toStrictEqual(expectedState);
	});
});
