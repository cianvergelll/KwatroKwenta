"use client";

import Link from "next/link";
import { useState } from "react";
import  { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { DivideIcon } from "@heroicons/react/16/solid";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router =  useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Check if email and password are provided
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
    
        try {
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false, 
            });
    
            if (response?.error) {
                setError("Invalid Credentials");
            } else {
                setError("");
                router.replace("/expenses");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An unexpected error occurred.");
        }
    };
    
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
                {/* Left Container */}
                <div className="h-full md:h-screen p-10 md:p-20 flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-6xl lg:text-7xl md:text-5xl sm:text-5xl font-bold bg-gradient-to-br from-[#018053] to-[#001a10] bg-clip-text text-transparent text-shadow-lg transition duration-500">
                        Kwenta
                    </h1>
                    <h5 className="text-lg md:text-1xl mt-4 transition duration-500">
                        Track, manage, and take control of your finances with us
                    </h5>
                </div>
    
                {/* Right Container */}
                <div className="h-full md:h-screen bg-gradient-to-br from-[#018053] to-[#001a10] p-10 md:p-20 flex flex-col justify-center lg:rounded-tl-2xl lg:rounded-bl-2xl md:rounded-tl-2xl md:rounded-bl-2xl shadow-2xl">
                    <div className="text-center md:text-left">
                        <h1 className="text-white text-2xl md:text-3xl font-semibold fade-in">
                            Log in to your account
                        </h1>
                        <form onSubmit={handleSubmit} className="pt-6 space-y-3 fade-in">
                            <input
                                className="block w-full bg-transparent border border-gray-300 rounded-lg p-2 text-white"
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                placeholder="Email"
                            />
                            <input
                                className="block w-full bg-transparent border border-gray-300 rounded-lg p-2 text-white"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                            />
                            <button className="block w-full bg-white rounded-lg p-2 text-[#018053] font-semibold hover:bg-gradient-to-br from-[#018053] to-[#001a10] hover:text-white transition duration-500 border border-gray-200">
                                Login
                            </button>
    
                            {error && <div className="text-red-500 text-center">{error}</div>}
    
                            <div className="flex flex-col justify-center">
                                <a href="#" className="text-white text-center mt-3">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="border-t border-white w-full opacity-50 mt-4"></div>
                            <div className="pt-6">
                                <a
                                    href="/register"
                                    className="block w-full bg-white rounded-lg p-2 text-[#018053] font-semibold text-center hover:bg-gradient-to-br from-[#018053] to-[#001a10] hover:text-white transition duration-500 border border-gray-200"
                                >
                                    Create an Account
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );    
}