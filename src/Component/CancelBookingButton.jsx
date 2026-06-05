"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const CancelBookingButton = ({ bookingId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      if (!token) {
        toast.error("Authentication failed.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to cancel booking.");
        return;
      }

      toast.success("Booking cancelled.");
      setIsOpen(false);
      setTimeout(() => router.refresh(), 500);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        color="danger"
        variant="flat"
        size="sm"
        className="font-bold"
        onPress={() => setIsOpen(true)}
      >
        Cancel
      </Button>

      {/* ✅ Custom modal — HeroUI Modal ছাড়া */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 space-y-4">
            <h2 className="text-lg font-black text-slate-900">
              Cancel Booking?
            </h2>
            <p className="text-slate-600 text-sm">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <Button variant="flat" onPress={() => setIsOpen(false)}>
                Keep Booking
              </Button>
              <Button
                color="danger"
                className="font-bold"
                onPress={handleCancel}
                isLoading={loading}
              >
                Yes, Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CancelBookingButton;
