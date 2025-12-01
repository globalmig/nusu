// app/gallery/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryItem = {
  id: string;
  imageUrl: string;
  createdAt: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 🔥 모달 상태
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/gallery?page=${page}&limit=12`);
        const json = await res.json();

        if (!res.ok) {
          console.error(json.error);
          return;
        }

        setItems(json.items);

        //  다음 페이지 여부 판단
        if (json.items.length < 12) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [page]);

  // 🔥 ESC로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 mt-20">
      <div className="relative z-10 flex flex-col justify-center items-center text-[#364636]">
        <h2 className="text-2xl md:text-3xl font-black mb-4 text-center">사진 업데이트</h2>
        <p className="text-center md:mb-12">세로형 사진과 주요 사물이 가운데 배치된 사진을 권장 드립니다.</p>
      </div>

      {isLoading && <p className="text-center w-full min-h-96 mt-32 text-gray-500">불러오는 중...</p>}

      {!isLoading && items.length === 0 && <p className="text-gray-500 text-center w-full min-h-96 mt-32">등록된 사진이 없습니다.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2 cursor-pointer">
            <div className="relative w-full aspect-square overflow-hidden rounded-lg" onClick={() => setSelectedImage(item.imageUrl)}>
              <Image src={item.imageUrl} alt="갤러리 이미지" fill className="object-cover transition-transform duration-300 hover:scale-105" />
            </div>
          </div>
        ))}
      </div>

      {/* 페이지 버튼 */}
      <div className="flex justify-center gap-4 mt-8">
        <button className="px-3 py-1 border rounded disabled:opacity-40" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          이전
        </button>
        <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => p + 1)}>
          다음
        </button>
      </div>

      {/* 🔥 이미지 모달 */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()} // 부모 클릭 방지
          >
            {/* 닫기 버튼 */}
            <button onClick={() => setSelectedImage(null)} className="absolute -top-10 right-0 text-white text-3xl font-bold">
              ×
            </button>

            {/* 큰 이미지 */}
            <div className="relative w-full h-[70vh] max-h-[900px] rounded-lg overflow-hidden">
              <Image src={selectedImage} alt="확대 이미지" fill className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
