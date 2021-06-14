import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';

import { defaultFilters, filterAdverts } from './filters';
import { useDispatch, useSelector } from 'react-redux';
import { getAdverts, getUi } from '../../../store/selectors';
import { advertsLoadedAction } from '../../../store/actions';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = (filters) => storage.set('filters', filters);

function AdvertsPage() {
  
  const [filters, setFilters] = React.useState(getFilters);
  const dispatch = useDispatch();
	const adverts = useSelector(getAdverts);
  const { error } = useSelector(getUi);

  React.useEffect(() => {
    dispatch(advertsLoadedAction());
  }, []);

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  const filteredAdverts = filterAdverts(adverts, filters);

  return (
    <Layout>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
