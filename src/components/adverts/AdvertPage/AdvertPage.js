import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getAdvertDetail, getUi } from '../../../store/selectors';
import { advertDeletedAction, advertDetailAction } from '../../../store/actions';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';

function AdvertPage() {
  const dispatch = useDispatch();
  const { advertId } = useParams();
  const advert = useSelector((state) => getAdvertDetail(state, advertId));
	const { error } = useSelector(getUi);

	React.useEffect(() => {
		dispatch(advertDetailAction(advertId));
	}, []);

  const handleDelete = () => {
    dispatch(advertDeletedAction(advertId));
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage;
