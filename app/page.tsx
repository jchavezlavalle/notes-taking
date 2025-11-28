"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { config } from "./config";
import { Inria_Serif } from "next/font/google";
import Link from "next/link";

const inria = Inria_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "test@test.com" && password === "1234") {
      localStorage.setItem("loggedIn", "true");
      router.push("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-800"
      >
        <img 
    src="/welcome_img.png" 
    alt="welcome image"
    className="w-48 h-auto mx-auto mb-4 welcome-cat"
  />
        <h1 className={`${inria.className} font-bold block text-center mb-2 welcome-text`}>{config.default_login_welcome_message || ""}</h1>

        <input
          className="border p-2 rounded placeholder-black w-[380px]"
          type="email"
          placeholder="Email address"
          value={email}
          style={{borderWidth:"1px", borderColor: "#957139", backgroundColor: "#FAF1E3", fontSize:"small"}}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 rounded placeholder-black w-[380px]"
          type="password"
          placeholder="Password"
          value={password}
          style={{borderWidth:"1px", borderColor: "#957139", backgroundColor: "#FAF1E3", fontSize:"small"}}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          style={{borderWidth:"1px", borderColor: "#957139"}}
          className="p-2 rounded border-elements border rounded-l-full rounded-r-full font-bold w-[380px]"
        >
          Sign Up
        </button>
        <Link className="block text-center underline text-blue-600 cursor-pointer" style={{color: "#957139"}} href="/signin">
          We're already friends!
        </Link>
      </form>
    </div>
  );
}
