import React from 'react';
import T from 'prop-types';

const AuthContext = React.createContext();

export const useAuthContext = () => {
  const authValue = React.useContext(AuthContext);
  return authValue;
};

export const AuthProvider = ({ children, ...props }) => (
  <AuthContext.Provider value={props}>{children}</AuthContext.Provider>
);

export const AuthConsumer = AuthContext.Consumer;

AuthProvider.propTypes = {
  children: T.node,
};

AuthProvider.defaultProps = {
  children: null,
};

export default AuthContext;
