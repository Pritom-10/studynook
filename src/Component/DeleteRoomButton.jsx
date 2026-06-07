"use client";
import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteRoomButton = ({ roomId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/all_rooms/${roomId}`,
        {
          method: "DELETE",
          credentials: "include", // ← cookie পাঠাবে
        },
      );

      if (res.ok) {
        toast.success("Room deleted successfully!");
        router.refresh();
      } else {
        toast.error("Failed to delete room.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color="danger"
      variant="flat"
      isLoading={loading}
      onPress={handleDelete}
      startContent={!loading && <Trash2 className="w-4 h-4" />}
    >
      Delete
    </Button>
  );
};

export default DeleteRoomButton;
