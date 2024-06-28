import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ResetPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-purple_main">
      <div className="flex flex-col md:flex-row rounded-3xl shadow-lg max-w-6xl p-5 md:p-0 bg-beige_main">
        <div className="flex flex-col justify-center items-center p-10 md:rounded-l-3xl bg-pink_main">
          <img src="/forgetpasswordicon.png" alt="Reset Password" />
        </div>

        <form className="w-full md:w-auto">
          {/* Container for form elements */}
          <div className="flex flex-col justify-center items-center w-full p-10 md:p-20 md:rounded-r-3xl">
            <h2 className="text-4xl font-overlock text-textcolor font-bold mb-1">
              RESET PASSWORD
            </h2>

            {/* Container for input and button */}
            <div className="w-full flex flex-col items-center space-y-4">
              <div className="w-full mb-0">
                <label
                  className="block text-3sm font-bold mb-1 font-overlock text-textcolor"
                  htmlFor="newpassword"
                >
                  New Password
                </label>
                <input
                  className="shadow border rounded w-96 py-2 px-3 text-textcolor leading-tight bg-blue_main focus:outline-none focus:shadow-outline"
                  id="newpassword"
                  type="password"
                />
              </div>

              <div className="w-full mb-0">
                <label
                  className="block text-3sm font-bold mb-1 font-overlock text-textcolor"
                  htmlFor="confirmpassword"
                >
                  Confirm Password
                </label>
                <input
                  className="shadow border rounded w-96 py-2 px-3 text-textcolor leading-tight bg-blue_main focus:outline-none focus:shadow-outline"
                  id="confirmpassword"
                  type="password"
                />
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  className="bg-orange_main hover:bg-orange-400 text-textcolor hover:text-green-900 py-2 px-4 rounded-3xl font-bold font-overlock"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
