import Image from "next/image";
import { Button, Chip } from "@heroui/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import CancelBookingButton from "@/Component/CancelBookingButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  // user info নিন
  const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!meRes.ok) redirect("/login");

  const user = await meRes.json();
  const userId = user?._id?.toString();

  // bookings নিন
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings/${userId}`,
    {
      headers: { Cookie: `token=${token}` },
      cache: "no-store",
    },
  );

  let bookings = [];
  try {
    const parsed = await res.json();
    bookings = Array.isArray(parsed) ? parsed : [];
  } catch {
    bookings = [];
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Card */}
        <div className="w-full md:w-1/4">
          <div className="p-6 bg-white border rounded-2xl">
            <Image
              src={
                user?.photoURL ||
                "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
              }
              alt="profile"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
            <h2 className="text-xl font-bold mt-4">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        {/* Bookings */}
        <div className="w-full md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">My Booking Rooms</h1>

          {bookings.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 border rounded-2xl">
              <p className="mb-4">No rooms booked yet</p>
              <Link href="/all_rooms">
                <Button>Browse Rooms</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking?._id}
                  className="flex gap-4 p-4 bg-white border rounded-xl"
                >
                  <Image
                    src={
                      booking?.roomImage ||
                      "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=400"
                    }
                    alt="room"
                    width={120}
                    height={90}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex flex-col grow justify-between">
                    <div>
                      <h3 className="font-bold">{booking?.roomName}</h3>
                      <p className="text-sm text-slate-500">
                        {booking?.bookingDate
                          ? new Date(booking.bookingDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )
                          : "Date not set"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {booking?.startTime} — {booking?.endTime}
                      </p>
                      <p className="text-sm font-bold text-blue-600">
                        ${booking?.totalCost}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <Chip
                        color={
                          booking?.status === "cancelled" ? "danger" : "success"
                        }
                        size="sm"
                      >
                        {booking?.status === "cancelled"
                          ? "Cancelled"
                          : "Active"}
                      </Chip>
                      {booking?.status !== "cancelled" && (
                        <CancelBookingButton
                          bookingId={booking?._id?.toString()}
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
