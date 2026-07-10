import Image from "next/image";
import { Chip, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import CancelBookingButton from "@/Component/CancelBookingButton";

function isFutureDate(dateStr) {
  if (!dateStr) return false;
  const bookingDate = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return bookingDate >= today;
}

function formatDate(dateStr) {
  if (!dateStr) return "Date not set";
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Date not set";
  }
}

export default async function MyBookingsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!meRes.ok) redirect("/login");

  const user = await meRes.json();
  const userId = user?._id?.toString();

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
    bookings = Array.isArray(parsed)
      ? parsed.map((b) => ({ ...b, _id: b._id?.toString() || b._id }))
      : [];
  } catch {
    bookings = [];
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
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

        {/* Main */}
        <div className="w-full md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

          {bookings.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 border rounded-2xl">
              <p className="mb-4 text-slate-500">You have no bookings yet.</p>
              <Link href="/all_rooms">
                <Button color="primary">Browse Rooms</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const canCancel =
                  booking?.status === "confirmed" &&
                  isFutureDate(booking?.bookingDate);

                return (
                  <div
                    key={booking?._id}
                    className="flex gap-4 p-4 bg-white border rounded-xl items-start"
                  >
                    <div className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={
                          booking?.roomImage ||
                          "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=400"
                        }
                        alt={booking?.roomName || "room"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col grow justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-lg">
                          {booking?.roomName || "Unknown Room"}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          📅 {formatDate(booking?.bookingDate)}
                        </p>
                        <p className="text-sm text-slate-500">
                          🕐 {booking?.startTime} — {booking?.endTime}
                        </p>
                        <p className="text-sm font-semibold text-blue-600 mt-1">
                          💰 Total: ${booking?.totalCost}
                        </p>
                        {booking?.specialNote && (
                          <p className="text-xs text-slate-400 mt-1 italic">
                            Note: {booking.specialNote}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <Chip
                          color={
                            booking?.status === "cancelled"
                              ? "danger"
                              : "success"
                          }
                          variant="flat"
                          size="sm"
                        >
                          {booking?.status === "cancelled"
                            ? "Cancelled"
                            : "Confirmed"}
                        </Chip>
                        {canCancel && (
                          <CancelBookingButton
                            bookingId={booking?._id?.toString()}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
