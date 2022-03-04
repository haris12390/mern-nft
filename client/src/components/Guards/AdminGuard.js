import { Redirect } from "react-router-dom";
import { Admin } from '../Constants/constants'
import useAuth from '../../hooks/useAuth'

const AdminPrivateRoute = async ({ children }) => {
    const { isAuthenticated, user } = await useAuth();


    if (!isAuthenticated) return <Redirect to="/login" />

    if (user?.role !== Admin) return <Redirect to="/" />
    // console.log(user , 'o')

    return (
        <>
            {children}
        </>
    )

}
export default AdminPrivateRoute;
