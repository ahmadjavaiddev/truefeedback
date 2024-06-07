import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../app/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { checkEmailIsValid } from "../../helpers/utils";

// const API = "http://localhost:5000";
const API = "https://true-feedback-backend.vercel.app";

const Login = () => {
     const [userData, setUserData] = useState({
          emailOrUsername: "",
          password: "",
     });
     const [buttonDisabled, setButtonDisabled] = useState(true);
     const [processing, setProcessing] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");
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
               setProcessing(true);
               setButtonDisabled(true);

               if (userData.emailOrUsername.includes("@")) {
                    const verifyTheEmail = await checkEmailIsValid(
                         userData.emailOrUsername
                    );
                    if (!verifyTheEmail) {
                         setErrorMessage(
                              "Email is not valid. Please enter a valid email or username!"
                         );
                         setProcessing(false);
                         return;
                    }
               }
               const response = await axios.post(`${API}/api/v1/users/login`, {
                    emailOrUsername: userData.emailOrUsername,
                    password: userData.password,
               });

               if (response.data.statusCode === 401) {
                    setErrorMessage(response.data.message);
                    setProcessing(false);
                    setButtonDisabled(false);
                    return;
               }

               if (response.data.data) {
                    setUserData({
                         emailOrUsername: "",
                         password: "",
                    });
                    toast.success(response.data.message);
               }

               dispatch(setCurrentUser(response.data.data));
               console.log(
                    "response.data.data.accessToken ::",
                    response.data.data.accessToken
               );
               localStorage.setItem(
                    "accessToken",
                    response.data.data.accessToken
               );
               setProcessing(false);
               setButtonDisabled(false);
               navigate("/dashboard");
          } catch (error) {
               setErrorMessage(error.message);
               console.log("Something went wrong");
               setProcessing(false);
               setButtonDisabled(false);
          }
     };

     useEffect(() => {
          if (
               userData.emailOrUsername.length > 2 &&
               userData.password.length > 7
          ) {
               setButtonDisabled(false);
          } else {
               setButtonDisabled(true);
          }
     }, [userData.emailOrUsername, userData.password]);

     return (
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
               <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                         {errorMessage && (
                              <div className="text-red-500 text-md font-semibold border border-red-500 rounded-lg p-2 text-center">
                                   {errorMessage}
                              </div>
                         )}

                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                              {processing ? "Processing..." : "Sign In"}
                         </h1>
                         <form
                              className="space-y-4 md:space-y-6"
                              onSubmit={handleLogin}
                         >
                              <div>
                                   <label
                                        htmlFor="emailOrUsername"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                   >
                                        Email or Username
                                   </label>
                                   <input
                                        type="emailOrUsername"
                                        name="emailOrUsername"
                                        id="emailOrUsername"
                                        value={userData.emailOrUsername}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:ring-blue-500"
                                        placeholder="username or email"
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
                                   className={
                                        buttonDisabled
                                             ? "w-full text-white bg-gray-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                             : "w-full text-white bg-[#0F172A] hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                   }
                                   disabled={buttonDisabled}
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
