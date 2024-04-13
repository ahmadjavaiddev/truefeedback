import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import {
     Route,
     RouterProvider,
     createBrowserRouter,
     createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUpPage from "./pages/signup/SignUp.jsx";
import MessagePage from "./pages/message/Message.jsx";
import ProfilePage from "./pages/profile/Profile.jsx";
import Protected from "./Protected.jsx";
import VerifyPage from "./pages/verify/Verify.jsx";
import VerifyUserPage from "./pages/verify/VerifySignUp.jsx";

const router = createBrowserRouter(
     createRoutesFromElements(
          <Route path="/" element={<Layout />}>
               <Route index element={<App />} />
               <Route path="login" element={<Login />} />
               <Route path="register" element={<SignUpPage />} />
               <Route path="u/:username" element={<MessagePage />} />
               <Route path="verify/:urlToken/:userEmail" element={<VerifyPage />} />
               <Route path="verifyUser/:userEmail" element={<VerifyUserPage />} />
               <Route element={<Protected />} path="/">
                    <Route path="dashboard" element={<ProfilePage />} />
               </Route>
          </Route>
     )
);

ReactDOM.createRoot(document.getElementById("root")).render(
     <Provider store={store}>
          <RouterProvider router={router} />
     </Provider>
);
