import { Link } from 'react-router-dom';
import T from 'prop-types';

import { logout } from '../../../api/auth';
import { connect } from 'react-redux';
import { ConfirmationButton } from '../../shared';
import { getIsLogged } from '../../../store/selectors';
import { authLogout } from '../../../store/actions';

const AuthButton = ({ handleLogout, isLogged }) => {
	const handleLogoutConfirm = () => {
		logout().then(handleLogout());
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

const mapStateToProps = (state) => ({ isLogged: getIsLogged(state) });

const mapDispatchToProps = {
	handleLogout: authLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
