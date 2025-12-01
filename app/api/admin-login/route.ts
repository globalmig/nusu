import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 401 });
  }

  // 로그인 성공 → 쿠키 발급
  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8시간 유지
    path: "/",
  });

  return res;
}
