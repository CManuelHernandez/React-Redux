export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) => state.adverts.data;

export const getAdvertsLoaded = (state) => state.adverts.loaded;

export const getAdvertDetail = (state, advertId) =>
  state.adverts.data.find(advert => advert.id === advertId);

export const getTagsLoaded = (state) => getTags(state).length > 0;

export const getTags = (state) => state.tags;

export const getUi = (state) => state.ui;
