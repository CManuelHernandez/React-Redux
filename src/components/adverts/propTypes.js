import T from 'prop-types';

export const advert = {
  name: T.string.isRequired,
  sale: T.bool.isRequired,
  price: T.number.isRequired,
  tags: T.arrayOf(T.string.isRequired).isRequired,
};
