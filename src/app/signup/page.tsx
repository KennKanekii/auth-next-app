"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";
import Image from "next/image";



export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error:any) {
            console.log("Signup Failed", error.message)
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if (user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <div className="relative flex flex-col m-6 space-y-8 
            bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 shadow-green-300">
                <div className="flex flex-col justify-center p-8 md:p-25">
                    <span className="font-dark font-bold text-gray-400 mb-8">
                            Welcome to Signup Page!
                    </span>
                    <div className="flex flex-col items-center justify-center py-1">
                        <h1 className="font-bold font-dark text-gray-400 mb-4 
                        text-center">{loading ? "Processing..": "Signup"}</h1>
                        <hr/>
                        <div className="flex flex-col text-left"></div>
                        <label htmlFor="username" className="text-black flex flex-row 
                        -ml-20 mr-20 pl-4">Username</label>
                        <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 
                        focus:outline-none focus:border-gray-600 text-black"
                            id ="username"
                            type = "text"
                            value = {user.username}
                            onChange = {(e)=> setUser({...user, username: e.target.value})}
                            placeholder="username"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center py-1">
                        <label htmlFor="email" className="text-black flex flex-row 
                        -ml-20 mr-20 pr-4 -pl-2">Email</label>
                        <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 
                        focus:outline-none focus:border-gray-600 text-black"
                            id ="email"
                            type = "text"
                            value = {user.email}
                            onChange = {(e)=> setUser({...user, email: e.target.value})}
                            placeholder="email"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center py-1">
                        <label htmlFor="password" className="text-left 
                        text-black flex flex-row 
                        -ml-20 mr-20 pl-3">Password</label>
                        <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 
                        focus:outline-none focus:border-gray-600 text-black"
                            id ="password"
                            type = "text"
                            value = {user.password}
                            onChange = {(e)=> setUser({...user, password: e.target.value})}
                            placeholder="password"
                        />
                    </div>   
                        
                    <button 
                    onClick={onSignup}
                    className="p-2 bg-blue-400 border border-gray-300 rounded-lg mb-4 
                    focus:outline-none focus:border-gray-600 text-black hover:bg-blue-600">
                        {buttonDisabled? "No Signup": "Signup"}
                    </button>
                    <Link href="/login" className="bg-gray-300 text-black font-bold 
                    flex flex-col items-center hover:bg-gray-600 py-2 
                    px-2 border rounded-md">Visit Login</Link>
                </div>
                <div className="relative">
                    <div className="w-[400px] h-full hidden rounded-r-2xl md:block">
                        <Image src="/image1.jpg" alt="image" layout="fill" objectFit="cover" />
                    </div>
                    
                    <div className="absolute hidden bottom-10 right-6 
                    p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                        <span className="text-black italic text-xl">Welcome to Token based user  
                        verification and authentication</span>
                    </div>
                </div>
            </div>
        </div>
        
    )
}