"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import BookingModal from "./BookingModal";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BookNowButton({ course }) {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const isOwner =
    session?.user?.id && course?.userId && session.user.id === course.userId;

  if (isPending) {
    return (
      <div className="w-full h-14 bg-slate-100 rounded-2xl animate-pulse mt-4" />
    );
  }

  return (
    <>
      <div className="space-y-3 mt-4">
        {!isOwner && (
          <>
            {session ? (
              <Button
                color="primary"
                size="lg"
                className="w-full font-bold shadow-lg"
                onPress={() => setOpen(true)}
              >
                Book Now
              </Button>
            ) : (
              <Link href="/login" className="w-full">
                <Button
                  color="primary"
                  size="lg"
                  variant="flat"
                  className="w-full font-bold"
                >
                  Login to Book
                </Button>
              </Link>
            )}
          </>
        )}

       
        {isOwner && (
          <div className="space-y-3">
            <p className="text-xs text-center font-bold text-slate-400 uppercase tracking-widest">
              You own this room
            </p>
            <Link href={`/all_rooms/${course._id}/edit`} className="w-full">
              <Button
                variant="flat"
                size="lg"
                className="w-full font-bold rounded-2xl"
              >
                Edit Room
              </Button>
            </Link>
            <DeleteButton courseId={course._id} />
          </div>
        )}
      </div>

      {open && <BookingModal course={course} onClose={() => setOpen(false)} />}
    </>
  );
}


function DeleteButton({ courseId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    setLoading(true);

    try {
      const { data: jwtData } = await import("@/lib/auth-client").then((m) =>
        m.authClient.token(),
      );
      const token = jwtData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/all_rooms/${courseId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) {
        router.push("/listing");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color="danger"
      variant="flat"
      size="lg"
      className="w-full font-bold rounded-2xl"
      onPress={handleDelete}
      isLoading={loading}
    >
      Delete Room
    </Button>
  );
}
