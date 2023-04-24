import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext } from "./context/UserContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

Axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<HomePage />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
