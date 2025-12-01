// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // 쿠키 삭제
  res.cookies.delete("admin_auth");

  return res;
}
