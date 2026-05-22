"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import BookingModal from "./BookingModal";

export default function BookNowButton({ course }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        color="primary"
        size="lg"
        className="w-full font-bold shadow-lg mt-4"
        onPress={() => setOpen(true)}
      >
        Book Now
      </Button>

      {open && <BookingModal course={course} onClose={() => setOpen(false)} />}
    </>
  );
}
