import { NextResponse } from "next/server";
import { auth } from "./auth";
import { headers } from "next/headers";


export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session && !session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
 }
}
export const config = {
  matcher: '/all_rooms/:id',
};
