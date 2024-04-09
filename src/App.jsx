import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./app/features/user/userSlice";
import HomePage from "./pages/home/Home.jsx";

const App = () => {
     const dispatch = useDispatch();

     useEffect(() => {
          (async () => {
               // const products = await axios.get("/api/v1/products");

               // dispatch(setProducts(products.data.data));
               dispatch(
                    setCurrentUser(JSON.parse(localStorage.getItem("user")))
               );
          })();
     }, []);

     return (
          <div className="w-[1300px] mx-auto my-10">
               <HomePage />
          </div>
     );
};

export default App;
