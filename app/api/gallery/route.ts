// app/api/gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { randomUUID } from "crypto";

// ✅ 갤러리 목록 조회 (GET)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "12");

    const safePage = isNaN(page) || page < 1 ? 1 : page;
    const safeLimit = isNaN(limit) || limit < 1 ? 12 : limit;

    const from = (safePage - 1) * safeLimit;
    const to = from + safeLimit - 1;

    // const { data, error } = await supabaseAdmin.from("gallery").select("id, title, description, image_path, created_at").order("created_at", { ascending: false }).range(from, to);

    const { data, error } = await supabaseAdmin.from("gallery").select("*").order("created_at", { ascending: false }).range(from, to);

    if (error) {
      console.error("DB select error:", error);
      return NextResponse.json({ error: `DB 조회 중 오류가 발생했습니다. (${error.message})` }, { status: 500 });
    }

    // ✅ Supabase public URL로 변환
    const items = data.map((row) => {
      const { data: urlData } = supabaseAdmin.storage.from("gallery").getPublicUrl(row.image_path);

      return {
        id: row.id,
        // title: row.title,
        // description: row.description,
        imageUrl: urlData.publicUrl, // ← 프론트에서 쓰는 필드명
        createdAt: row.created_at,
      };
    });

    return NextResponse.json({ items }, { status: 200 });
  } catch (e: any) {
    console.error("Unexpected error in GET /api/gallery:", e);
    return NextResponse.json({ error: `알 수 없는 오류가 발생했습니다. (${e?.message ?? e})` }, { status: 500 });
  }
}

// ✅ 업로드 (POST) – 너가 쓰던 코드 + 약간 보완
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    // const title = formData.get("title") as string | null;
    // const description = formData.get("description") as string | null;

    if (!file) {
      return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
    }

    // 확장자 & 파일명
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${randomUUID()}.${ext}`;
    const filePath = `gallery/${fileName}`;

    // File → Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1) 스토리지 업로드
    const { error: uploadError } = await supabaseAdmin.storage
      .from("gallery") // 버킷 이름
      .upload(filePath, buffer, {
        contentType: file.type || "image/jpeg",
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: `이미지 업로드 중 오류가 발생했습니다. (${uploadError.message})` }, { status: 500 });
    }

    // 2) DB 저장
    const { data, error: insertError } = await supabaseAdmin
      .from("gallery")
      .insert({
        image_path: filePath,
        // title,
        // description,
      })
      .select()
      .single();

    if (insertError) {
      console.error("DB insert error:", insertError);
      return NextResponse.json({ error: `DB 저장 중 오류가 발생했습니다. (${insertError.message})` }, { status: 500 });
    }

    // 3) 응답에도 이미지 URL 포함 (선택)
    const { data: urlData } = supabaseAdmin.storage.from("gallery").getPublicUrl(filePath);

    return NextResponse.json(
      {
        item: {
          id: data.id,
          //   title: data.title,
          //   description: data.description,
          imageUrl: urlData.publicUrl,
          createdAt: data.created_at,
        },
      },
      { status: 201 }
    );
  } catch (e: any) {
    console.error("Unexpected error in POST /api/gallery:", e);
    return NextResponse.json({ error: `알 수 없는 오류가 발생했습니다. (${e?.message ?? e})` }, { status: 500 });
  }
}
