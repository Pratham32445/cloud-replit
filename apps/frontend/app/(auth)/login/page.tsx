"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const authLogin = async (type: string) => {
    if (type == "google")
      await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });
    else signIn("github");
  };
  const credentialsLogin = async () => {
    if (!credentials.email || !credentials.password) return;
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  const handleValueChange = (e, type) => {
    setCredentials((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  return (
    <div className="w-full min-h-screen flex bg-[white]">
      <div className="w-2/4 relative">
        <Image src="/coding.jpeg" fill alt="coding" />
      </div>
      <div className="w-2/4">
        <div className="p-10">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-black">
            Login
          </h1>
          <div className="p-5">
            <div>
              <Input
                type="text"
                placeholder="Email or userName"
                className="p-8 bg-[#F3F3F3] my-5 border-none text-black"
                style={{ fontSize: 20 }}
                value={credentials.email}
                onChange={(e) => handleValueChange(e, "email")}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                className="p-8 bg-[#F3F3F3] border-none rounded my-5 text-black"
                style={{ fontSize: 20 }}
                value={credentials.password}
                onChange={(e) => handleValueChange(e, "password")}
              />
            </div>
            <div>
              <Button
                className="w-full p-6 bg-[#EC4E02] hover:bg-[#ff5100]"
                onClick={credentialsLogin}
              >
                Login
              </Button>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-black">
              Forgot password?
            </p>
          </div>
          <div className="p-5">
            <div
              className="bg-[#E5E5E5] hover:bg-[#d1c7c7] p-3 text-lg flex justify-center gap-5 cursor-pointer my-5"
              onClick={() => authLogin("google")}
            >
              <Image src={"/google.svg"} alt="Google" width={30} height={30} />
              <p className="leading-7 [&:not(:first-child)] text-black">
                Continue with Google
              </p>
            </div>
            <div className="bg-[#E5E5E5] hover:bg-[#d1c7c7] p-3 text-lg flex justify-center gap-5 cursor-pointer">
              <Image src={"/github.svg"} alt="Google" width={30} height={30} />
              <p className="leading-7 [&:not(:first-child)] text-black">
                Continue with Github
              </p>
            </div>
          </div>
          <div>
            <Link href={"/signup"}>
              <p className="leading-7 [&:not(:first-child)]:mt-10 text-center cursor-pointer text-black">
                New to replit? <span className="text-[#EC4E02]">Signup</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
