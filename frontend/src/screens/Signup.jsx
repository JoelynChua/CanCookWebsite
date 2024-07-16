import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";

const SignUp = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    function signup(email, password) {
        // return auth.createUserWithEmailAndPassword(email, password)
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
                console.log("Signed up user:", user);
                return userCredential;
            })
            .catch((error) => {
                console.log("Error signing up:", error);
                return error;
            });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const username = usernameRef.current.value;

        try {
            // Create user with email and password
            const userCredential = await signup(email, password);
            if (userCredential && userCredential.user) {
                const user = userCredential.user;
                await set(ref(db, "users/" + user.uid), {
                    username,
                    email,
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setError(error.message || "Failed to create an account");
        }

        setLoading(false);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple_main">
            <div className="flex flex-col md:flex-row rounded-3xl shadow-lg max-w-6xl p-5 md:p-0 bg-beige_main">
                <div className="flex flex-col justify-center items-center p-10 md:rounded-l-3xl bg-pink_main">
                    <img
                        src="/authicon.png"
                        alt="CanCook?"
                        className="w-25 h-25"
                    />
                    <h1 className="text-6xl text-textcolor font-baloo">
                        CanCook?
                    </h1>
                    <p className="mt-2 text-center font-overlock font-bold text-textcolor text-md">
                        Want to cook something delicious with ingredients you
                        have? Let us help you!
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center w-full p-10 md:p-20 md:rounded-r-3xl">
                    <h2 className="text-3xl font-overlock text-textcolor font-bold mb-5">
                        WELCOME
                    </h2>
                    {error && <p className="text-red-500">{error}</p>}{" "}
                    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-3sm font-bold mb-1 font-overlock text-textcolor"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                className="shadow border rounded w-full py-2 px-3 text-textcolor leading-tight bg-blue_main focus:outline-none focus:shadow-outline"
                                id="username"
                                type="username"
                                ref={usernameRef}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-3sm font-bold mb-1 font-overlock text-textcolor"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow border rounded w-full py-2 px-3 text-textcolor leading-tight bg-blue_main focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                ref={emailRef}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-3sm font-bold mb-1 font-overlock text-textcolor"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow border rounded w-full py-2 px-3 text-textcolor leading-tight bg-blue_main focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                ref={passwordRef}
                            />
                        </div>
                        <div className="flex justify-end font-overlock underline decoration-sky-500/80 mb-6">
                            <Link to="/ForgotPassword">Forgot password?</Link>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                className="bg-orange_main hover:bg-orange-400 text-textcolor hover:text-green-900 py-2 px-4 rounded-3xl font-bold font-overlock"
                                type="submit"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-textcolor font-bold font-overlock">
                        Already have an account?{" "}
                        <Link
                            to="/Signin"
                            className=" text-orange_main font-overlock font-bold underline decoration-sky-500/80"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
