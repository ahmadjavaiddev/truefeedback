import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./app/features/user/userSlice";
import HomePage from "./pages/home/Home.jsx";

const App = () => {
     const dispatch = useDispatch();

     useEffect(() => {
          (async () => {
               dispatch(
                    setCurrentUser(JSON.parse(localStorage.getItem("user")))
               );
          })();
     }, []);

     return (
          <div className="my-10">
               <HomePage />
          </div>
     );
};

export default App;
