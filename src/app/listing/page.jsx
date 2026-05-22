// import Image from "next/image";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import { Button, Chip } from "@heroui/react";
// import { BookOpen, Clock } from "lucide-react";
// import Link from "next/link";

// // const Listing = async () => {
// //   // const { token } = await auth.api.getToken({
// //   //   headers: await headers(),
// //   // });

// //  const session = await auth.api.getSession({
// //    headers: await headers(),
// //  });

// //  if (!session?.user) {
// //    redirect("/listing");
// //  }

// // const res = await fetch(
// //   `${process.env.NEXT_PUBLIC_API_URL}/listing/${session.user.id}`,
// //   {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //     cache: "no-store",
// //   },
// // );

// // const data = await res.json();

// // const courses = Array.isArray(data) ? data : [];
// const Listing = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const { token } = await auth.api.getToken({
//     headers: await headers(),
//   });

//   if (!session?.user || !token) {
//     redirect("/login");
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/listing/${session.user.id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     },
//   );

//   const data = await res.json();
//   const courses = Array.isArray(data) ? data : [];

//   // const res = await fetch(
//   //   `${process.env.NEXT_PUBLIC_API_URL}/listing/${session.user.id}`,
//   //   {
//   //     headers: {
//   //       // যদি backend verifyToken use করে
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //     cache: "no-store",
//   //   },
//   // );

//   // if (!res.ok) {
//   //   throw new Error("Failed to fetch");
//   // }

//   // const data = await res.json();

//   // // SAFE FIX
//   // const courses = Array.isArray(data) ? data : [];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-8">My Listings</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
//         {courses?.map((course) => (
//           <div key={course?._id} className="border rounded-2xl p-4">
//             {/* <Image
//               src={course?.image}
//               alt={course?.name}
//               width={400}
//               height={250}
//               className="w-full h-52 object-cover rounded-xl"
//             />

//             <h2 className="text-xl font-bold mt-4">{course?.name}</h2> */}
//             <div className="group flex flex-col bg-white rounded-4xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//               <div className="relative overflow-hidden aspect-16/10">
//                 <Image
//                   alt="Course Image"
//                   className="object-cover group-hover:scale-110 transition-transform duration-700"
//                   src={
//                     course?.image ||
//                     "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"
//                   }
//                   fill
//                 />
//                 <div className="absolute top-4 right-4">
//                   <Chip
//                     color="primary"
//                     variant="solid"
//                     className="font-bold shadow-lg shadow-blue-600/20"
//                   >
//                     {course?.floor}
//                   </Chip>
//                 </div>
//               </div>
//               <div className="p-8 flex flex-col grow space-y-4">
//                 <div className="space-y-2">
//                   <Link href={`/all_rooms/${course?._id}`}>
//                     <h3 className="text-xl font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
//                       {course?.name}
//                     </h3>
//                   </Link>
//                   <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
//                     By <span className="text-slate-900">{course?.price}</span>
//                   </p>
//                   <Clock className="w-3.5 h-3.5" /> {course?.Capacity}
//                 </div>

//                 <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
//                   <h2>Amenities</h2>
//                   <div className="flex items-center gap-1">
//                     {Array.isArray(course?.category) &&
//                       course.category.map((amenity, i) => (
//                         <Chip key={i} color="secondary" size="xs">
//                           {amenity}
//                         </Chip>
//                       ))}
//                   </div>
//                 </div>

//                 <div className="pt-6 mt-auto border-t border-slate-100 flex justify-between items-center">
//                   <span className="text-2xl font-black text-blue-600">
//                     ${course?.description}
//                   </span>
//                   <Link href={`/all_rooms/${course?._id}/edit`}>
//                     <Button>Edit</Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Listing;

import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { Clock } from "lucide-react";
import Link from "next/link";

const Listing = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!session?.user || !token) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/listing/${session.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();
  const courses = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Listings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {courses?.map((course) => (
          <div key={course?._id} className="border rounded-2xl overflow-hidden">
            <div className="group flex flex-col bg-white rounded-4xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative overflow-hidden aspect-video">
                <Image
                  alt="Room Image"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  src={
                    course?.image ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"
                  }
                  fill
                />
                <div className="absolute top-4 right-4">
                  <Chip
                    color="primary"
                    variant="solid"
                    className="font-bold shadow-lg shadow-blue-600/20"
                  >
                    {course?.floor}
                  </Chip>
                </div>
              </div>

              <div className="p-8 flex flex-col grow space-y-4">
                <div className="space-y-2">
                  <Link href={`/all_rooms/${course?._id}`}>
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                      {course?.name}
                    </h3>
                  </Link>

                  {/* ✅ FIX: description সঠিক জায়গায় */}
                  <p className="text-sm text-slate-500 font-medium">
                    {course?.description}
                  </p>

                  {/* ✅ FIX: Capacity সঠিক জায়গায় */}
                  <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {course?.Capacity}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
                  <h2>Amenities</h2>
                  <div className="flex flex-wrap items-center gap-1">
                    {Array.isArray(course?.category) &&
                      course.category.map((amenity, i) => (
                        <Chip key={i} color="secondary" size="sm">
                          {amenity}
                        </Chip>
                      ))}
                  </div>
                </div>

                <div className="pt-6 mt-auto border-t border-slate-100 flex justify-between items-center">
                  {/* ✅ FIX: price সঠিক জায়গায় */}
                  <span className="text-2xl font-black text-blue-600">
                    ${course?.price}
                  </span>
                  <Link href={`/all_rooms/${course?._id}/edit`}>
                    <Button>Edit</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listing;