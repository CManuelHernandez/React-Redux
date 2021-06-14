import { Redirect, Route, useLocation } from 'react-router-dom';
import { getIsLogged } from '../../../store/selectors';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const location = useLocation();
  const isLogged = useSelector((state) => getIsLogged(state));

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

export default PrivateRoute;
