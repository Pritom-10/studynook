"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const addCourse = async (formData) => {
  
  
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const modifiedData = {
      name: formData.get("name"),
      description: formData.get("description"),
      image: formData.get("image"),
      floor: formData.get("floor"),
      hourlyRate: formData.get("price"),
      seatCapacity: formData.get("Capacity"),
      amenities: formData.getAll("amenities"),
      userId: session?.user?.id,
      userName: session?.user?.name,
      userEmail: session?.user?.email,
  };


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

// ✅ NEW: updateCourse action
export const updateCourse = async (roomId, formData) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    },
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data;
};

export const deleteEnrollment = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-room/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data;
};