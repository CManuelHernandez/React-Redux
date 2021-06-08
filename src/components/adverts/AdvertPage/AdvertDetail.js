import React from 'react';
import T from 'prop-types';

import { ConfirmationButton } from '../../shared';
import placeholder from '../../../assets/images/placeholder.png';
import { advert } from '../propTypes';

function AdvertDetail({ name, sale, price, tags, photo, onDelete }) {
  return (
    <div>
      <p>{name}</p>
      <p>{sale ? 'Sell' : 'Buy'}</p>
      <p>{tags.join(', ')}</p>
      <p>{price}</p>
      <img
        src={photo || placeholder}
        alt={name}
        width="200"
        height="200"
        style={{ objectFit: 'contain' }}
      />
      <ConfirmationButton confirmation="Are you sure?" onConfirm={onDelete}>
        Delete
      </ConfirmationButton>
    </div>
  );
}

AdvertDetail.propTypes = {
  ...advert,
  photo: T.string,
  onDelete: T.func.isRequired,
};

AdvertDetail.defaultProps = {
  photo: null,
};

export default AdvertDetail;
