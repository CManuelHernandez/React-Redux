import { Link } from 'react-router-dom';
import T from 'prop-types';

import { ConfirmationButton } from '../../shared';
import { AuthConsumer } from '../context';
import { logout } from '../../../api/auth';

const AuthButton = ({ handleLogout, isLogged }) => {
  const handleLogoutConfirm = async () => {
    await logout();
    handleLogout();
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

AuthButton.propTypes = {
  handleLogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};

const ConnectedAuthButton = props => (
  <AuthConsumer>{auth => <AuthButton {...auth} {...props} />}</AuthConsumer>
);

export default ConnectedAuthButton;
