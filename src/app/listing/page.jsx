import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { Clock, Plus } from "lucide-react";
import Link from "next/link";
import DeleteRoomButton from "@/Component/DeleteRoomButton";

const Listing = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }


  const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!meRes.ok) redirect("/login");

  const user = await meRes.json();
  const userId = user?._id?.toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/listing/${userId}`,
    {
      headers: { Cookie: `token=${token}` },
      cache: "no-store",
    },
  );

  const data = await res.json();
  const courses = Array.isArray(data) ? data : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Link href="/all_rooms/add">
          <Button
            color="primary"
            className="font-bold rounded-full px-6 shadow-lg shadow-blue-600/20"
            startContent={<Plus className="w-4 h-4" />}
          >
            Add Room
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Plus className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            No listings yet
          </h2>
          <p className="text-slate-500 text-sm max-w-xs mb-6">
            You have not added any rooms yet. Start by adding your first study
            room!
          </p>
          <Link href="/all_rooms/add">
            <Button
              color="primary"
              className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20"
              startContent={<Plus className="w-4 h-4" />}
            >
              Add Your First Room
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course?._id}
              className="border rounded-2xl overflow-hidden"
            >
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
                      floor {course?.floor}
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
                    <p className="text-sm text-slate-500 font-medium">
                      {course?.description}
                    </p>
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {course?.seatCapacity}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
                    <h2>Amenities</h2>
                    <div className="flex flex-wrap items-center gap-1">
                      {Array.isArray(course?.amenities) &&
                        course.amenities.map((amenity, i) => (
                          <Chip key={i} color="secondary" size="sm">
                            {amenity}
                          </Chip>
                        ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-auto border-t border-slate-100 flex justify-between items-center">
                    <span className="text-2xl font-black text-blue-600">
                      ${course?.hourlyRate}
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/all_rooms/${course?._id}/edit`}>
                        <Button color="secondary" className="font-bold">
                          Edit
                        </Button>
                      </Link>
                      <DeleteRoomButton roomId={course?._id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listing;
