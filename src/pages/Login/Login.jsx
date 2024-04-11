import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../app/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

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
               const response = await axios.post(
                    `https://truefeedback-backend.vercel.app/api/v1/users/login`,
                    {
                         email: userData.email,
                         password: userData.password,
                    }
               );

               if (response.data.data) {
                    setUserData({
                         email: "",
                         password: "",
                    });
                    toast.success(response.data.message);
               }

               dispatch(setCurrentUser(response.data.data));
               navigate("/dashboard");
          } catch (error) {
               console.log("Error logging in ::", error);
          }
     };

     return (
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
               <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                              Sign in to your account
                         </h1>
                         <form
                              className="space-y-4 md:space-y-6"
                              onSubmit={handleLogin}
                         >
                              <div>
                                   <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                   >
                                        Email
                                   </label>
                                   <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:ring-blue-500"
                                        placeholder="name@company.com"
                                        required
                                   />
                              </div>
                              <div>
                                   <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                   >
                                        Password
                                   </label>
                                   <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        value={userData.password}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                   />
                              </div>

                              <button
                                   type="submit"
                                   className="w-full text-white bg-[#0F172A] hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              >
                                   Sign in
                              </button>
                              <p className="text-sm font-light text-gray-500">
                                   Don’t have an account yet?{" "}
                                   <Link
                                        to="/register"
                                        className="font-medium text-primary-600 hover:underline"
                                   >
                                        Sign up
                                   </Link>
                              </p>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default Login;
