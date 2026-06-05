


import EditPage from "@/Component/EditPage";
import { getRoom } from "@/lib/rooms/data";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const Editpager = async ({ params }) => {
  const { id } = await params;


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