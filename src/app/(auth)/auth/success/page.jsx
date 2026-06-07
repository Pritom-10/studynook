"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function AuthSuccess() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        if (user?.email) {
          login(user);
          router.push("/");
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
