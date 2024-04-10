import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../app/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const Login = () => {
     const [userData, setUserData] = useState({
          email: "",
          password: "",
     });
     const user = useSelector((state) => state?.user?.user?.user);

     useEffect(() => {
          if (user) {
               navigate("/dashboard");
          }
     }, [user]);

     const dispatch = useDispatch();
     const navigate = useNavigate();

     const handleChange = (e) => {
          setUserData({
               ...userData,
               [e.target.name]: e.target.value,
          });
     };

     const handleLogin = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post(`/api/v1/users/login`, {
                    email: userData.email,
                    password: userData.password,
               });

               if (response.data.data) {
                    setUserData({
                         email: "",
                         password: "",
                    });
                    toast.success(response.data.message);
               }
               // const cookies = new Cookies(null, { path: "/" });

               // cookies.set("accessToken", response.data.data.accessToken);
               // cookies.set("refreshToken", response.data.data.refreshToken);

               // console.log("AccessToken Is ::", cookies.get("accessToken"));
               // console.log("RefreshToken Is ::", cookies.get("refreshToken"));

               dispatch(setCurrentUser(response.data.data));
               navigate("/dashboard");
          } catch (error) {
               console.log("Error logging in ::", error);
          }
     };

     return (
          <div className="mt-10">
               <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
                    <div className="mb-5">
                         <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900"
                         >
                              Your email
                         </label>
                         <input
                              type="email"
                              name="email"
                              value={userData.email}
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder="name@name.com"
                              required
                         />
                    </div>
                    <div className="mb-5">
                         <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900"
                         >
                              Your password
                         </label>
                         <input
                              type="password"
                              name="password"
                              value={userData.password}
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              autoComplete="true"
                              required
                         />
                    </div>
                    <div className="flex justify-between items-center mb-5">
                         <Link
                              to={"/forgot-password"}
                              className="text-sm text-gray-500 hover:text-gray-700"
                         >
                              Forgot Password
                         </Link>
                         <Link
                              to={"/register"}
                              className="ml-3 text-sm text-blue-500 hover:text-gray-700"
                         >
                              Create Account
                         </Link>
                    </div>
                    <button
                         type="submit"
                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                         Submit
                    </button>
               </form>
          </div>
     );
};

export default Login;
