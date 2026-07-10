import { Chip } from "@heroui/react";
import { Clock, Users, MapPin, DollarSign } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import BookNowButton from "@/Component/BookNowButton";

const fetchSingleCourse = async (id, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all_rooms/${id}`,
    {
      headers: {
        ...(token && { Cookie: `token=${token}` }),
      },
      cache: "no-store",
    },
  );
  const data = await res.json();
  return data || {};
};

export default async function CourseDetails({ params }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  const course = await fetchSingleCourse(id, token);

  const {
    image,
    name,
    description,
    floor,
    seatCapacity,
    hourlyRate,
    amenities = [],
  } = course;

  const featuredItems = [
    { icon: MapPin, label: floor || "N/A" },
    { icon: Users, label: seatCapacity || "N/A" },
    { icon: DollarSign, label: hourlyRate ? `$${hourlyRate}/hr` : "N/A" },
    { icon: Clock, label: "Hourly Booking" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left */}
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

          {Array.isArray(amenities) && amenities.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-700">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {amenities.map((item, i) => (
                  <Chip key={i} color="secondary" variant="flat">
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-2xl space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Hourly Rate
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-blue-600">
                  ${hourlyRate || "N/A"}
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
                <span className="font-bold text-slate-900">{seatCapacity}</span>
              </div>
              <div className="w-full h-px bg-slate-100"></div>
            </div>

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
