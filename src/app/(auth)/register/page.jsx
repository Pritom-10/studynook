"use client";

import { Button, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { signUp, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ✅ Password validation function
function validatePassword(password) {
  const errors = [];
  if (password.length < 6) errors.push("At least 6 characters");
  if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter");
  return errors;
}

export default function Register() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [touched, setTouched] = useState(false);

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (touched) {
      setPasswordErrors(validatePassword(val));
    }
  };

  const handlePasswordBlur = () => {
    setTouched(true);
    setPasswordErrors(validatePassword(password));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ Submit এর আগে validate করো
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setTouched(true);
      setPasswordErrors(errors);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());

    const { data, error } = await signUp.email({
      ...registerData,
    });

    if (error) {
      toast.error("Registration failed. Please try again.");
      return;
    }

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Account created! Please login.");
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/login",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
      <div className="grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Join <span className="text-blue-600">StudyNook</span>
              </h2>
              <p className="text-slate-500 font-medium">
                Create your account to get started
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onPress={handleGoogleLogin}
                variant="bordered"
                className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
              >
                <Image
                  width={20}
                  height={20}
                  src="https://www.google.com/favicon.ico"
                  className="w-5 h-5"
                  alt="Google"
                />
                Sign up with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                  Or with email
                </span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  required
                  placeholder="Enter your name"
                  name="name"
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  required
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Profile Image URL
                </label>
                <Input
                  id="image"
                  placeholder="https://images.unsplash.com/..."
                  type="url"
                  name="image"
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  required
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  // ✅ error থাকলে red border
                  className={`border-2 ${
                    touched && passwordErrors.length > 0
                      ? "border-red-400 focus-within:border-red-500"
                      : "border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600"
                  } transition-all duration-300 h-14 bg-white w-full rounded-2xl`}
                />
                {/* ✅ Inline error messages */}
                {touched && passwordErrors.length > 0 && (
                  <ul className="space-y-1 mt-1">
                    {passwordErrors.map((err, i) => (
                      <li
                        key={i}
                        className="text-xs text-red-500 font-medium flex items-center gap-1 ml-1"
                      >
                        <span>✗</span> {err}
                      </li>
                    ))}
                  </ul>
                )}
                {/* ✅ সব ঠিক থাকলে green message */}
                {touched &&
                  passwordErrors.length === 0 &&
                  password.length > 0 && (
                    <p className="text-xs text-green-500 font-medium ml-1">
                      ✓ Password looks good!
                    </p>
                  )}
              </div>

              <Button
                color="primary"
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
              >
                Create Account{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
