/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  // get the path name for access control
  const { pathname } = request.nextUrl;

  //   get the cookies to check the user role
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    //Protecting hybrid routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      //   return NextResponse.redirect(new URL("/login", request.url));
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : "/login",
          request.url
        )
      );
    }
  }

  // Token exists – decode it
  try {
    const decoded: any = jwtDecode(accessToken);
    const needPasswordChange = decoded?.needPasswordChange;

    // Enforce password change on all dashboard routes
    const isOnChangePasswordPage = pathname === "/dashboard/change-password";

    if (needPasswordChange && !isOnChangePasswordPage) {
      return NextResponse.redirect(
        new URL("/dashboard/change-password", request.url)
      );
    }

    // Prevent access to login/register if already authenticated
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/dashboard/${decoded.role.toLowerCase()}`, request.url)
      );
    }

    return NextResponse.next();
  } catch (err) {
    // If decoding fails, assume invalid token and redirect to login
    console.log(err);
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/login", "/register", "/listing/:page*", "/dashboard/:path*"],
};
