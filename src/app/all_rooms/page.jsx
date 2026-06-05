import RoomCards from "@/Component/RoomCards";
import CoursesHeader from "@/Component/CoursesHeader";
import { fetchCoursess } from "@/lib/rooms/data";
import { BookOpen } from "lucide-react";
import RefineSidebar from "@/Component/RefineSidebar";
import { Suspense } from "react";
import Pagination from "@/Component/Pagination";


const AllRoomPage = async ({ searchParams }) => {
  const sParams = await searchParams;
  const page = parseInt(sParams?.page || "1");
  const ITEMS_PER_PAGE = 6;

  const courses = await fetchCoursess({
    search: sParams?.search || "",
    amenities: sParams?.amenities || "",
    minPrice: sParams?.minPrice || "",
    maxPrice: sParams?.maxPrice || "",
  });

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const paginated = courses.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <CoursesHeader />
      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-blue-600" />
          All Rooms
        </h2>
        <div className="flex gap-8 items-start">
          <div className="w-72 shrink-0">
            <Suspense fallback={null}>
              <RefineSidebar />
            </Suspense>
          </div>
          <div className="flex-1">
            {paginated.length === 0 ? (
              <div className="p-12 text-center bg-white border rounded-2xl">
                <p className="text-slate-500">No rooms found.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map((course) => (
                    <RoomCards key={course._id} course={course} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination currentPage={page} totalPages={totalPages} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
 export default AllRoomPage;