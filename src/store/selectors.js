export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) =>
	state.adverts.data.sort((advert1, advert2) => {
		if (advert1.updatedAt < advert2.updatedAt) return 1;
		return -1;
	});

export const getAdvertsLoaded = (state) => state.adverts.loaded;

export const getAdvertDetail = (state, advertId) =>
  state.adverts.data.find(advert => advert.id === advertId);

export const getTagsLoaded = (state) => getTags(state).length > 0;

export const getTags = (state) => state.tags;

export const getUi = (state) => state.ui;
