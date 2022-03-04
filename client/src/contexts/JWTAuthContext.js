import React, {
  createContext,
  useEffect,
  useReducer
} from 'react';
import jwtDecode from 'jwt-decode';
// import SplashScreen from 'src/components/SplashScreen';
import axios from '../utils/axios'

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    // axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    // delete axios.defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => { },
  register: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async ({ email, password }) => {
    const response = await axios.post(`${process.env.REACT_APP_PORT}/api/auth/login`, { email, password });
    const { accessToken, user } = response.data;
    setSession(accessToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const forgot = async (email) => {
    const response = await axios.post(`${process.env.REACT_APP_PORT}/api/auth/forgotpassword `, { email })
    console.log(response.data)
    return response
  }
  const reset = async ({ password, params }) => {
    // const response = await axios.post(`${process.env.REACT_APP_PORT}/auth/resetPassword.php`, { password, params })
    const response = await axios.put(`${process.env.REACT_APP_PORT}/api/auth/passwordreset/${params}`, { password })
    return response
  }
  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (firstName, lastName, email, password) => {

    const response = await axios.post(`${process.env.REACT_APP_PORT}/api/auth/register`, { firstName, lastName, email, password })

    return response

  };

  useEffect(() => {

    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        console.log('1111111111', accessToken)

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);


          const response = await axios.post(`${process.env.REACT_APP_PORT}/api/auth/verify`)
          let { user } = response.data;


          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: true,
              user
            }
          });

        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });

        }


      } catch (err) {
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });

      }
    };

    initialise();
  }, []);

  // if (!state.isInitialised) {
  //   return <SplashScreen />;
  // }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        forgot,
        logout,
        reset,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;