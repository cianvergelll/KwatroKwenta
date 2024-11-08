"use client";

import Link from "next/link";
import { useState } from "react";
import  { useRouter } from "next/navigation";
import { DivideIcon } from "@heroicons/react/16/solid";


export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const  router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
        }

        try {

            const responseUserExists = await fetch('api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({ email }),
            })

            const { user } = await responseUserExists.json();

            if (user) {
                setError("User already exists.");
                return;
            }

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
            body: JSON.stringify({
                name, email, password
            })
        });

        if (response.ok) {
            const form =e.target as HTMLFormElement;
            form.reset();
            router.push("/login");
        } else {
            console.log("User registration  failed");

        }
        } catch (error) {
            console.log("Error during registration", error);

        }
    };

    console.log("Name: ", name);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
                {/* Left Container */}
                <div className="h-full md:h-screen p-10 md:p-20 flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-6xl lg:text-7xl md:text-5xl sm:text-5xl font-bold bg-gradient-to-br from-[#018053] to-[#001a10] bg-clip-text text-transparent text-shadow-lg">
                        Kwenta
                    </h1>
                    <h5 className="text-lg md:text-1xl mt-4">
                        Track, manage, and take control of your finances with us
                    </h5>
                </div>

                {/* Right Container */}
                <div className="h-full md:h-screen bg-gradient-to-br from-[#018053] to-[#001a10] p-10 md:p-20 flex flex-col justify-center lg:rounded-tl-2xl lg:rounded-bl-2xl md:rounded-tl-2xl md:rounded-bl-2xl shadow-2xl">
                    <div className="text-center md:text-left">
                        <h1 className="text-white text-2xl md:text-3xl font-semibold fade-in">
                            Create an Account
                        </h1>
                        <form onSubmit={handleSubmit} className="pt-6 space-y-3 fade-in">
                            <input
                                className="block w-full bg-transparent border border-gray-300 rounded-lg p-2 text-white"
                                type="text"
                                placeholder="Username"
                                onChange={e => setName(e.target.value)}
                            />
                            <input
                                className="block w-full bg-transparent border border-gray-300 rounded-lg p-2 text-white"
                                type="email"
                                placeholder="Email"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                className="block w-full bg-transparent border border-gray-300 rounded-lg p-2 text-white"
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                            />

                            <button type="submit" className="block w-full bg-white rounded-lg p-2 text-[#018053] font-semibold hover:bg-gradient-to-br from-[#018053] to-[#001a10] hover:text-white transition duration-500 border border-gray-200">
                                Register
                            </button>

                            {error && (
                                <div className="text-red-500 text-center">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col justify-center">
                                <div className="flex justify-center items-center mt-3">
                                    <a href="/login" className="text-white pl-2">Already have an account? Login</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}