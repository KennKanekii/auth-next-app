"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";
import Image from "next/image";



export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login Success");
            router.push("/profile");

        } catch (error:any) {
            console.log("Login Failed", error.message)
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if (user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return (
        <div className=" flex items-center justify-center min-h-screen bg-gray-300">
            <div className="relative flex flex-col m-6 space-y-8 
            bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 shadow-green-300">
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold text-black">Welcome back</span>
                    <span className="font-light text-gray-400 mb-8">
                        Welcome back! Please enter your details
                    </span>
                    <div className="flex flex-col justify-center py-1">
                        <h1 className="font-bold font-dark text-gray-400 mb-4 
                        text-center">{loading ? "Processing..": "Login"}</h1>
                    
                        <label htmlFor="email" className="text-black">Email</label>
                        <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none 
                        focus:border-gray-600 text-black"
                            id ="email"
                            type = "text"
                            value = {user.email}
                            onChange = {(e)=> setUser({...user, email: e.target.value})}
                            placeholder="email"
                        />
                    </div>
                    <div className="flex flex-col justify-center py-1">
                        <label htmlFor="password" className="text-black">password</label>
                        <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none 
                        focus:border-gray-600 text-black"
                            id ="password"
                            type = "password"
                            value = {user.password}
                            onChange = {(e)=> setUser({...user, password: e.target.value})}
                            placeholder="password"
                        />
                        <div className="flex justify-between w-full py-4">
                            <div className="mr-24">
                            <input type="checkbox" name="ch" id="ch" className="mr-2"/>
                            <span className="text-md text-black">Remember for 30 days</span>
                            </div>
                            <span className="font-bold text-md text-black">Forgot password</span>
                        </div>
                    </div>
                    
                    <button 
                    onClick={onLogin}
                    className="p-2 bg-blue-400 border border-gray-300 rounded-lg mb-4 
                    focus:outline-none focus:border-gray-600 text-black hover:bg-blue-600">
                        Login
                    </button>
                    <button className="text-black w-full border 
                    border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
                        <Image src="google.svg" alt="img" height={24} width={24} className="inline mr-2" />
                        Sign in with Google
                    </button>
                    <div className="bg-gray-300 border rounded-md py-2 px-2 w-full-border 
                    text-center  text-black hover:bg-gray-600">
                        <Link href="/signup">Visit Signup</Link>
                    </div>   
                </div>
                <div className="relative">
                    <div className="w-[400px] h-full hidden rounded-r-2xl md:block">
                        <Image src="/image.jpg" alt="image" layout="fill" objectFit="cover" />
                    </div>
                    
                    <div className="absolute hidden bottom-10 right-6 
                    p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                        <span className="text-white text-xl">Welcome to Token based user  
                        verification and authentication</span>
                    </div>
                </div>
            </div>
        </div>
        
    )
}