// import EnrollmentButton from "@/Component/EnrollmentButton";
// import { auth } from "@/lib/auth";
// import { Chip } from "@heroui/react";
// import { BookOpen, Clock, BarChart, Users } from "lucide-react";
// import { headers } from "next/headers";
// import Image from "next/image";
// import BookNowButton from "@/Component/BookNowButton";

// const fetchSingleCourse = async (id, token) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_rooms/${id}`, {
//     headers: {
//       authorization: `Bearer ${token}` || "",
//     },
//   });
//   const data = res.json();
//   return data || {};
// };

// export default async function CourseDetails({ params }) {
//   const { id } = await params;
//   const { token } = await auth.api.getToken({
//     headers: await headers(),
//   });

//   const course = await fetchSingleCourse(id, token);
//   const {
//     _id,
//     image,
//     name,
//     description,
//     floor,
//     seatCapacity,
//     hourlyRate,
//     amenities,
//   } = course;

//   // console.log(course);

//   const featuredItems = [
//     { icon: Clock, label: floor || "12h 30m" },
//     { icon: BarChart, label: name || "Beginner" },
//     { icon: BookOpen, label: `24 Lessons` },
//     { icon: Users, label: `0 Students` },
//   ];
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
//         <div className="lg:col-span-2 space-y-8">
//           <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video">
//             <Image
//               src={
//                 image ||
//                 "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
//               }
//               alt={name}
//               fill
//               className="object-cover transform transition duration-700 group-hover:scale-105"
//             />
//             <div className="absolute top-6 left-6">
//               <Chip
//                 color="primary"
//                 variant="solid"
//                 className="font-bold shadow-xl"
//               >
//                 {seatCapacity}
//               </Chip>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
//               {name}
//             </h1>
//             <p className="text-xl text-slate-500 leading-relaxed">
//               {description}
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
//             {featuredItems.map((item, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200 text-slate-900 font-bold hover:bg-white hover:shadow-lg transition-all duration-300"
//               >
//                 <item.icon className="w-5 h-5 text-blue-600" />
//                 <span className="text-slate-900">{item.label}</span>
//               </div>
//             ))}
//           </div>

//           <p className="text-xs font-bold text-slate-400 italic">
//             Last enrolled:
//           </p>
//         </div>

//         <div className="lg:col-span-1">
//           <div className="sticky top-24 bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-2xl space-y-8">
//             <div className="space-y-2">
//               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
//                 Course Price
//               </p>
//               <div className="flex items-baseline gap-2">
//                 <span className="text-5xl font-black text-blue-600">
//                   ${hourlyRate}
//                 </span>
//                 {/* <span className="text-slate-400 line-through font-bold">${price}</span> */}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <p className="text-slate-700 font-medium">
//                 <strong>Instructor:</strong> {name}
//               </p>
//               <div className="w-full h-px bg-slate-100"></div>
//               <ul className="space-y-3">
//                 {[
//                   "Lifetime Access",
//                   "Expert Guidance",
//                   "Verified Certificate",
//                 ].map((item, i) => (
//                   <li
//                     key={i}
//                     className="flex items-center gap-3 text-sm font-bold text-slate-500"
//                   >
//                     <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <EnrollmentButton course={course} />
//             <BookNowButton course={course} />
//             <p className="text-center text-xs text-slate-500 font-bold">
//               30-Day Money-Back Guarantee • Secure Payment
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const NotFound = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-24 text-center">
//       <h2 className="text-2xl font-bold text-red-500">Course not found</h2>
//       <p className="text-muted-foreground mt-2">
//         Please log in to view protected course details.
//       </p>
//     </div>
//   );
// };

import { auth } from "@/lib/auth";
import { Chip } from "@heroui/react";
import { Clock, Users, MapPin, DollarSign } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import BookNowButton from "@/Component/BookNowButton";
import EnrollmentButton from "@/Component/EnrollmentButton";

const fetchSingleCourse = async (id, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all_rooms/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}` || "",
      },
      cache: "no-store",
    },
  );
  // ✅ FIX: await যোগ করা হয়েছে
  const data = await res.json();
  return data || {};
};

export default async function CourseDetails({ params }) {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const course = await fetchSingleCourse(id, token);

  // ✅ FIX: সঠিক field names — MongoDB এ যা আছে
  const { _id, image, name, description, floor, Capacity, price, category } =
    course;

  const featuredItems = [
    { icon: MapPin, label: floor || "N/A" },
    { icon: Users, label: Capacity || "N/A" },
    { icon: DollarSign, label: price ? `$${price}/hr` : "N/A" },
    { icon: Clock, label: "Hourly Booking" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left side */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video">
            <Image
              src={
                image ||
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
              }
              alt={name || "Room"}
              fill
              className="object-cover transform transition duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6">
              <Chip
                color="primary"
                variant="solid"
                className="font-bold shadow-xl"
              >
                {floor}
              </Chip>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {name}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Info chips */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-200">
            {featuredItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200 text-slate-900 font-bold hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-blue-600" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Amenities / Category */}
          {Array.isArray(category) && category.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-700">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {category.map((item, i) => (
                  <Chip key={i} color="secondary" variant="flat">
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-2xl space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Hourly Rate
              </p>
              <div className="flex items-baseline gap-2">
                {/* ✅ FIX: price field সঠিকভাবে দেখানো হচ্ছে */}
                <span className="text-5xl font-black text-blue-600">
                  ${price || "N/A"}
                </span>
                <span className="text-slate-400 font-bold">/hr</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium text-slate-600">
                <span>Floor</span>
                <span className="font-bold text-slate-900">{floor}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-600">
                <span>Capacity</span>
                <span className="font-bold text-slate-900">{Capacity}</span>
              </div>
              <div className="w-full h-px bg-slate-100"></div>
              <ul className="space-y-3">
                {[
                  "Instant Confirmation",
                  "Free Cancellation",
                  "Secure Payment",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-slate-500"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* <EnrollmentButton course={course} /> */}
            <BookNowButton course={course} />

            <p className="text-center text-xs text-slate-500 font-bold">
              30-Day Money-Back Guarantee • Secure Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}