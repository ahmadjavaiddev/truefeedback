import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../app/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
     const [userData, setUserData] = useState({
          username: "",
          email: "",
          password: "",
     });
     const [buttonDisabled, setButtonDisabled] = useState(true);
     const [processing, setProcessing] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");
     const [showPassword, setShowPassword] = useState(false);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const handleChange = (e) => {
          const { name, value } = e.target;

          const formattedUsername =
               name === "username"
                    ? value.trim().replace(/\W+/g, "-").replace(/-{2,}/g, "-")
                    : value;

          setUserData({
               ...userData,
               [name]: formattedUsername,
          });
     };

     const handleSignUp = async (e) => {
          e.preventDefault();
          try {
               setProcessing(true);
               setButtonDisabled(true);
               const response = await axios.post(
                    `http://localhost:5000/api/v1/users/register`,
                    {
                         username: userData.username,
                         fullName: userData.fullName,
                         email: userData.email,
                         password: userData.password,
                    }
               );

               if (response.data.data) {
                    setUserData({
                         username: "",
                         fullName: "",
                         email: "",
                         password: "",
                    });
                    toast.success(response.data.message);
               }

               dispatch(setCurrentUser(response.data.data));
               setProcessing(false);
               setButtonDisabled(false);
               navigate("/");
          } catch (error) {
               console.log("Error Signing ::", error);
          }
     };

     useEffect(() => {
          if (
               userData.username.length > 2 &&
               userData.email.length > 7 &&
               userData.password.length > 7
          ) {
               setButtonDisabled(false);
          } else {
               setButtonDisabled(true);
          }
     }, [userData.username, userData.email, userData.password]);

     return (
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
               <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                              {processing ? "Processing..." : "Sign Up"}
                         </h1>
                         <form
                              className="space-y-4 md:space-y-6"
                              onSubmit={handleSignUp}
                         >
                              <div>
                                   <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                   >
                                        Username
                                   </label>
                                   <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={userData.username}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:ring-blue-500"
                                        placeholder="name@company.com"
                                        required
                                   />
                              </div>
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
                                        type={
                                             showPassword ? "text" : "password"
                                        }
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
                                   className={
                                        buttonDisabled
                                             ? "w-full text-white bg-gray-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                             : "w-full text-white bg-[#0F172A] hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                   }
                                   disabled={buttonDisabled}
                              >
                                   Sign Up
                              </button>
                              <p className="text-sm font-light text-gray-500">
                                   Already have an account?{" "}
                                   <Link
                                        to="/login"
                                        className="font-medium text-primary-600 hover:underline"
                                   >
                                        Sign In
                                   </Link>
                              </p>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default SignUpPage;
