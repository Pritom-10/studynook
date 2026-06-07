// "use client";

// import { useState } from "react";
// import { Button } from "@heroui/react";
// import { useSession, authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function EnrollmentButton({ course }) {
//   const { data: session } = useSession();
//   const router = useRouter();


//   const handleEnroll = async () => {
//     const { data: jwtData } = await authClient.token();
//     const token = jwtData?.token;
//     if (!token) {
//       toast.error("authentication falid. Enrollment not add.");
//       return;
//     }
//     const updatedData = {
//       userId: session?.user?.id,
//       studentName: session?.user?.name,
//       studentEmail: session?.user?.email,
//       roomId: course?._id,
//       name: course?.name,
//       image: course?.image,
//       floor: course?.floor,
//       price: course?.price,
//     };

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/add-room/${course?._id}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedData),
//       },
//     );

   

//     const text = await res.text();

//     console.log(text);

//     let data;

//     try {
//       data = JSON.parse(text);
//     } catch (error) {
//       toast.error("Backend JSON return kortese na");
//       return;
//     }

//     if (!res.ok) {
//       toast.error("Something went wrong");
//       return;
//     }

//     router.push("/yourrooms");
//     router.refresh();
//   };
//   return (
//     <Button
//       color="primary"
//       size="lg"
//       className="w-full font-bold shadow-lg mt-4"
//       onPress={handleEnroll}
//     >
//       Enroll Now
//     </Button>
//   );
// }

"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { useAuth } from "@/lib/AuthContext"; // ← নতুন
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EnrollmentButton({ course }) {
  const { user } = useAuth(); // ← useSession এর বদলে
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login first.");
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const updatedData = {
        userId: user?.id || user?._id,
        studentName: user?.name,
        studentEmail: user?.email,
        roomId: course?._id,
        name: course?.name,
        image: course?.image,
        floor: course?.floor,
        price: course?.price,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-room/${course?._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ← cookie পাঠাবে
          body: JSON.stringify(updatedData),
        },
      );

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        toast.error("Server error. Please try again.");
        return;
      }

      if (!res.ok) {
        toast.error(data?.message || "Something went wrong.");
        return;
      }

      toast.success("Enrolled successfully!");
      router.push("/yourrooms");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color="primary"
      size="lg"
      className="w-full font-bold shadow-lg mt-4"
      onPress={handleEnroll}
      isLoading={loading}
    >
      Enroll Now
    </Button>
  );
}
