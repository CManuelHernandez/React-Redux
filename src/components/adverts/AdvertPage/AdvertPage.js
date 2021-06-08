import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';

function AdvertPage() {
  const { advertId } = useParams();
  const history = useHistory();
  const { isPending: isLoading, error, execute, data: advert } = usePromise(
    null
  );

  React.useEffect(() => {
    execute(getAdvert(advertId));
  }, [advertId]);

  const handleDelete = () => {
    execute(deleteAdvert(advertId)).then(() => history.push('/'));
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
