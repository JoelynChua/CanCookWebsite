import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup, googleLogin, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        // debugger
        try {
            console.log("Email:", emailRef.current.value);
            console.log("Password:", passwordRef.current.value);
            const isSuccessful = await signup(
                emailRef.current.value,
                passwordRef.current.value
            );

            if (isSuccessful) {
                navigate("/");
            } else {
                alert("Email is already taken");
            }
            // Redirect to home or another page after sign-up
        } catch (error) {
            console.error("Signup Error:", error);
            setError(error?.message || "Failed to create an account"); // Safely access message
        }

        setLoading(false);
    }
    async function handleGoogleLogin(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await googleLogin();
        } catch (error) {
            setError(error?.message || "Failed to sign in with Google");
        }
        //Hello
        setLoading(false);
    }

    // Redirect to home if already logged in
    if (currentUser) {
        navigate("/");
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple_main">
            <div className="flex flex-col md:flex-row rounded-3xl shadow-lg max-w-6xl p-5 md:p-0 bg-beige_main">
                <div className="flex flex-col justify-center items-center p-10 md:rounded-l-3xl bg-pink_main">
                    <img src="/icon.png" alt="CanCook?" className="w-25 h-25" />
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
                            Forgot password?
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-orange_main hover:bg-orange-400 text-textcolor hover:text-green-900 py-2 px-4 rounded-3xl font-bold font-overlock"
                                type="submit"
                                disabled={loading}
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                    <div className="my-4 w-full flex justify-between items-center">
                        <hr className="w-2/5 bg-blue_main" />
                        <span className="text-textcolor">or</span>
                        <hr className="w-2/5  bg-blue_main" />
                    </div>
                    <div
                        onClick={handleGoogleLogin}
                        className="flex items-center hover:bg-blue_main"
                    >
                        <img
                            src="/googlelogo.png"
                            alt="Google"
                            className="w-10 h-9"
                        />
                        <div className=" text-textcolor font-bold underline decoration-sky-500/80 font-overlock">
                            Sign up with Google
                        </div>
                    </div>
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