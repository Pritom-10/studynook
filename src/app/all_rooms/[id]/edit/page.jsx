// import EditPage from "@/Component/EditPage";
// import { getRoom } from "@/lib/rooms/data";

// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";

// const Editpager = async ({ params }) => {
//   const { id } = await params;

//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });
// console.log(session);
//   const token = session?.session?.token;
//   console.log("TOKEN:", token);

//   const rooms = await getRoom(id, token);
//   console.log(rooms);

//   return (
//     <div>
//       <h1>Edit {rooms.name}</h1>

//       <EditPage rooms={rooms} />
//     </div>
//   );
// };

// export default Editpager;


import EditPage from "@/Component/EditPage";
import { getRoom } from "@/lib/rooms/data";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const Editpager = async ({ params }) => {
  const { id } = await params;

  // ✅ FIX: token সঠিকভাবে নেওয়া হচ্ছে
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const rooms = await getRoom(id, token);

  if (!rooms) {
    return <div>Room not found</div>;
  }

  return (
    <div>
      <h1>Edit {rooms.name}</h1>
      <EditPage rooms={rooms} />
    </div>
  );
};

export default Editpager;