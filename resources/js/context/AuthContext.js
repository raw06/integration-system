import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken, setToken } from '../utils/auth';
import AuthApi from '../apis/AuthApi';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const authenticated = useMemo(() => !!currentUser, [currentUser]);
  const navigate = useNavigate();

  const initAuth = async () => {
    return getToken() ? await AuthApi.getUser() : await Promise.resolve(null);
  };
  useEffect(() => {
    if (!authenticated) {
      initAuth()
        .then((response) => {
          if (!response.user) {
            removeToken();
          } else {
            setCurrentUser(response.user);
          }
          setInitializing(false);
        })
        .catch(() => {
          setInitializing(false);
          removeToken();
        });
    }
  }, [authenticated, navigate]);
  return (
    <AuthContext.Provider
      value={{
        initializing,
        authenticated,
        currentUser,
        setToken,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
export { useAuth };
