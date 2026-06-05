import RoomCards from "@/Component/RoomCards";
import CoursesHeader from "@/Component/CoursesHeader";
import { fetchCoursess } from "@/lib/rooms/data";
import { BookOpen } from "lucide-react";
import RefineSidebar from "@/Component/RefineSidebar";
import { Suspense } from "react";

const AllRoomPage = async ({ searchParams }) => {
  const sParams = await searchParams;

  const courses = await fetchCoursess({
    search: sParams?.search || "",
    amenities: sParams?.amenities || "",
    minPrice: sParams?.minPrice || "",
    maxPrice: sParams?.maxPrice || "",
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <CoursesHeader />

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-blue-600" />
          All Rooms
        </h2>

        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <div className="w-72 shrink-0">
            <Suspense fallback={null}>
              <RefineSidebar />
            </Suspense>
          </div>

          {/* Room Grid */}
          <div className="flex-1">
            {courses.length === 0 ? (
              <div className="p-12 text-center bg-white border rounded-2xl">
                <p className="text-slate-500">
                  No rooms found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <RoomCards key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllRoomPage;
