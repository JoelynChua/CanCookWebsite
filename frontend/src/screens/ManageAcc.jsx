// src/ManageAcc.jsx

import React from "react";

const ManageAcc = () => {
    return (
        <div className="flex flex-col items-center bg-[#FFF8E8] min-h-screen p-8">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            className="w-32 h-32 rounded-full border-4 border-gray-300"
                            src="https://via.placeholder.com/150"
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
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </button>
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">MY ACCOUNT</h2>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <label className="text-gray-700">Username</label>
                        <button className="text-blue-500">Edit</button>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-md mt-2">
                        johndoe
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between items-center">
                        <label className="text-gray-700">Email</label>
                        <button className="text-blue-500">Edit</button>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-md mt-2">
                        johndoe@gmail.com
                    </div>
                </div>
                <div className="mt-6">
                    <button className="w-full bg-green-500 text-white p-2 rounded-md">
                        Click here to Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageAcc;
