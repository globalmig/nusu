"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";

type GalleryItem = {
  id: string;
  imageUrl: string; // 서버에서 내려주는 이미지 URL(또는 publicUrl)
  // 필요하면 추가 필드들 ...
};

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 최초 로드 시 갤러리 불러오기
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery?page=1&limit=100");
        const json = await res.json();
        if (!res.ok) {
          console.error(json.error);
          return;
        }
        setItems(json.items ?? []);
      } catch (e) {
        console.error(e);
      }
    };

    fetchGallery();
  }, []);

  // 여러 파일 업로드 처리
  const handleFiles = async (files: File[]) => {
    if (!files.length) return;
    setIsUploading(true);

    try {
      for (const file of files) {
        // (선택) 파일 용량 제한 – 예: 5MB
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          alert("파일 용량이 너무 큽니다. 5MB 이하로 줄여서 업로드해주세요.");
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/gallery", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          // JSON이 아닐 수도 있어서 먼저 text로 받기
          const errorText = await res.text();
          console.error("업로드 에러:", res.status, errorText);

          if (res.status === 413) {
            alert("파일 용량이 너무 큽니다. 이미지를 조금 줄여서 다시 시도해주세요.");
          } else {
            alert("업로드 실패: " + (errorText || "알 수 없는 오류"));
          }
          continue;
        }

        const json = await res.json();

        // 서버에서 반환된 새 아이템 추가
        setItems((prev) => [...prev, json.item]);
      }
    } catch (e) {
      console.error(e);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  // 드롭존 클릭 → 파일 선택
  const handleClickDropzone = () => {
    fileInputRef.current?.click();
  };

  // X 버튼 클릭 → 삭제
  const handleDelete = async (id: string) => {
    if (!confirm("해당 사진을 삭제하시겠습니까?")) return;

    try {
      // 백엔드에 DELETE 구현했다면 여기서 호출
      // 예: DELETE /api/gallery/[id]
      await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 순서 변경 (드래그&드롭)
  const handleDragStart = (id: string) => () => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => () => {
    if (!draggedId || draggedId === targetId) return;

    setItems((prev) => {
      const fromIndex = prev.findIndex((item) => item.id === draggedId);
      const toIndex = prev.findIndex((item) => item.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;

      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);

      return updated;
    });

    setDraggedId(null);

    // TODO: 필요하면 여기서 순서(order)를 서버에 PATCH로 저장
  };

  return (
    <section className="max-w-4xl mx-auto py-10 mt-24">
      {/* 상단 타이틀 영역 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">사진 업데이트</h2>
        <p className="text-sm text-gray-500">세로형 사진과 주요 사물이 가운데 배치된 사진을 권장 드립니다.</p>
      </div>
      <LogoutButton />

      {/* 드래그&드롭 업로드 영역 */}
      <div
        className={`flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed px-6 py-12 cursor-pointer transition
        ${isDragOver ? "border-emerald-500 bg-emerald-50" : "border-gray-300 bg-gray-50"}`}
        onClick={handleClickDropzone}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"));
          handleFiles(files);
        }}
      >
        <div className="flex flex-col items-center gap-3">
          {/* 간단한 아이콘 (SVG) */}
          <div className="w-12 h-20 flex items-center justify-center rounded-full bg-white shadow-sm">
            {/* <span className="text-2xl">⬆️</span> */}
            <Image src="/images/manager/file.png" alt="Upload Icon" width={32} height={32} />
          </div>
          <p className="text-sm text-gray-600">
            파일을 드래그하여 놓거나 <span className="font-semibold">클릭</span>해서 업로드하세요.
          </p>
          <p className="text-xs text-gray-400">여러 장의 이미지를 한 번에 선택할 수 있습니다.</p>
          {isUploading && <p className="mt-2 text-xs text-emerald-600">업로드 중입니다...</p>}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []).filter((file) => file.type.startsWith("image/"));
            handleFiles(files);
            e.target.value = "";
          }}
        />
      </div>

      {/* 업로드된 이미지 리스트 */}
      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-gray-400 text-center">아직 업로드된 사진이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`relative overflow-hidden rounded-lg border bg-gray-100 aspect-[3/4] ${draggedId === item.id ? "opacity-70 ring-2 ring-emerald-500" : ""}`}
                draggable
                onDragStart={handleDragStart(item.id)}
                onDragOver={handleDragOver}
                onDrop={handleDrop(item.id)}
              >
                {/* 이미지 */}
                <img src={item.imageUrl} alt="gallery image" className="w-full h-full object-cover" />

                {/* 삭제 버튼(X) */}
                <button type="button" onClick={() => handleDelete(item.id)} className="absolute right-1 top-1 w-7 h-7 flex items-center justify-center rounded-full bg-black/70 text-white text-sm">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
