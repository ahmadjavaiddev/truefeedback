import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCurrentUser } from "./app/features/user/userSlice";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const Layout = () => {
     const dispatch = useDispatch();

     useEffect(() => {
          (async () => {
               try {
                    const user = JSON.parse(localStorage.getItem("user"));

                    if (user) dispatch(setCurrentUser(user));
               } catch (error) {
                    console.log("Error in Layout:", error);
               }
          })();
     }, [dispatch]);

     return (
          <>
               <Toaster position="top-right" reverseOrder={true} />
               <Header />
               <Outlet />
          </>
     );
};

export default Layout;
