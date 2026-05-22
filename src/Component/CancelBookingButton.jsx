"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const CancelBookingButton = ({ bookingId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      // ✅ token নাও
      const { data: jwtData } = await authClient.token();
      const token = jwtData?.token;

      if (!token) {
        toast.error("Authentication failed.");
        return;
      }

      // ✅ PATCH /bookings/:id/cancel
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

      // ✅ Success
      toast.success("Booking cancelled.");
      setOpen(false);
      router.refresh(); // server component re-fetch → list update
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <Button
        color="danger"
        variant="light"
        size="sm"
        onPress={() => setOpen(true)}
      >
        Cancel
      </Button>

      {/* Modal */}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel Booking?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-slate-600">
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button
                slot="close"
                variant="tertiary"
                onPress={() => setOpen(false)}
              >
                Keep Booking
              </Button>
              <Button
                slot="close"
                color="danger"
                className="font-bold"
                onPress={handleCancel}
                isLoading={loading}
              >
                Yes, Cancel
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default CancelBookingButton;
