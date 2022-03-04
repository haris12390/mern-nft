import './App.css';
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/JWTAuthContext';
import { LayoutProvider } from './contexts/LayoutContext';
import routes, { renderRoutes } from './routes';
import { createBrowserHistory } from 'history';

const App = () => {

  const history = createBrowserHistory({});


  return (
    <Router history={history} >
      <LayoutProvider>
        <AuthProvider>
          {renderRoutes(routes)}
          {/* <Loading/> */}
        </AuthProvider>
      </LayoutProvider>
    </Router>
  );

}

export default App;
