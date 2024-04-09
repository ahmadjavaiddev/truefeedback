import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
     const [messages, setMessages] = useState([]);
     const user = useSelector((state) => state?.user?.user?.user);
     const [loading, setloading] = useState(true);
     const [acceptMessages, setAcceptMessages] = useState(false);

     const handleCopyLink = async () => {
          try {
               await navigator.clipboard.writeText(
                    `${import.meta.env.VITE_WEBSITE_URL}/u/${user?.username}`
               );
               toast.success("Link Copied Successfully!");
          } catch (error) {
               console.log("Error While Copying Link ::", error);
          }
     };

     const handleDeleteMessage = async (messageId) => {
          try {
               const response = await axios.delete(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/messages/delete/${messageId}`
               );
               if (response.data.data) {
                    const newMessages = messages.filter(
                         (message) => message._id !== messageId
                    );
                    setMessages(newMessages);
               }
               toast.success("Message Deleted Successfully!");
          } catch (error) {
               console.log("Error deleting Message ::", error);
          }
     };

     const handleReloadMessages = async () => {
          try {
               const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/messages`);
               setMessages(response.data.data);
               setloading(false);
               toast.success("Messages Reloaded Successfully!");
          } catch (error) {
               console.log("Error While Fetching Messages ::", error);
          }
     };

     const handleAcceptMessages = async () => {
          try {
               const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/messages/accept`, {
                    value: !acceptMessages,
               });

               setAcceptMessages(response.data.data);
               toast.success("Messages Status Updated Successfully!");
          } catch (error) {
               console.log("Error While Updating Messages Status ::", error);
          }
     };

     useEffect(() => {
          (async () => {
               try {
                    console.log(
                         "URL ::",
                         `${import.meta.env.VITE_WEBSITE_URL}/u/${user?.username}`
                    );
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/messages`);
                    setMessages(response.data.data);

                    const responseAccept = await axios.get(
                         `${import.meta.env.VITE_SERVER_URL}/api/v1/messages/userstatus`
                    );

                    setAcceptMessages(responseAccept.data.data);
                    setloading(false);
               } catch (error) {
                    console.log("Error While Fetching Messages ::", error);
               }
          })();
     }, []);

     return (
          <>
               <div className="w-[1120px] mx-auto mt-20">
                    <div>
                         <h2 className="text-3xl text-black font-semibold">
                              User Dashboard
                         </h2>
                         <h2 className="text-xl text-black font-semibold mt-3">
                              Copy Your Unique Link
                         </h2>
                         <div className="flex">
                              <input
                                   className="w-full bg-[#FAFAFA] px-3 py-2 rounded-lg mt-2 text-black text-lg font-semibold"
                                   type="text"
                                   value={`${import.meta.env.VITE_WEBSITE_URL}/u/${user?.username}`}
                                   readOnly
                                   disabled
                              />

                              <button
                                   className="bg-[#0F172A] text-white px-3 font-bold rounded-lg"
                                   onClick={handleCopyLink}
                              >
                                   Copy
                              </button>
                         </div>
                    </div>

                    <div className="flex flex-col mt-3">
                         <div>
                              <label className="inline-flex items-center cursor-pointer">
                                   <input
                                        type="checkbox"
                                        value={acceptMessages}
                                        className="sr-only peer"
                                        onChange={() =>
                                             handleAcceptMessages(
                                                  !acceptMessages
                                             )
                                        }
                                        checked={acceptMessages}
                                   />
                                   <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>{" "}
                                   <span className="ms-3 text-lg font-semibold text-gray-900 ">
                                        Accept Messages:{" "}
                                        {acceptMessages ? "ON" : "OFF"}
                                   </span>
                              </label>
                         </div>

                         <button
                              className="px-3 py-1 mt-3 text-black text-lg font-semibold rounded-lg border border-gray-300"
                              onClick={handleReloadMessages}
                         >
                              Reload
                         </button>
                    </div>

                    {!loading ? (
                         <div className="grid grid-cols-2 mt-10 gap-5 w-full">
                              {messages?.map((message) => (
                                   <div
                                        key={message?._id}
                                        className="p-5 text-black text-xl font-semibold rounded-lg border border-gray-300 flex justify-between"
                                   >
                                        <p>{message?.content}</p>
                                        <button
                                             className="bg-red-500 text-white px-3 py-2 font-semibold rounded-lg"
                                             onClick={() =>
                                                  handleDeleteMessage(
                                                       message?._id
                                                  )
                                             }
                                        >
                                             Delete
                                        </button>
                                   </div>
                              ))}
                         </div>
                    ) : (
                         <div className="flex justify-center items-center mt-10">
                              <h3 className="text-lg font-semibold text-black">
                                   Loading...
                              </h3>
                         </div>
                    )}
               </div>
          </>
     );
};

export default ProfilePage;
