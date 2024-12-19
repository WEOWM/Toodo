import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SignUp from "../auth/SignUp";
import Todo from "../Todo";
import SignIN from "../auth/SignIN";
import ProtectedRoute from "./ProtectedRoute";
import { toast } from "react-toastify";

const IndexRoutes = () => {
  const navigate = useNavigate();  // Using useNavigate to programmatically navigate

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:1000/auth/verify-token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Check for unauthorized or server error responses
        if (response.status === 401 || response.status === 400 || response.status === 500) {
          localStorage.removeItem("token");
         console.log("ddd",response);
         
        //  setTimeout(()=>{
        //   navigate("/signin", { replace: true });
        //  },5000)  // Navigate to signin page
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
         toast.error( error.message || "Login failed")
         console.log("error", error);
        //  setTimeout(()=>{
        //   navigate("/signin", { replace: true });
        //  },5000)
        
      }
    };

    verifyToken();
  }, [navigate]); // Adding navigate as a dependency to avoid warnings

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIN />} />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default IndexRoutes;
