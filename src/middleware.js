// import Auth from "dd(@/Utility/auth)"; //when i add this class
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request, response) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log(path);
  if (path == "/" && token)
    return NextResponse.redirect(new URL("/add_car_details", request.url));
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/add_car_details", "/"],
};
