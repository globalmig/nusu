// app/api/gallery/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = params;

  try {
    // 1) 우선 DB에서 이미지 경로 조회
    const { data, error: selectError } = await supabaseAdmin.from("gallery").select("image_path").eq("id", id).single();

    if (selectError || !data) {
      console.error("이미지 경로 조회 실패:", selectError);
      return NextResponse.json({ error: "해당 이미지를 찾을 수 없습니다." }, { status: 404 });
    }

    const imagePath = data.image_path as string;

    // 2) Storage에서 실제 파일 삭제
    const { error: storageError } = await supabaseAdmin.storage.from("gallery").remove([imagePath]);

    if (storageError) {
      console.error("Storage 삭제 오류:", storageError);
      return NextResponse.json({ error: `이미지 파일 삭제 중 오류가 발생했습니다. (${storageError.message})` }, { status: 500 });
    }

    // 3) DB 레코드 삭제
    const { error: deleteError } = await supabaseAdmin.from("gallery").delete().eq("id", id);

    if (deleteError) {
      console.error("DB 삭제 오류:", deleteError);
      return NextResponse.json({ error: `DB 삭제 중 오류가 발생했습니다. (${deleteError.message})` }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    console.error("Unexpected error in DELETE /api/gallery/[id]:", e);
    return NextResponse.json({ error: `알 수 없는 오류가 발생했습니다. (${e?.message ?? e})` }, { status: 500 });
  }
}
