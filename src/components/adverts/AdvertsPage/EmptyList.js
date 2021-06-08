import React from 'react';
import T from 'prop-types';

import { Link } from 'react-router-dom';

function EmptyList({ advertsCount }) {
  return (
    <div>
      <p>No adverts here!</p>
      {advertsCount > 0 ? (
        'Refine your search'
      ) : (
        <Link to="/adverts/new">Create the first advert</Link>
      )}
    </div>
  );
}

EmptyList.propTypes = {
  advertsCount: T.number.isRequired,
};

export default EmptyList;
