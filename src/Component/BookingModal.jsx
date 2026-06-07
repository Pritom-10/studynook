// "use client";

// import { useState, useMemo } from "react";
// import { Button, Input } from "@heroui/react";
// import { useRouter } from "next/navigation";
// import { authClient, useSession } from "@/lib/auth-client";
// import toast from "react-hot-toast";

// const TIME_SLOTS = [
//   "08:00",
//   "09:00",
//   "10:00",
//   "11:00",
//   "12:00",
//   "13:00",
//   "14:00",
//   "15:00",
//   "16:00",
//   "17:00",
//   "18:00",
//   "19:00",
//   "20:00",
// ];


// const parseRate = (rate) => {
//   if (!rate) return 0;
//   const num = parseFloat(String(rate).replace(/[^0-9.]/g, ""));
//   return isNaN(num) ? 0 : num;
// };

// export default function BookingModal({ course, onClose }) {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const today = new Date().toISOString().split("T")[0];

//   const [bookingDate, setBookingDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [specialNote, setSpecialNote] = useState("");
//   const [loading, setLoading] = useState(false);

//   const hourlyRate = parseRate(course?.hourlyRate || course?.price);


//   const endTimeOptions = useMemo(() => {
//     if (!startTime) return [];
//     const startIndex = TIME_SLOTS.indexOf(startTime);
//     return TIME_SLOTS.slice(startIndex + 1);
//   }, [startTime]);


//   const totalCost = useMemo(() => {
//     if (!startTime || !endTime) return 0;
//     const startHour = parseInt(startTime.split(":")[0]);
//     const endHour = parseInt(endTime.split(":")[0]);
//     return (endHour - startHour) * hourlyRate;
//   }, [startTime, endTime, hourlyRate]);

//   const handleBook = async () => {
 
//     if (!bookingDate || !startTime || !endTime) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data: jwtData } = await authClient.token();
//       const token = jwtData?.token;

//       if (!token) {
//         toast.error("Authentication failed.");
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         roomId: course?._id,
//         roomName: course?.name,
//         roomImage: course?.image,
//         userId: session?.user?.id,
//         studentName: session?.user?.name,
//         studentEmail: session?.user?.email,
//         bookingDate,
//         startTime,
//         endTime,
//         totalCost,
//         specialNote,
//       };
//          console.log("Session user id:", session?.user?.id);
//          console.log("Payload:", payload);

//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
        
//         toast.error(data?.message || "Booking failed.");
//         setLoading(false);
//         return;
//       }

//       toast.success("Room booked successfully!");
//       onClose();
//       router.push("/yourrooms");
//     } catch (err) {
//         console.error(err);
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 space-y-6">
      
//         <div className="space-y-1">
//           <h2 className="text-2xl font-black text-slate-900">Book a Room</h2>
//           <p className="text-slate-500 font-medium">{course?.name}</p>
//         </div>

       
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">
//             Date <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             min={today}
//             value={bookingDate}
//             onChange={(e) => setBookingDate(e.target.value)}
//             className="w-full h-12 px-4 border-2 border-slate-200 hover:border-blue-400 focus:border-blue-600 rounded-2xl outline-none transition-all text-slate-700 font-medium"
//           />
//         </div>

      
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">
//             Start Time <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={startTime}
//             onChange={(e) => {
//               setStartTime(e.target.value);
//               setEndTime("");
//             }}
//             className="w-full h-12 px-4 border-2 border-slate-200 hover:border-blue-400 focus:border-blue-600 rounded-2xl outline-none transition-all text-slate-700 font-medium bg-white"
//           >
//             <option value="">Select start time</option>
//             {TIME_SLOTS.slice(0, -1).map((t) => (
//               <option key={t} value={t}>
//                 {t}
//               </option>
//             ))}
//           </select>
//         </div>

      
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">
//             End Time <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             disabled={!startTime}
//             className="w-full h-12 px-4 border-2 border-slate-200 hover:border-blue-400 focus:border-blue-600 rounded-2xl outline-none transition-all text-slate-700 font-medium bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <option value="">Select end time</option>
//             {endTimeOptions.map((t) => (
//               <option key={t} value={t}>
//                 {t}
//               </option>
//             ))}
//           </select>
//         </div>

       
//         {totalCost > 0 && (
//           <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 flex justify-between items-center">
//             <span className="text-slate-600 font-bold">Total Cost</span>
//             <span className="text-2xl font-black text-blue-600">
//               ${totalCost}
//             </span>
//           </div>
//         )}

      
//         <div className="space-y-2">
//           <label className="text-sm font-bold text-slate-700">
//             Special Note{" "}
//             <span className="text-slate-400 font-normal">(optional)</span>
//           </label>
//           <textarea
//             value={specialNote}
//             onChange={(e) => setSpecialNote(e.target.value)}
//             placeholder="Any special requests?"
//             rows={3}
//             className="w-full px-4 py-3 border-2 border-slate-200 hover:border-blue-400 focus:border-blue-600 rounded-2xl outline-none transition-all text-slate-700 font-medium resize-none"
//           />
//         </div>

        
//         <div className="flex gap-3 pt-2">
//           <Button
//             variant="flat"
//             size="lg"
//             className="flex-1 font-bold rounded-2xl"
//             onPress={onClose}
//           >
//             Cancel
//           </Button>
//           <Button
//             color="primary"
//             size="lg"
//             className="flex-1 font-black rounded-2xl shadow-lg shadow-blue-600/20"
//             onPress={handleBook}
//             isLoading={loading}
//           >
//             Confirm Booking
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext"; // ← নতুন
import toast from "react-hot-toast";

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const parseRate = (rate) => {
  if (!rate) return 0;
  const num = parseFloat(String(rate).replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
};

export default function BookingModal({ course, onClose }) {
  const { user } = useAuth(); // ← useSession এর বদলে
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);

  const hourlyRate = parseRate(course?.hourlyRate || course?.price);

  const endTimeOptions = useMemo(() => {
    if (!startTime) return [];
    const startIndex = TIME_SLOTS.indexOf(startTime);
    return TIME_SLOTS.slice(startIndex + 1);
  }, [startTime]);

  const totalCost = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    return (endHour - startHour) * hourlyRate;
  }, [startTime, endTime, hourlyRate]);

  const handleBook = async () => {
    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        roomId: course?._id,
        roomName: course?.name,
        roomImage: course?.image,
        userId: user?.id || user?._id, // ← user থেকে নিচ্ছে
        studentName: user?.name,
        studentEmail: user?.email,
        bookingDate,
        startTime,
        endTime,
        totalCost,
        specialNote,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ← cookie পাঠাবে, token লাগবে না
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Booking failed.");
        return;
      }

      toast.success("Room booked successfully!");
      onClose();
      router.push("/yourrooms");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md p-8 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Book a Room
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {course?.name}
          </p>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            min={today}
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full h-12 px-4 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 focus:border-blue-600 rounded-2xl outline-none transition-all text-slate-700 dark:text-slate-200 dark:bg-slate-800 font-medium"
          />
        </div>

        {/* Start Time */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Start Time <span className="text-red-500">*</span>
          </label>
          <select
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              setEndTime("");
            }}
            className="w-full h-12 px-4 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 focus:border-blue-600 rounded-2xl outline-none transition-all text-slate-700 dark:text-slate-200 font-medium bg-white dark:bg-slate-800"
          >
            <option value="">Select start time</option>
            {TIME_SLOTS.slice(0, -1).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* End Time */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            End Time <span className="text-red-500">*</span>
          </label>
          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={!startTime}
            className="w-full h-12 px-4 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 focus:border-blue-600 rounded-2xl outline-none transition-all text-slate-700 dark:text-slate-200 font-medium bg-white dark:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select end time</option>
            {endTimeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Total Cost */}
        {totalCost > 0 && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl px-5 py-4 flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-300 font-bold">
              Total Cost
            </span>
            <span className="text-2xl font-black text-blue-600">
              ${totalCost}
            </span>
          </div>
        )}

        {/* Special Note */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Special Note{" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={specialNote}
            onChange={(e) => setSpecialNote(e.target.value)}
            placeholder="Any special requests?"
            rows={3}
            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 focus:border-blue-600 rounded-2xl outline-none transition-all text-slate-700 dark:text-slate-200 dark:bg-slate-800 font-medium resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="flat"
            size="lg"
            className="flex-1 font-bold rounded-2xl"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            size="lg"
            className="flex-1 font-black rounded-2xl shadow-lg shadow-blue-600/20"
            onPress={handleBook}
            isLoading={loading}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
