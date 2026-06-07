"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
};

export const addCourse = async (formData) => {
  const token = await getToken();

  if (!token) {
    redirect("/login");
  }


  const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: { Cookie: `token=${token}` },
  });
  const user = await meRes.json();

  const modifiedData = {
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    floor: formData.get("floor"),
    hourlyRate: formData.get("price"),
    seatCapacity: formData.get("Capacity"),
    amenities: formData.getAll("amenities"),
    userId: user?._id?.toString(),
    userName: user?.name,
    userEmail: user?.email,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`, 
    },
    body: JSON.stringify(modifiedData),
  });

  if (!res.ok) return null;

  const data = await res.json();

  if (data?.insertedId) {
    redirect("/listing");
  }

  return data;
};

export const updateCourse = async (roomId, formData) => {
  const token = await getToken();

  if (!token) {
    redirect("/login");
  }

  const updatedData = {
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    floor: formData.get("floor"),
    hourlyRate: formData.get("price"),
    seatCapacity: formData.get("Capacity"),
    amenities: formData.getAll("amenities"),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all_rooms/${roomId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(updatedData),
    },
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data;
};

export const deleteEnrollment = async (id) => {
  const token = await getToken();

  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-room/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `token=${token}`,
    },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data;
};
