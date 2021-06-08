import { Redirect, Route, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context';

const PrivateRoute = props => {
  const { isLogged } = useAuthContext();
  const location = useLocation();

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

export default PrivateRoute;
