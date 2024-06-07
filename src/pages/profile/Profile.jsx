import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { retriveToken } from "../../helpers/tokenHandler";
import { getOriginalDate } from "../../helpers/getOriginalDate";

// const API = "http://localhost:5000";
const API = "https://true-feedback-backend.vercel.app"

const ProfilePage = () => {
     const [messages, setMessages] = useState([]);
     const user = useSelector((state) => state?.user?.user?.user);
     const [loading, setloading] = useState(true);
     const [acceptMessages, setAcceptMessages] = useState(false);
     const [showPopUp, setShowPopUp] = useState(false);
     const [messageId, setMessageId] = useState("");
     const userToken = retriveToken();

     const handleCopyLink = async () => {
          try {
               await navigator.clipboard.writeText(
                    `${import.meta.env.VITE_WEBSITE_URL}/u/${user?.username}`
               );
               toast.success("Link Copied Successfully!");
          } catch (error) {
               console.log("Error While Copying Link");
               // console.log("Error While Copying Link ::", error);
          }
     };

     const handleReloadMessages = async () => {
          try {
               const response = await axios.get(`${API}/api/v1/messages/getmessages`, {
                    headers: {
                         Authorization: `Bearer ${userToken}`,
                    },
               });
               setMessages(response.data.data);
               setloading(false);
               toast.success("Messages Reloaded Successfully!");
          } catch (error) {
               console.log("Error While Fetching Messages");
               // console.log("Error While Fetching Messages ::", error);
          }
     };

     const handleDeleteMessage = async (messageId) => {
          try {
               const response = await axios.delete(
                    `${API}/api/v1/messages/delete/${messageId}`,
                    {
                         headers: {
                              Authorization: `Bearer ${userToken}`,
                         },
                    }
               );
               if (response.data.data) {
                    const newMessages = messages.filter(
                         (message) => message._id !== messageId
                    );
                    setMessages(newMessages);
               }
               setShowPopUp(false);
               setMessageId("");
               handleReloadMessages()
               toast.success("Message Deleted Successfully!");
          } catch (error) {
               console.log("Error deleting Message");
               setShowPopUp(false);
               setMessageId("");
               // console.log("Error deleting Message ::", error);
          }
     };

     const handleAcceptMessages = async () => {
          try {
               const response = await axios.get(
                    `${API}api/v1/messages/accept`,
                    {
                         headers: {
                              Authorization: `Bearer ${userToken}`,
                         },
                    }
               );

               setAcceptMessages(response.data.data);
               toast.success("Messages Status Updated Successfully!");
          } catch (error) {
               // console.log("Error While Updating Messages Status ::", error);
               console.log("Error While Updating Messages Status");
          }
     };

     const handleProcessMessage = async (messageIdToProcess) => {
          setShowPopUp(true);
          setMessageId(messageIdToProcess);
     };

     useEffect(() => {
          (async () => {
               try {
                    const response = await axios.get(`${API}/api/v1/messages`, {
                         headers: {
                              Authorization: `Bearer ${userToken}`,
                         },
                    });
                    setMessages(response.data.data);

                    const responseAccept = await axios.get(
                         `${API}/api/v1/messages/userstatus`,
                         {
                              headers: {
                                   Authorization: `Bearer ${userToken}`,
                              },
                         }
                    );

                    setAcceptMessages(responseAccept.data.data);
                    setloading(false);
               } catch (error) {
                    // console.log("Error While Fetching Messages ::", error);
                    console.log("Error While Fetching Messages");
               }
          })();
     }, []);

     return (
          <>
               <div className="sm:w-[700px] md:w-[800px] lg:w-[900px] xl:w-[1000px] w-full mx-auto px-4 mt-20">
                    <div>
                         <h2 className="text-2xl lg:text-3xl text-black font-semibold">
                              User Dashboard
                         </h2>
                         <h2 className="text-md lg:text-lg text-black font-semibold mt-3">
                              Copy Your Unique Link
                         </h2>
                         <div className="flex mt-2">
                              <input
                                   className="w-full bg-[#FAFAFA] px-3 py-2 rounded-lg text-black text-lg font-semibold"
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
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-5">
                              {messages?.map((message) => (
                                   <div
                                        key={message?._id}
                                        className="flex justify-between items-start px-3 py-4 text-black text-lg font-semibold rounded-lg border border-gray-300"
                                   >
                                        <div>
                                             <p>{message?.content}</p>
                                             <p className="text-sm text-black italic tracking-wider mt-3">
                                                  {getOriginalDate(
                                                       message?.createdAt
                                                  )}
                                             </p>
                                        </div>
                                        <button
                                             className="text-white text-sm px-1 py-1 lg:py-1 font-semibold rounded-lg border border-gray-400"
                                             onClick={() =>
                                                  handleProcessMessage(
                                                       message?._id
                                                  )
                                             }
                                        >
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  x="0px"
                                                  y="0px"
                                                  width="30"
                                                  height="30"
                                                  viewBox="0 0 48 48"
                                             >
                                                  <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 16.140625 6 C 14.303372 6 12.582924 6.9194511 11.564453 8.4492188 L 9.1972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 9.7636719 15 A 1.50015 1.50015 0 0 0 10.208984 15 L 36.330078 15 L 34.757812 29.679688 A 1.50015 1.50015 0 1 0 37.740234 29.998047 L 39.347656 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 38.802734 12 L 36.435547 8.4492188 C 35.416254 6.9202798 33.696001 6 31.859375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 16.140625 9 L 31.859375 9 C 32.696749 9 33.474746 9.4162203 33.939453 10.113281 L 35.197266 12 L 12.802734 12 L 14.060547 10.113281 A 1.50015 1.50015 0 0 0 14.0625 10.111328 C 14.525982 9.4151428 15.301878 9 16.140625 9 z M 10.572266 17.650391 A 1.50015 1.50015 0 0 0 9.1171875 19.330078 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 37.246094 34.605469 A 1.50015 1.50015 0 1 0 34.263672 34.287109 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 12.099609 19.011719 A 1.50015 1.50015 0 0 0 10.572266 17.650391 z"></path>
                                             </svg>
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
               {showPopUp ? (
                    <>
                         <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                              <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                                   <div className="border-0 rounded-lg shadow-lg relative flex flex-col justify-center w-full bg-gray-800 text-white outline-none focus:outline-none h-[200px]">
                                        <div className="flex items-start justify-between p-5">
                                             <h3 className="text-xl font-semibold">
                                                  Do You Really Want To Delete
                                                  This Message?
                                             </h3>
                                        </div>
                                        <div className="flex items-center justify-end p-6">
                                             <button
                                                  className="bg-white text-black font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={() =>
                                                       setShowPopUp(false)
                                                  }
                                             >
                                                  Close
                                             </button>
                                             <button
                                                  className="bg-red-900 text-white ml-2 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={() =>
                                                       handleDeleteMessage(
                                                            messageId
                                                       )
                                                  }
                                             >
                                                  Confirm
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
               ) : null}
          </>
     );
};

export default ProfilePage;
