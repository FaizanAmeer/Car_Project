// import Auth from "dd(@/Utility/auth)"; //when i add this class
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request, response) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  if (!token && path !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path === "/add_car_details" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/add_car_details", "/"],
};


