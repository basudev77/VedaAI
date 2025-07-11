import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Chat() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/getMe", {
          withCredentials: true, // needed to send cookies!
        });

        setUser(response.data);
      } catch (error) {
        console.log("Not logged in, logging out & redirecting...", error.message);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-[90%] flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-[90%] flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Chat, {user.username}!</h2>
        <p>Email: {user.email}</p>
        <p>User ID: {user._id}</p>
      </div>
    </div>
  );
}

export default Chat;
