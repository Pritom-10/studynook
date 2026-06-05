import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CancelBookingButton from "@/Component/CancelBookingButton";

export default async function DashboardPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || !token) {
    redirect("/login");
  }



  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/add-room/${session?.user?.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  console.log("STATUS:", res.status);

  const text = await res.text();

  let enrollments = [];

  try {
    const parsed = JSON.parse(text);
    enrollments = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log("JSON Parse Error");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/4">
          <div className="p-6 bg-white border rounded-2xl">
            <Image
              src={session?.user?.image}
              alt="profile"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full"
            />

            <h2 className="text-xl font-bold mt-4">{session?.user?.name}</h2>
            <p className="text-sm text-slate-500">{session?.user?.email}</p>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">My Booking Rooms</h1>

          {enrollments?.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 border rounded-2xl">
              <p className="mb-4">No rooms booked yet</p>

              <Link href="/all_rooms">
                <Button>Browse Rooms</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments?.map((enrollment) => (
                <div
                  key={enrollment?._id}
                  className="flex gap-4 p-4 bg-white border rounded-xl"
                >
                  <Image
                    src={
                      enrollment?.roomImage ||
                      "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=400"
                    }
                    alt="room"
                    width={120}
                    height={90}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex flex-col grow justify-between">
                    <div>
                      <h3 className="font-bold">{enrollment?.roomName}</h3>
                      <p className="text-sm text-slate-500">
                        {enrollment?.bookingDate
                          ? new Date(enrollment.bookingDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "Date not set"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Chip
                        color={
                          enrollment?.status === "cancelled"
                            ? "danger"
                            : "success"
                        }
                        size="sm"
                      >
                        {enrollment?.status === "cancelled"
                          ? "Cancelled"
                          : "Active"}
                      </Chip>
                      {enrollment?.status !== "cancelled" && (
                        <CancelBookingButton
                          bookingId={enrollment?._id?.toString()}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const NotFound = () => {
  return (
    <div className="p-12 text-center bg-slate-50 border rounded-2xl">
      <p className="mb-4">No rooms booked yet</p>

      <Link href="/all_rooms">
        <Button>Browse Courses</Button>
      </Link>
    </div>
  );
};
