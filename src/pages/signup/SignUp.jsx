import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../app/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
     const [userData, setUserData] = useState({
          username: "",
          fullName: "",
          email: "",
          password: "",
     });
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const handleChange = (e) => {
          setUserData({
               ...userData,
               [e.target.name]: e.target.value,
          });
     };

     const handleSignUp = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post(`/api/v1/users/register`, {
                    username: userData.username,
                    fullName: userData.fullName,
                    email: userData.email,
                    password: userData.password,
               });

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
               navigate("/");
          } catch (error) {
               console.log("Error Signing ::", error);
          }
     };

     return (
          <div className="mt-10">
               <form className="max-w-sm mx-auto" onSubmit={handleSignUp}>
                    <div className="mb-5">
                         <label
                              htmlFor="fullName"
                              className="block mb-2 text-sm font-medium text-gray-900"
                         >
                              Your FullName
                         </label>
                         <input
                              type="text"
                              name="fullName"
                              value={userData.fullName}
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder="Jhon Doe"
                              required
                         />
                    </div>
                    <div className="mb-5">
                         <label
                              htmlFor="username"
                              className="block mb-2 text-sm font-medium text-gray-900"
                         >
                              Your UserName
                         </label>
                         <input
                              type="text"
                              name="username"
                              value={userData.username}
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder="jhon_doe"
                              required
                         />
                    </div>
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
                    <div className="flex items-start mb-5">
                         <Link
                              to={"/login"}
                              className="text-sm text-gray-500 hover:text-gray-700"
                         >
                              Have an account?{" "}
                              <span className="text-blue-500">Sign In</span>
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

export default SignUpPage;
