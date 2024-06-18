// ../screens/SignUp.js
import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-purple_main" >
      <div className="flex flex-col md:flex-row rounded-lg shadow-lg max-w-4xl p-5 md:p-0 bg-beige">
        
        {/* Left Section */}
        <div className=" flex flex-col justify-center items-center p-10 md:rounded-l-lg bg-pink_main">
          <img src="/path/to/your/logo.png" alt="CanCook?" className="w-24 h-24 mb-4" />
          <h1 className="text-4xl font-bold">CanCook?</h1>
          <p className="mt-4 text-center">Want to cook something delicious with the ingredients you have? Let us help you!</p>
        </div>
        
        {/* Right Section */}
        <div className="flex flex-col justify-center items-center p-10 md:p-20 bg-cream-300 md:rounded-r-lg">
          <h2 className="text-3xl font-bold mb-5">Welcome</h2>
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="username" 
                type="text" 
                placeholder="Username" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" 
                type="email" 
                placeholder="Email" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="password" 
                type="password" 
                placeholder="Password" 
              />
            </div>
            <div className="flex items-center justify-between">
              <button 
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="button"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="my-4 w-full flex justify-between items-center">
            <hr className="w-2/5" />
            <span className="text-gray-400">or</span>
            <hr className="w-2/5" />
          </div>
          <button 
            className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <img src="/path/to/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
          <p className="mt-4">
            Already have an account? <Link to="/signin" className="text-orange_main">Sign in</Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default SignUp;
