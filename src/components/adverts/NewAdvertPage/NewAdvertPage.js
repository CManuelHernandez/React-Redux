import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

import { advertCreatedAction } from '../../../store/actions';
import { getUi } from '../../../store/selectors';
import { useDispatch } from 'react-redux';

function NewAdvertPage({ error }) {
  const dispatch = useDispatch();

	const handleSubmit = async (newAdvert) => {
		await dispatch(advertCreatedAction(newAdvert));
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

NewAdvertPage.defaultProps = {
  loading: false,
  error: null,
};

const mapStateToProps = state => ({
  ...getUi(state),
});

const mapDispatchToProps = dispatch => ({
  onNewAdvert: newAdvert => dispatch(advertCreatedAction(newAdvert)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAdvertPage);
