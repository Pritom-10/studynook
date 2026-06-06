

export const fetchCoursess = async (params = {}) => {
  const query = new URLSearchParams();

  if (params.search) query.set("search", params.search);
  if (params.amenities) query.set("amenities", params.amenities);
  if (params.minPrice) query.set("minPrice", params.minPrice);
  if (params.maxPrice) query.set("maxPrice", params.maxPrice);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all_rooms?${query.toString()}`,
    { cache: "no-store" },
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

 