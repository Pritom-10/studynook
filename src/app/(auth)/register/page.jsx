// // "use client";

// // import { Button, Input } from "@heroui/react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { User, Mail, Lock, ArrowRight } from "lucide-react";
// // import toast from "react-hot-toast";
// // import { signUp, authClient } from "@/lib/auth-client";
// // import { useRouter } from "next/navigation";
// // import { useState } from "react";

// // function validatePassword(password) {
// //   const errors = [];
// //   if (password.length < 6) errors.push("At least 6 characters");
// //   if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
// //   if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter");
// //   return errors;
// // }

// // export default function Register() {
// //   const router = useRouter();
// //   const [password, setPassword] = useState("");
// //   const [passwordErrors, setPasswordErrors] = useState([]);
// //   const [touched, setTouched] = useState(false);

// //   const handlePasswordChange = (e) => {
// //     const val = e.target.value;
// //     setPassword(val);
// //     if (touched) {
// //       setPasswordErrors(validatePassword(val));
// //     }
// //   };

// //   const handlePasswordBlur = () => {
// //     setTouched(true);
// //     setPasswordErrors(validatePassword(password));
// //   };

// //   const handleRegister = async (e) => {
// //     e.preventDefault();

// //     const errors = validatePassword(password);
// //     if (errors.length > 0) {
// //       setTouched(true);
// //       setPasswordErrors(errors);
// //       return;
// //     }

// //     const formData = new FormData(e.currentTarget);
// //     const registerData = Object.fromEntries(formData.entries());

// //     const { data, error } = await signUp.email({
// //       ...registerData,
// //     });

// //     if (error) {
// //       toast.error("Registration failed. Please try again.");
// //       return;
// //     }

// //     await authClient.signOut({
// //       fetchOptions: {
// //         onSuccess: () => {
// //           toast.success("Account created! Please login.");
// //           router.push("/login");
// //           router.refresh();
// //         },
// //       },
// //     });
// //   };

// //   const handleGoogleLogin = async () => {
// //     await authClient.signIn.social({
// //       provider: "google",
// //       callbackURL: "/login",
// //     });
// //   };

// //   return (
// //     <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
// //       <div className="grow flex items-center justify-center p-6">
// //         <div className="w-full max-w-md">
// //           <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
// //             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

// //             <div className="text-center space-y-2">
// //               <h2 className="text-3xl font-black text-slate-900 tracking-tight">
// //                 Join <span className="text-blue-600">StudyNook</span>
// //               </h2>
// //               <p className="text-slate-500 font-medium">
// //                 Create your account to get started
// //               </p>
// //             </div>

// //             <div className="space-y-4">
// //               <Button
// //                 onPress={handleGoogleLogin}
// //                 variant="bordered"
// //                 className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
// //               >
// //                 <Image
// //                   width={20}
// //                   height={20}
// //                   src="https://www.google.com/favicon.ico"
// //                   className="w-5 h-5"
// //                   alt="Google"
// //                 />
// //                 Sign up with Google
// //               </Button>
// //             </div>

// //             <div className="relative">
// //               <div className="absolute inset-0 flex items-center">
// //                 <span className="w-full border-t border-slate-100" />
// //               </div>
// //               <div className="relative flex justify-center text-xs uppercase">
// //                 <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
// //                   Or with email
// //                 </span>
// //               </div>
// //             </div>

// //             <form className="space-y-6" onSubmit={handleRegister}>
// //               <div className="space-y-2">
// //                 <label
// //                   htmlFor="name"
// //                   className="text-sm font-bold text-slate-700 ml-1"
// //                 >
// //                   Full Name
// //                 </label>
// //                 <Input
// //                   id="name"
// //                   required
// //                   placeholder="Enter your name"
// //                   name="name"
// //                   className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <label
// //                   htmlFor="email"
// //                   className="text-sm font-bold text-slate-700 ml-1"
// //                 >
// //                   Email Address
// //                 </label>
// //                 <Input
// //                   id="email"
// //                   required
// //                   placeholder="Enter your email"
// //                   type="email"
// //                   name="email"
// //                   className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <label
// //                   htmlFor="image"
// //                   className="text-sm font-bold text-slate-700 ml-1"
// //                 >
// //                   Profile Image URL
// //                 </label>
// //                 <Input
// //                   id="image"
// //                   placeholder="https://images.unsplash.com/..."
// //                   type="url"
// //                   name="image"
// //                   className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <label
// //                   htmlFor="password"
// //                   className="text-sm font-bold text-slate-700 ml-1"
// //                 >
// //                   Password
// //                 </label>
// //                 <Input
// //                   id="password"
// //                   required
// //                   placeholder="••••••••"
// //                   type="password"
// //                   name="password"
// //                   value={password}
// //                   onChange={handlePasswordChange}
// //                   onBlur={handlePasswordBlur}

// //                   className={`border-2 ${
// //                     touched && passwordErrors.length > 0
// //                       ? "border-red-400 focus-within:border-red-500"
// //                       : "border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600"
// //                   } transition-all duration-300 h-14 bg-white w-full rounded-2xl`}
// //                 />

// //                 {touched && passwordErrors.length > 0 && (
// //                   <ul className="space-y-1 mt-1">
// //                     {passwordErrors.map((err, i) => (
// //                       <li
// //                         key={i}
// //                         className="text-xs text-red-500 font-medium flex items-center gap-1 ml-1"
// //                       >
// //                         <span>✗</span> {err}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 )}

// //                 {touched &&
// //                   passwordErrors.length === 0 &&
// //                   password.length > 0 && (
// //                     <p className="text-xs text-green-500 font-medium ml-1">
// //                       ✓ Password looks good!
// //                     </p>
// //                   )}
// //               </div>

// //               <Button
// //                 color="primary"
// //                 type="submit"
// //                 className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
// //               >
// //                 Create Account
// //                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
// //               </Button>
// //             </form>

// //             <div className="text-center pt-2">
// //               <p className="text-sm text-slate-500 font-medium">
// //                 Already have an account?
// //                 <Link
// //                   href="/login"
// //                   className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
// //                 >
// //                   Sign in
// //                 </Link>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { Button, Input } from "@heroui/react";
// import Link from "next/link";
// import { Mail, Lock, ArrowRight } from "lucide-react";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/lib/AuthContext"; // ← নতুন context

// export default function Login() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const { email, password } = Object.fromEntries(formData.entries());

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // ← cookie পাঠাবে
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data?.message || "Login failed.");
//         return;
//       }

//       login(data.user); // ← context এ user set করবে
//       toast.success("Welcome back!");
//       router.push("/");
//     } catch (err) {
//       toast.error("Something went wrong.");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     // Google OAuth পরে implement করা যাবে
//     toast.error("Google login coming soon!");
//   };

//   return (
//     <div className="min-h-[80vh] flex flex-col bg-slate-50 dark:bg-slate-950">
//       <div className="flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl space-y-8 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

//             <div className="text-center space-y-2 relative">
//               <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
//                 Welcome <span className="text-blue-600">Back</span>
//               </h2>
//               <p className="text-slate-500 dark:text-slate-400 font-medium">
//                 Continue your learning journey today
//               </p>
//             </div>

//             <div className="space-y-4">
//               <Button
//                 onPress={handleGoogleLogin}
//                 variant="bordered"
//                 className="w-full h-12 font-bold rounded-2xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors gap-3"
//               >
//                 <Image
//                   width={20}
//                   height={20}
//                   src="https://www.google.com/favicon.ico"
//                   className="w-5 h-5"
//                   alt="Google"
//                 />
//                 Sign in with Google
//               </Button>
//             </div>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <span className="w-full border-t border-slate-100 dark:border-slate-700"></span>
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold tracking-widest">
//                   Or with email
//                 </span>
//               </div>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-6">
//               <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
//                 >
//                   Email Address
//                 </label>
//                 <Input
//                   id="email"
//                   required
//                   placeholder="Enter your email"
//                   type="email"
//                   name="email"
//                   startContent={<Mail className="w-5 h-5 text-slate-400" />}
//                   className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
//                 >
//                   Password
//                 </label>
//                 <Input
//                   id="password"
//                   required
//                   placeholder="••••••••"
//                   type="password"
//                   name="password"
//                   startContent={<Lock className="w-5 h-5 text-slate-400" />}
//                   className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl"
//                 />
//               </div>

//               <Button
//                 color="primary"
//                 type="submit"
//                 className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
//               >
//                 Sign In
//                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </form>

//             <div className="text-center pt-2">
//               <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
//                 New to StudyHook?{" "}
//                 <Link
//                   href="/register"
//                   className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
//                 >
//                   Create an account
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    if (touched) setPasswordErrors(validatePassword(val));
  };

  const handlePasswordBlur = () => {
    setTouched(true);
    setPasswordErrors(validatePassword(password));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = validatePassword(password);
    if (errors.length > 0) {
      setTouched(true);
      setPasswordErrors(errors);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const {
      name,
      email,
      password: pass,
      image,
    } = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass, photoURL: image }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Registration failed.");
        return;
      }

      toast.success("Account created! Please login.");
      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  const handleGoogleLogin = async () => {
    toast.error("Google login coming soon!");
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 dark:bg-slate-950 py-12">
      <div className="grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Join <span className="text-blue-600">StudyNook</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Create your account to get started
              </p>
            </div>

            <Button
              onPress={handleGoogleLogin}
              variant="bordered"
              className="w-full h-12 font-bold rounded-2xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors gap-3"
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold tracking-widest">
                  Or with email
                </span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  required
                  placeholder="Enter your name"
                  name="name"
                  startContent={<User className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  required
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  startContent={<Mail className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl"
                />
              </div>

              {/* Photo URL */}
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >
                  Profile Image URL
                </label>
                <Input
                  id="image"
                  placeholder="https://images.unsplash.com/..."
                  type="url"
                  name="image"
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
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
                  startContent={<Lock className="w-5 h-5 text-slate-400" />}
                  className={`border-2 ${
                    touched && passwordErrors.length > 0
                      ? "border-red-400 focus-within:border-red-500"
                      : "border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600"
                  } transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl`}
                />
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
                Create Account
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
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