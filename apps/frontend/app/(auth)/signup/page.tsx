"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";

const Signup = () => {
  const BACKEND_URL = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleValueChange = (e, type) => {
    setCredentials((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };
  const handleSignupAuth = async () => {
    if (!credentials.username || !credentials.email || !credentials.password)
      return;
    axios
      .post(`${BACKEND_URL}/api/v1/user/signup`, {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      })
      .then((res) => {
        if (res.status == 201) {
          signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            redirect: true,
            callbackUrl: "/",
          });
        }
      });
  };
  return (
    <div className="w-full min-h-screen flex bg-[white]">
      <div className="w-2/4 relative">
        <Image src="/coding.jpeg" fill alt="coding" />
      </div>
      <div className="w-2/4">
        <div className="p-10">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-black">
            Create Account
          </h1>
          <div className="p-5">
            <div className="bg-[#E5E5E5] hover:bg-[#d1c7c7] p-3 text-lg flex justify-center gap-5 cursor-pointer my-5 rounded">
              <Image src={"/google.svg"} alt="Google" width={30} height={30} />
              <p className="leading-7 [&:not(:first-child)] text-black">
                Continue with Google
              </p>
            </div>
            <div className="bg-[#E5E5E5] hover:bg-[#d1c7c7] p-3 text-lg flex justify-center gap-5 cursor-pointer rounded">
              <Image src={"/github.svg"} alt="Google" width={30} height={30} />
              <p className="leading-7 [&:not(:first-child)] text-black">
                Continue with Github
              </p>
            </div>
          </div>
          <div className="p-5">
            <div>
              <Input
                type="text"
                placeholder="userName"
                className="p-8 bg-[#F3F3F3] my-5 text-black"
                style={{ fontSize: 20 }}
                value={credentials.username}
                onChange={(e) => handleValueChange(e, "username")}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="email"
                className="p-8 bg-[#F3F3F3] my-5 text-black"
                style={{ fontSize: 20 }}
                value={credentials.email}
                onChange={(e) => handleValueChange(e, "email")}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                className="p-8 bg-[#F3F3F3] rounded my-5 text-black"
                style={{ fontSize: 20 }}
                value={credentials.password}
                onChange={(e) => handleValueChange(e, "password")}
              />
            </div>
            <div>
              <Button
                className="w-full p-6 bg-[#EC4E02]"
                onClick={handleSignupAuth}
              >
                Create
              </Button>
            </div>
          </div>
          <div>
            <Link href={"/login"}>
              <p className="leading-7 [&:not(:first-child)]:mt-10 text-center cursor-pointer text-black">
                Already have a account?{" "}
                <span className="text-[#EC4E02]">Login</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
