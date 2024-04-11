import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Header = () => {
     const user = useSelector((state) => state?.user?.user?.user);

     const dispatch = useDispatch();
     const navigate = useNavigate();

     const handleUserLogout = async () => {
          try {
               dispatch(logOutUser());
               navigate("/login");
               toast.success("User Logged Out Successfully!");
          } catch (error) {
               console.log("Error while logout the user ::", error);
          }
     };

     return (
          <header className="bg-[#111827]">
               <div className=" lg:w-[1000px] mx-auto flex justify-between items-center py-4 px-4 md:px-8">
                    <div>
                         <Link
                              to={"/"}
                              className="text-lg md:text-2xl font-bold text-white"
                         >
                              True Feedback
                         </Link>
                    </div>
                    <div>
                         {user && (
                              <h3 className="hidden md:block text-xl text-white">
                                   Welcome, {user?.fullName?.toUpperCase()}
                              </h3>
                         )}
                    </div>
                    <div>
                         {user ? (
                              <>
                                   <Link
                                        to={"/login"}
                                        className="px-2 py-1 md:px-3 md:py-1 ml-3 bg-white text-black md:text-lg font-semibold rounded-lg border border-gray-300"
                                   >
                                        Dashboard
                                   </Link>
                                   <button
                                        onClick={handleUserLogout}
                                        className="px-2 py-1 md:px-3 md:py-1 ml-3 bg-white text-black md:text-lg font-semibold rounded-lg border border-gray-300"
                                   >
                                        Logout
                                   </button>
                              </>
                         ) : (
                              <Link
                                   to={"/login"}
                                   className="px-2 py-1 md:px-3 md:py-1 ml-3 bg-white text-black md:text-lg font-semibold rounded-lg border border-gray-300"
                              >
                                   Sign In
                              </Link>
                         )}
                    </div>
               </div>
          </header>
     );
};

export default Header;
