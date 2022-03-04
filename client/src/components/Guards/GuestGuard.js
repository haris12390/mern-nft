import { Redirect} from "react-router-dom";
import useAuth  from '../../hooks/useAuth'

const PrivateRoute = ({ children }) => {
    const { isAuthenticated  } = useAuth();
    

    if (isAuthenticated) {
        return <Redirect to="/" />;
      }

    

    return (
        { children }
    );
};

export default PrivateRoute;
