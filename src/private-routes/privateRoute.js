import {useGlobalContext} from '../contexts/AuthContext'
import {Outlet,Navigate} from 'react-router-dom'
import Home from '../components/home'
const PrivateRoute = ({children}) => {
    const{user}=useGlobalContext()
    console.log(children)
    return (
        
    <>
      {user?children:<Navigate to='/'/>}
    </>
    );
}
 
export default PrivateRoute;