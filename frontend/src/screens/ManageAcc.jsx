import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { ref, get, update } from "firebase/database";
import egg from "../assets/egg.png";

const ManageAcc = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUsername(userData.username);
          setEmail(userData.email);
        } else {
          console.log("No data available");
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleUsernameChange = () => {
    setIsEditingUsername(true);
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user && newUsername) {
      const userRef = ref(db, `users/${user.uid}`);
      await update(userRef, { username: newUsername });
      setUsername(newUsername);
      setIsEditingUsername(false);
      setNewUsername("");
    }
  };

  return (
    <div className="flex flex-col items-center bg-beige_main min-h-screen p-8">
      <h2 className="text-3xl font-overlock text-textcolor font-bold mb-8 text-center">
        MY ACCOUNT
      </h2>
      <div className="flex flex-col lg:flex-row items-center w-full max-w-4xl">
        <div className="flex flex-col items-center lg:items-start lg:mr-12 mb-8 lg:mb-0">
          <div className="relative">
            <img
              className="w-48 h-48 rounded-full border-4 border-gray-300"
              src={egg}
              alt="Profile"
            />
            {/* <button className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v4m0 0v4m0-4h4m-4 0H8m8 8h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2m-4 4H8m0 0H4a2 2 0 01-2-2V8a2 2 0 012-2h4M8 16h4"
                                />
                            </svg>
                        </button> */}
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label className="text-gray-700 text-lg">Username</label>
              <button
                className="text-blue-500 border border-blue-500 rounded px-2 py-1"
                onClick={handleUsernameChange}
              >
                Edit
              </button>
            </div>
            {isEditingUsername ? (
              <form onSubmit={handleUsernameSubmit}>
                <input
                  className="bg-gray-100 p-2 rounded-md mt-2 text-lg"
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md mt-2"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="bg-gray-100 p-2 rounded-md mt-2 text-lg">
                {username}
              </div>
            )}
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <label className="text-gray-700 text-lg">Email</label>
            </div>
            <div className="bg-gray-100 p-2 rounded-md mt-2 text-lg">
              {email}
            </div>
          </div>
          <div className="mt-6">
            <Link
              to="/ForgotPassword"
              className="w-full bg-transparent border border-black text-black p-2 rounded-md text-lg"
            >
              Click here to Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAcc;