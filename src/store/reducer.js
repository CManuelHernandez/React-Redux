import { combineReducers } from 'redux';

import {
	ADVERTS_LOADED_REQUEST,
	ADVERTS_LOADED_SUCCESS,
	ADVERT_CREATED_SUCCESS,
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	TAGS_LOADED_REQUEST,
	TAGS_LOADED_SUCCESS,
	ADVERT_DETAIL_REQUEST,
	ADVERT_DETAIL_SUCCESS,
	UI_RESET_ERROR,
	ADVERT_CREATED_REQUEST,
	ADVERT_DELETED_SUCCESS,
	ADVERT_DELETED_REQUEST,
} from './types';

const initialState = {
	auth: false,
	adverts: {
		loaded: false,
		data: [],
	},
	tags: [],
	ui: {
		loading: false,
		error: null,
	},
};

export function auth(state = initialState.auth, action) {
	switch (action.type) {
		case AUTH_LOGIN_SUCCESS:
			return true;
		case AUTH_LOGOUT:
			return false;
		default:
			return state;
	}
}

export function adverts(state = initialState.adverts, action) {
	switch (action.type) {
		case ADVERTS_LOADED_SUCCESS:
			return { ...state, loaded: true, data: action.payload };
		case ADVERT_CREATED_SUCCESS:
		case ADVERT_DETAIL_SUCCESS:
		case ADVERT_DELETED_SUCCESS:
			return {
				...state,
				loaded: false,
				data: [...state.data, action.payload],
			};
		default:
			return state;
	}
}

export function tags(state = initialState.tags, action) {
	switch (action.type) {
		case TAGS_LOADED_SUCCESS:
			return state.concat(action.payload);
		default:
			return state;
	}
}

export function ui(state = initialState.ui, action) {
	if (action.error) {
		return { ...state, loading: false, error: action.payload };
	}
	switch (action.type) {
		case AUTH_LOGIN_REQUEST:
		case ADVERTS_LOADED_REQUEST:
		case ADVERT_DETAIL_REQUEST:
		case TAGS_LOADED_REQUEST:
		case ADVERT_CREATED_REQUEST:
		case ADVERT_DELETED_REQUEST:
			return { ...state, loading: true, error: null };
		case AUTH_LOGIN_SUCCESS:
		case ADVERTS_LOADED_SUCCESS:
		case TAGS_LOADED_SUCCESS:
		case ADVERT_DETAIL_SUCCESS:
		case ADVERT_CREATED_SUCCESS:
		case ADVERT_DELETED_SUCCESS:
			return { ...state, loading: false };
		case UI_RESET_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
}

// function reducer(state = initialState, action) {
// 	return {
// 		auth: auth(state.auth, action),
// 		adverts: adverts(state.adverts, action),
// 	};
// }

const reducer = combineReducers({
	auth,
	adverts,
	tags,
	ui,
});

export default reducer;
