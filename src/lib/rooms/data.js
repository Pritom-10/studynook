// export const fetchCoursess = async (searchTerm='') => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_rooms?search=${searchTerm}`);
//   const data = await res.json();
//   return data || [];
// };
// export const getRoom = async (id) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/all_rooms/${id}`,
//     {
//       credentials: "include",
//     },
//   );

//   return res.json();
// };
// export const fetchFeaturedCoursess = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
//   const data = await res.json();
//   return data || [];
// };


export const fetchCoursess = async (searchTerm = "") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all_rooms?search=${searchTerm}`,
  );
  const data = await res.json();
  return data || [];
};

// ✅ FIX: token parameter যোগ করা হয়েছে
export const getRoom = async (id, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all_rooms/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) return null;
  return res.json();
};

export const fetchFeaturedCoursess = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
  const data = await res.json();
  return data || [];
};

 