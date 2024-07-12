// src/ManageAcc.jsx

import React from "react";

const ManageAcc = () => {
    return (
        <div className="flex flex-col items-center bg-beige_main min-h-screen p-8">
            <h2 className="text-3xl font-semibold mb-8 text-center">
                MY ACCOUNT
            </h2>
            <div className="flex flex-col lg:flex-row items-center w-full max-w-4xl">
                <div className="flex flex-col items-center lg:items-start lg:mr-12 mb-8 lg:mb-0">
                    <div className="relative">
                        <img
                            className="w-48 h-48 rounded-full border-4 border-gray-300"
                            src="/userpp.png"
                            alt="Profile"
                        />
                        <button className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-2">
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
                        </button>
                    </div>
                </div>
                <div className="flex flex-col flex-grow">
                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-700 text-lg">
                                Username
                            </label>
                            <button className="text-blue-500 border border-blue-500 rounded px-2 py-1">
                                Edit
                            </button>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-md mt-2 text-lg">
                            johndoe
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-700 text-lg">
                                Email
                            </label>
                            <button className="text-blue-500 border border-blue-500 rounded px-2 py-1">
                                Edit
                            </button>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-md mt-2 text-lg">
                            johndoe@gmail.com
                        </div>
                    </div>
                    <div className="mt-6">
                        <button className="w-full bg-transparent border border-black text-black p-2 rounded-md text-lg">
                            Click here to Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAcc;
