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
          <header>
               <div className="bg-[#111827]">
                    <div className="text-white flex justify-between items-center py-4 w-[1250px] mx-auto">
                         <div>
                              <Link to={"/"} className="text-2xl font-bold">
                                   True Feedback
                              </Link>
                         </div>
                         <div>
                              {user && (
                                   <h3 className="text-xl">
                                        Welcome, {user?.fullName?.toUpperCase()}
                                   </h3>
                              )}
                         </div>
                         <div>
                              {!user ? (
                                   <Link
                                        className="px-3 py-1 mt-3 bg-white text-black text-lg font-semibold rounded-lg border border-gray-300"
                                        to={"/login"}
                                   >
                                        Login
                                   </Link>
                              ) : (
                                   <>
                                        <Link
                                             className="px-3 py-1 mt-3 mr-3 bg-white text-black text-lg font-semibold rounded-lg border border-gray-300"
                                             to={"/login"}
                                        >
                                             Dashboard
                                        </Link>
                                        <button
                                             onClick={handleUserLogout}
                                             className="px-3 py-1 mt-3 bg-white text-black text-lg font-semibold rounded-lg border border-gray-300"
                                        >
                                             Logout
                                        </button>
                                   </>
                              )}
                         </div>
                    </div>
               </div>
          </header>
     );
};

export default Header;
