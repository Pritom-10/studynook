// "use client";

// import { Button, Input } from "@heroui/react";
// import Link from "next/link";
// import { Mail, Lock, ArrowRight } from "lucide-react";
// import Image from "next/image";
// import { authClient, signIn } from "@/lib/auth-client";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const loginData = Object.fromEntries(formData.entries());

//     const { data, error } = await signIn.email({
//       ...loginData,
//       callbackURL: "/",
//     });

//     if (error) {
//       toast.error("Login failed. Check your email and password.");
//       return;
//     }

//     toast.success("Welcome back!");
//     router.push("/");
//   };

//   const handleGoogleLogin = async () => {
//     await authClient.signIn.social({
//       provider: "google",
//       callbackURL: "/",
//     });
//   };

//   return (
//     <div className="min-h-[80vh] flex flex-col bg-slate-50">
//       <div className="flex items-center justify-center p-4">
//         <div className="w-full max-w-md">
//           <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

//             <div className="text-center space-y-2 relative">
//               <h2 className="text-3xl font-black text-slate-900 tracking-tight">
//                 Welcome <span className="text-blue-600">Back</span>
//               </h2>
//               <p className="text-slate-500 font-medium">
//                 Continue your learning journey today
//               </p>
//             </div>

//             <div className="space-y-4">
//               <Button
//                 onPress={handleGoogleLogin}
//                 variant="bordered"
//                 className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
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
//                 <span className="w-full border-t border-slate-100"></span>
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
//                   Or with email
//                 </span>
//               </div>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-6">
//               <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="text-sm font-bold text-slate-700 ml-1"
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
//                   className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-bold text-slate-700 ml-1"
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
//                   className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <Link
//                   href="#"
//                   className="text-sm font-bold text-blue-600 hover:underline underline-offset-4 transition-all"
//                 >
//                   Forgot password?
//                 </Link>
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
//               <p className="text-sm text-slate-500 font-medium">
//                 New to StudyHook?
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
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext"; // ← নতুন

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Login failed.");
        return;
      }

      login(data.user);
      toast.success("Welcome back!");
      router.push("/");
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

const handleGoogleLogin = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
};

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 dark:bg-slate-950">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Welcome <span className="text-blue-600">Back</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Continue your learning journey today
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
              Sign in with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100 dark:border-slate-700"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold tracking-widest">
                  Or with email
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
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
                  startContent={<Lock className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white dark:bg-slate-800 w-full rounded-2xl"
                />
              </div>

              <Button
                color="primary"
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
              >
                Sign In
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                New to StudyHook?
                <Link
                  href="/register"
                  className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}