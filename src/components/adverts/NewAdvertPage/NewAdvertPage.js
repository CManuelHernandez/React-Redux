import React from 'react';
import T from 'prop-types';
import { Redirect } from 'react-router-dom';

import { createAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

function NewAdvertPage({ history }) {
  const { isPending: isLoading, error, execute } = usePromise(null);

  const handleSubmit = newAdvert => {
    execute(createAdvert(newAdvert)).then(({ id }) =>
      history.push(`/adverts/${id}`)
    );
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <NewAdvertForm onSubmit={handleSubmit} />
    </Layout>
  );
}

NewAdvertPage.propTypes = {
  history: T.shape({
    push: T.func.isRequired,
  }).isRequired,
};

export default NewAdvertPage;
