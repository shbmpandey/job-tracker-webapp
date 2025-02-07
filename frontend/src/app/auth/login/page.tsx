"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const { token } = await loginUser(email, password);
      login(token);
      router.push("/dashboard");
    } catch (error) {
      setError((error as { response?: { data: string } }).response?.data || "Something went wrong.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center min-h-screen bg-gray-900 px-4"
    >
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Welcome Back!</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Email" type="email" value={email} onChange={setEmail} />
          <InputField label="Password" type="password" value={password} onChange={setPassword} />
          
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-4 text-center text-white/80 text-sm">
          Don&apos;t have an account?{" "}
          <button className="text-indigo-400 font-semibold hover:underline" onClick={() => router.push("/auth/register")}>
            Register here
          </button>
        </p>
      </div>
    </motion.div>
  );
}
