import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCurrentUser } from "./app/features/user/userSlice";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const Layout = () => {
     const dispatch = useDispatch();
     // const user = useSelector((state) => state?.user?.user?.user);

     useEffect(() => {
          (async () => {
               try {
                    const user = JSON.parse(localStorage.getItem("user"));

                    if (user) dispatch(setCurrentUser(user));
               } catch (error) {
                    console.log("Something went wrong");
               }
          })();
     }, [dispatch]);

     return (
          <>
               <Toaster position="top-right" reverseOrder={true} />
               <Header />

               {/* {user && !user?.verified && (
                    <div className="text-red-500 text-md font-semibold border border-red-500 rounded-lg p-2 text-center">
                         Please Verify Your Email to continue!
                    </div>
               )} */}

               <Outlet />
          </>
     );
};

export default Layout;
