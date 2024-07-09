import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const emailRef = useRef();
    // const { forgotpassword } = useAuth();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function forgotpassword(email) {
        return sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("A password Reset Link has been sent to your email");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
            });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await forgotpassword(emailRef.current.value);

            setMessage("Check your inbox for further instructions");
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple_main">
            <div className="flex flex-col md:flex-row rounded-3xl shadow-lg max-w-6xl max-h-6xl p-5 md:p-0 bg-beige_main h-full">
                <div className=" flex flex-col justify-center items-center p-10  md:rounded-l-3xl bg-pink_main">
                    <img src="/forgetpasswordicon.png" alt="Forget Password" />
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    {/* Container for form elements */}
                    <div className="flex flex-col justify-center items-center w-full p-10 md:p-20 md:rounded-r-3xl">
                        <h2 className="text-4xl font-overlock text-textcolor font-bold mb-1">
                            FORGOT PASSWORD
                        </h2>
                        <h6 className="tracking-tight text-sm text-textcolor font-'Inter mb-6 text-center">
                            Enter email address to receive reset password link
                        </h6>

                        {/* Container for input and button */}
                        <div className="w-full flex flex-col items-center space-y-4 ">
                            <div className="w-full max-w-xs mb-0">
                                <label
                                    className="block text-3sm font-bold mb-1 font-overlock text-textcolor"
                                    htmlFor="emailVer"
                                >
                                    Email
                                </label>
                                <input
                                    ref={emailRef}
                                    className="shadow border rounded w-full py-2 px-3 text-textcolor leading-tight bg-blue_main focus:outline-none focus:shadow-outline"
                                    id="emailVer"
                                    type="email"
                                    required
                                />
                            </div>

                            <div className="w-full flex items-center justify-center">
                                <button
                                    className="bg-orange_main hover:bg-orange-400 text-textcolor hover:text-green-900 py-2 px-4 rounded-3xl font-bold font-overlock"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        {message && <p className="text-green-500">{message}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
