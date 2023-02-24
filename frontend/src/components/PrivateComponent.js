import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = ()=>{
    const auth = localStorage.getItem('cust')
    return auth ? <Outlet/> : <Navigate to='/'/>
}

export default PrivateComponent;