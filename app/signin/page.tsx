"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { config } from "../config";
import { Inria_Serif } from "next/font/google";
import Link from "next/link";
import { getUserByEmailAPI } from "../services/usersApi";
import SuccessModal from "../components/SuccessModal";

const inria = Inria_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  const handleLogin = async (email: string) => {

    let exists = false;

    try{
      const data = await getUserByEmailAPI(email);
      exists = (data!== null);  
    } catch (e) {
      console.error("Failed to fetch notes count", e);
    }

    if (exists) {
      localStorage.setItem("loggedIn", "true");
      router.push("/home");
    } else {
      alert("Invalid credentials");
    }

    if (!exists){
      setShowErrorModal(true);
    } 

  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      
      {showErrorModal && <SuccessModal
          message="You are not registered, please return to sign up."
          onClose={() => setShowErrorModal(false)}
        />}
      <form
        className="flex flex-col gap-4 w-800"
      >
        <img 
    src="/sign_in.png" 
    alt="welcome back image"
    className="w-48 h-auto mx-auto mb-4 welcome-back-cactus"
  />
        <h1 className={`${inria.className} font-bold block text-center mb-2 welcome-text`}>{config.default_signin_welcome_message || ""}</h1>

        <input
          className="border p-2 pl-4 rounded placeholder-black w-[380px]"
          type="email"
          placeholder="Email address"
          value={email}
          style={{borderWidth:"1px", borderColor: "#957139", backgroundColor: "#FAF1E3", fontSize:"small"}}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
            <input
                className="border p-2 pl-4 rounded placeholder-black w-[380px]"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                style={{borderWidth:"1px", borderColor: "#957139", backgroundColor: "#FAF1E3", fontSize:"small"}}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
            >
                {showPassword ? (
                // Eye-off icon
                <svg width="21px" height="21px" viewBox="0 0 21 21" className="w-5 h-5 text-[#957139]" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd" stroke="currentColor" 
                    strokeLinecap="round" strokeLinejoin="round" 
                    transform="translate(2 10)">
                    <path d="m0 .5c2.53705308 3.66666667 5.37038642 5.5 8.5 5.5 3.1296136 0 5.9629469-1.83333333 8.5-5.5"/><path d="m2.5 3.423-2 2.077"/>
                    <path d="m14.5 3.423 2 2.077"/>
                    <path d="m10.5 6 1 2.5"/>
                    <path d="m6.5 6-1 2.5"/>
                    </g>
                </svg>
                ) : (
                // Eye icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#957139]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1.5 12s3-7.5 10.5-7.5S22.5 12 22.5 12s-3 7.5-10.5 7.5S1.5 12 1.5 12z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
                )}
            </button>
        </div>

        <button
          type="button"
          onClick={() => handleLogin(email)}
          style={{borderWidth:"1px", borderColor: "#957139"}}
          className="p-2 mt-6 rounded border-elements border rounded-l-full rounded-r-full font-bold w-[380px]"
        >
          Login
        </button>
        <Link className="block text-center underline text-[12px]  mt-[-10px] cursor-pointer" style={{color: "#957139"}} href="/">
          Oops! I've never been here before
        </Link>
      </form>
    </div>
  );
}
