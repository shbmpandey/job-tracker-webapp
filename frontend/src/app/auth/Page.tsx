"use client";

import Login from "@/app/auth/login/page";
import { usePathname } from "next/navigation";
import Register from "./register/page";

export default function AuthPage() {
  const pathname = usePathname();
  const isRegister = pathname === "/auth/register";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="w-full max-w-md p-8 bg-white/10 shadow-lg rounded-2xl transition duration-500 hover:scale-105">
        {isRegister ? <Register /> : <Login />}
      </div>
    </div>
  );
}
