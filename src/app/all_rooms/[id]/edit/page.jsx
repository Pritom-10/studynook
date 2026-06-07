import EditPage from "@/Component/EditPage";
import { getRoom } from "@/lib/rooms/data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Editpager = async ({ params }) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

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
