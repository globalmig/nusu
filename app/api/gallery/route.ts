// app/api/gallery/route.ts
import { supabaseAdmin } from "@/lib/supabaseServer";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// ✅ 기존 POST는 그대로 두고
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "파일이 필요합니다." }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${randomUUID()}.${ext}`;
    const filePath = `gallery/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const optimizedBuffer = await sharp(buffer).resize(1400, 1400, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 80 }).toBuffer();

    const { error: uploadError } = await supabaseAdmin.storage.from("gallery").upload(filePath, optimizedBuffer, {
      contentType: "image/jpeg",
      cacheControl: "31536000",
    });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: `이미지 업로드 중 오류가 발생했습니다. (${uploadError.message})` }, { status: 500 });
    }

    const { data, error: insertError } = await supabaseAdmin.from("gallery").insert({ image_path: filePath }).select().single();

    if (insertError) {
      console.error("DB insert error:", insertError);
      return NextResponse.json({ error: `DB 저장 중 오류가 발생했습니다. (${insertError.message})` }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage.from("gallery").getPublicUrl(filePath);

    return NextResponse.json(
      {
        item: {
          id: data.id,
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

// ✅ 여기부터 GET 추가
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1") || 1;
    const limit = Number(searchParams.get("limit") || "24") || 24;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabaseAdmin.from("gallery").select("id, image_path, created_at", { count: "exact" }).order("created_at", { ascending: false }).range(from, to);

    if (error) {
      console.error("DB select error:", error);
      return NextResponse.json({ error: `데이터 조회 중 오류가 발생했습니다. (${error.message})` }, { status: 500 });
    }

    const items =
      data?.map((row) => {
        const { data: urlData } = supabaseAdmin.storage.from("gallery").getPublicUrl(row.image_path);

        return {
          id: row.id,
          imageUrl: urlData.publicUrl,
          createdAt: row.created_at,
        };
      }) ?? [];

    return NextResponse.json({
      items,
      page,
      limit,
      total: count ?? null,
      totalPages: count ? Math.ceil(count / limit) : null,
    });
  } catch (e: any) {
    console.error("Unexpected error in GET /api/gallery:", e);
    return NextResponse.json({ error: `알 수 없는 오류가 발생했습니다. (${e?.message ?? e})` }, { status: 500 });
  }
}
