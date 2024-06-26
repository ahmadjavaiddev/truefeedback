import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
     const user = useSelector((state) => state?.user?.user?.user);

     return user ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
