import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
     const [query, setQuery] = useState("");
     const [users, setUsers] = useState([]);

     const handleSearch = async () => {
          try {
               const response = await axios.post(
                    `https://truefeedback-backend.vercel.app/api/v1/users/search`,
                    {
                         value: query,
                    }
               );

               setUsers(response.data.data);
          } catch (error) {
               console.log("Error in handleSearch:", error);
          }
     };

     useEffect(() => {
          (async () => {
               try {
                    const response = await axios.get(
                         `https://truefeedback-backend.vercel.app/api/v1/users/random`
                    );
                    setUsers(response.data.data);
               } catch (error) {
                    console.log("Error in fetching random users ::", error);
               }
          })();
     }, []);

     return (
          <div className="md:w-[800px] sm:w-[600px] w-full mx-auto">
               <div className="text-center px-4 py-4">
                    <h1 className="text-3xl font-bold">TrueFeedback</h1>
                    <p className="mt-3">A platform for anonymous feedback</p>
               </div>

               <div className="flex justify-between items-center px-4 py-4">
                    <input
                         type="text"
                         id="search-users"
                         className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 font-semibold md:mb-0"
                         placeholder="Search Users"
                         onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                         type="submit"
                         className="px-4 py-2 bg-[#0F172A] text-white font-bold rounded hover:bg-gray-700 disabled:opacity-50 justify-center"
                         onClick={handleSearch}
                    >
                         Search
                    </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-10">
                    {users?.map((user) => (
                         <Link
                              to={`/u/${user?.username}`}
                              key={`${user?._id}-${Math.random()}`}
                              className="w-full border-2 border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-slate-100 transition-all duration-300"
                         >
                              <div className="flex justify-between items-center">
                                   <div className="flex items-center">
                                        <img
                                             src="https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                             alt="avatar"
                                             className="w-10 h-10 rounded-full"
                                        />
                                        <div className="ml-3">
                                             <h3 className="text-lg font-medium text-gray-900">
                                                  {user?.username}
                                             </h3>
                                             <p className="text-sm text-gray-500">
                                                  {user?.email}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </Link>
                    ))}
               </div>
          </div>
     );
};

export default Home;
