import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyPage = () => {
     const [processing, setProcessing] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");
     const [buttonDisabled, setButtonDisabled] = useState(true);
     const [userData, setUserData] = useState({ userToken: "", userEmail: "" });
     const [disableForm, setDisableForm] = useState(false);
     const navigate = useNavigate();
     const { urlToken, userEmail } = useParams();

     const handleVerify = async (e) => {
          e.preventDefault();
          try {
               if (!userData.userToken) {
                    setErrorMessage("Please enter a valid token");
                    return;
               }

               if (userData.userToken.length < 5) {
                    setErrorMessage("Token is not valid!");
                    return;
               }
               setProcessing(true);
               setButtonDisabled(true);
               const response = await axios.post(
                    `https://true-feedback-backend.vercel.app/api/v1/users/verify`,
                    {
                         verificationCode: userData.userToken,
                         email: userData.userEmail,
                    }
               );

               if (response.data.data.success === true) {
                    setProcessing(false);
                    setButtonDisabled(false);
                    toast.success("Email Verified Successfully!");
                    navigate("/login");
               }
          } catch (error) {
               setProcessing(false);
               setButtonDisabled(false);
               // console.log("Error in handleVerify ::", error);
               console.log("Something went wrong");
               setErrorMessage("Error in verifying email!");
          }
     };

     useEffect(() => {
          (async () => {
               try {
                    const response = await axios.post(
                         `https://true-feedback-backend.vercel.app/api/v1/users/verify/validate`,
                         {
                              verificationCode: urlToken,
                              email: userEmail,
                         }
                    );

                    if (response.data.success === false) {
                         setErrorMessage("Token is not valid!");
                         setDisableForm(true);
                         return;
                    }

                    setUserData({
                         userToken: urlToken,
                         userEmail: userEmail,
                    });

                    if (userData.userToken.length > 5) {
                         setButtonDisabled(false);
                    } else {
                         setButtonDisabled(true);
                    }
               } catch (error) {
                    console.log("Something went wrong");
                    setErrorMessage("Error in verifying email!");
               }
          })();
     }, [userData.userToken, userData.userEmail]);

     return (
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
               <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                         {errorMessage && (
                              <div className="text-red-500 text-md font-semibold border border-red-500 rounded-lg p-2 text-center">
                                   {errorMessage}
                              </div>
                         )}
                         {disableForm ? null : (
                              <>
                                   <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        {processing
                                             ? "Processing..."
                                             : "Enter Your OTP Code"}
                                   </h1>
                                   <form
                                        className="space-y-4 md:space-y-6"
                                        onSubmit={handleVerify}
                                   >
                                        <div>
                                             <label
                                                  htmlFor="userToken"
                                                  className="block mb-2 text-sm font-medium text-gray-900"
                                             >
                                                  OTP Code
                                             </label>
                                             <input
                                                  type="text"
                                                  name="userToken"
                                                  id="userToken"
                                                  value={userData.userToken}
                                                  onChange={(e) =>
                                                       setUserData({
                                                            ...userData,
                                                            userToken:
                                                                 e.target.value,
                                                       })
                                                  }
                                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:ring-blue-500"
                                                  placeholder="OTP Code"
                                                  required
                                             />
                                        </div>
                                        {/* <div>
                              <label
                                   htmlFor="userEmail"
                                   className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                   email
                              </label>
                              <input
                                   type="text"
                                   name="userEmail"
                                   id="userEmail"
                                   value={userData.userEmail}
                                   onChange={(e) =>
                                        setUserData({
                                             ...userData,
                                             userEmail: e.target.value,
                                        })
                                   }
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:ring-blue-500"
                                   placeholder="OTP Code"
                                   required
                              />
                         </div> */}

                                        <button
                                             type="submit"
                                             className={
                                                  buttonDisabled
                                                       ? "w-full text-white bg-gray-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                       : "w-full text-white bg-[#0F172A] hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                             }
                                             disabled={buttonDisabled}
                                        >
                                             Verify
                                        </button>
                                   </form>
                              </>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default VerifyPage;
