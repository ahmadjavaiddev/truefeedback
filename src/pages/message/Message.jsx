import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

// const API = "http://localhost:5000";
const API = "https://true-feedback-backend.vercel.app";

const MessagePage = () => {
     const { username } = useParams();
     const [message, setMessage] = useState("");
     const [suggestedMessages, setSuggestedMessages] = useState([
          {
               content: "What's your favorite movie?",
          },
          {
               content: "Do you have any pets?",
          },
          {
               content: "What's your dream job?",
          },
     ]);
     const user = useSelector((state) => state?.user?.user?.user);
     const [buttonDisabled, setButtonDisabled] = useState(true);
     const [processing, setProcessing] = useState(false);

     const handleSuggestMessages = async () => {
          try {
               const response = await axios.get(
                    `${API}/api/v1/messages/generate`
               );

               setSuggestedMessages(response.data.data);
          } catch (error) {
               console.log("Error Generating Messages");
          }
     };

     const handleAddReview = async (e) => {
          e.preventDefault();
          try {
               setProcessing(true);
               setButtonDisabled(true);
               const verifyStatus = await axios.get(
                    `${API}/api/v1/messages/userstatus/${username}`
               );
               if (verifyStatus.data.data === false) {
                    toast.error("User is not accepting messages!");
                    return;
               }

               const response = await axios.post(
                    `${API}/api/v1/messages/create`,
                    {
                         content: message,
                         username: username,
                    }
               );
               // console.log(response.data);
               setMessage("");
               setProcessing(false);
               setButtonDisabled(false);
               toast.success("Message Sent Successfully!");
          } catch (error) {
               // console.log("Error adding Message ::", error);
               setProcessing(false);
               setButtonDisabled(false);
               setProcessing(false);
               console.log("Error adding Message");
          }
     };

     useEffect(() => {
          if (message.length > 9) {
               setButtonDisabled(false);
          }
     }, [message]);

     return (
          <div className="md:w-[700px] w-full mx-auto px-4 mb-20">
               <div className="mt-20">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">
                         {processing ? "Processing..." : "Public Profile Link"}
                    </h1>
               </div>
               <div className="w-full mt-5">
                    <div>
                         <label
                              htmlFor="message"
                              className="block mb-2 text-md font-semibold text-gray-900"
                         >
                              Send Anonymous Message to @{username}
                         </label>
                         <textarea
                              id="message"
                              rows="4"
                              className="block p-2.5 w-full font-semibold text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Write your anonymous message here"
                              onChange={(e) => setMessage(e.target.value)}
                              value={message}
                         ></textarea>
                    </div>
                    <div className="flex justify-center mt-5">
                         {/* {buttonDisabled === true ? ( */}
                         <button
                              type="submit"
                              className={
                                   buttonDisabled
                                        ? "mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg"
                                        : "mt-4 px-4 py-2 text-sm font-medium text-white bg-[#0F172A] rounded-lg hover:bg-gray-700"
                              }
                              disabled={buttonDisabled}
                              onClick={handleAddReview}
                         >
                              Send It
                         </button>
                    </div>
               </div>

               <div className="mt-14">
                    <button
                         className="mt-4 px-4 py-2 text-sm font-medium text-white bg-[#0F172A] rounded-lg hover:bg-gray-700"
                         onClick={handleSuggestMessages}
                    >
                         Suggest Messages
                    </button>

                    <h3 className="mt-3">
                         Click on any message below to select it.
                    </h3>
                    <div className="mt-5">
                         <div className="border border-gray-300 rounded-lg p-2 flex flex-col gap-5 px-5 py-5">
                              <h2 className="text-lg font-medium text-gray-900">
                                   Suggested Messages
                              </h2>
                              <div className="flex flex-col gap-3">
                                   {suggestedMessages?.map((message) => (
                                        <div
                                             key={`${message}-${Date.now()}-${Math.random()}`}
                                             className="text-sm font-medium text-gray-900 text-center border border-gray-300 rounded-lg p-2 cursor-pointer"
                                             onClick={() =>
                                                  setMessage(message?.content)
                                             }
                                        >
                                             <h3 className="text-lg font-medium text-gray-900">
                                                  {message?.content}
                                             </h3>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>

               {!user && (
                    <div className="text-center mt-5">
                         <h3 className="mt-3 text-lg font-medium text-gray-900">
                              Get Your Message Board
                         </h3>
                         <br />
                         <Link
                              to={"/register"}
                              className="mt-4 px-4 py-2 text-md font-medium text-white bg-[#0F172A] rounded-lg hover:bg-gray-700"
                         >
                              Create Your Account
                         </Link>
                    </div>
               )}
          </div>
     );
};

export default MessagePage;
