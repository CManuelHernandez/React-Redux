import AdvertDetail from '../components/adverts/AdvertPage/AdvertDetail';
import { getAdvertDetail, getAdvertsLoaded, getTagsLoaded } from './selectors';
import {
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_FAILURE,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGOUT,
	ADVERTS_LOADED_REQUEST,
	ADVERTS_LOADED_SUCCESS,
	ADVERTS_LOADED_FAILURE,
	UI_RESET_ERROR,
	ADVERT_CREATED_SUCCESS,
	ADVERT_CREATED_REQUEST,
	ADVERT_CREATED_FAILURE,
	ADVERT_DELETED_REQUEST,
	ADVERT_DELETED_SUCCESS,
	ADVERT_DELETED_FAILURE,
	TAGS_LOADED_REQUEST,
	TAGS_LOADED_SUCCESS,
	TAGS_LOADED_FAILURE,
	ADVERT_DETAIL_SUCCESS,
	ADVERT_DETAIL_REQUEST,
	ADVERT_DETAIL_FAILURE,
} from './types';


const createRequestAction = type => () => ({
	type,
  });
  
  const createSuccessAction = type => payload => ({
	type,
	payload,
  });
  
  const createFailureAction = type => payload => ({
	type,
	payload,
	error: true,
  });

export const authLoginRequest = createRequestAction(AUTH_LOGIN_REQUEST);
export const authLoginSuccess = createSuccessAction(AUTH_LOGIN_SUCCESS);
export const authLoginFailure = createFailureAction(AUTH_LOGIN_FAILURE);

export const loginAction = (credentials) => {
	return async function (dispatch, _getState, { api, history }) {
		dispatch(authLoginRequest());
		try {
			await api.auth.login(credentials);
			dispatch(authLoginSuccess());
			const { from } = history.location.state || { from: { pathname: '/' } };
			history.replace(from);
		} catch (error) {
			dispatch(authLoginFailure(error));
		}
	};
};

export const authLogout = () => {
	return {
		type: AUTH_LOGOUT,
	};
};

export const advertsLoadedRequest = createRequestAction(ADVERTS_LOADED_REQUEST);
export const advertsLoadedSuccess = createSuccessAction(ADVERTS_LOADED_SUCCESS);
export const advertsLoadedFailure = createFailureAction(ADVERTS_LOADED_FAILURE);

export const advertsLoadedAction = () => {
	return async function (dispatch, getState, { api }) {
		const advertsLoaded = getAdvertsLoaded(getState());
		if (advertsLoaded) {
			return;
		}
		dispatch(advertsLoadedRequest());
		try {
			const adverts = await api.adverts.getAllAdverts();
			dispatch(advertsLoadedSuccess(adverts));
		} catch (error) {
			dispatch(advertsLoadedFailure(error));
		}
	};
};

export const tagsLoadedRequest = createRequestAction(TAGS_LOADED_REQUEST);
export const tagsLoadedSuccess = createSuccessAction(TAGS_LOADED_SUCCESS);
export const tagsLoadedFailure = createFailureAction(TAGS_LOADED_FAILURE);


export const tagsLoadedAction = () => {
	return async function (dispatch, getState, { api }) {
		const tagsLoaded = getTagsLoaded(getState());
		if (tagsLoaded) {
			return;
		}
		dispatch(tagsLoadedRequest());
		try {
			const tags = await api.adverts.getAllTags();
			dispatch(tagsLoadedSuccess(tags));
		} catch (error) {
			dispatch(advertsLoadedFailure(error));
		}
	};
};

export const advertCreatedRequest = createRequestAction(ADVERT_CREATED_REQUEST);
export const advertCreatedSuccess = createSuccessAction(ADVERT_CREATED_SUCCESS);
export const advertCreatedFailure = createFailureAction(ADVERT_CREATED_FAILURE);


export const advertCreatedAction = (advert) => {
	return async function (dispatch, getState, { api, history }) {

		dispatch(advertCreatedRequest());
		try {
			const createdAdvert = await api.adverts.createdAdvert(advert);
			dispatch(advertCreatedSuccess(createdAdvert));
			history.push(`/adverts/${createdAdvert.id}`);
		} catch (error) {
			dispatch(advertCreatedFailure(error));
			if (error?.statusCode === 401) {
				history.push('/login');
			}
		}
	};
};

export const advertDetailRequest = createRequestAction(ADVERT_DETAIL_REQUEST);
export const advertDetailSuccess = createSuccessAction(ADVERT_DETAIL_SUCCESS);
export const advertDetailFailure = createFailureAction(ADVERT_DETAIL_FAILURE);


export const advertDetailAction = (advertId) => {
	return async function (dispatch, getState, { api, history }) {
		const advertLoaded = getAdvertDetail(getState(), advertId);
		if (advertLoaded) {
			return;
		}
		dispatch(advertDetailRequest());
		try {
			const advert = await api.adverts.getAdvert(advertId);
			dispatch(advertDetailSuccess(advert));
			return advert;
		} catch (error) {
			dispatch(advertDetailFailure(error));
		}
	};
};

export const advertDeletedRequest = createRequestAction(ADVERT_DELETED_REQUEST);
export const advertDeletedSuccess = createSuccessAction(ADVERT_DELETED_SUCCESS);
export const advertDeletedFailure = createFailureAction(ADVERT_DELETED_FAILURE);


export const advertDeletedAction = (advertId) => {
	return async function (dispatch, getState, { api, history }) {
		dispatch(advertDeletedRequest());
		try {
			const advert = await api.adverts.deleteAdvert(advertId);
			dispatch(advertDeletedSuccess(advert));
			history.push('/');
		} catch (error) {
			dispatch(advertDeletedFailure(error));
		}
	};
};

export const resetError = () => {
	return {
		type: UI_RESET_ERROR,
	};
};
