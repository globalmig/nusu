// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminAuth = request.cookies.get("admin_auth");

  // /admin/login은 예외 처리 (로그인 페이지는 누구나 접근 가능)
  if (request.nextUrl.pathname === "/admin/login") {
    // 이미 로그인되어 있으면 admin으로
    if (adminAuth?.value === "true") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // 로그인 안 되어 있으면 그냥 로그인 페이지 보여주기
    return NextResponse.next();
  }

  // admin 페이지 접근 시 쿠키 확인 (/admin/login 제외)
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!adminAuth || adminAuth.value !== "true") {
      // 로그인 안 되어 있으면 로그인 페이지로
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
