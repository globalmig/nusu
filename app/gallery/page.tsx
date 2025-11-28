import React from "react";

export default function page() {
  return (
    <section>
      <div className="relative z-10 flex flex-col justify-center items-center text-[#364636]">
        <h2 className="text-2xl md:text-3xl font-black mb-4 text-center">누수 탐지 공사 현장 사진</h2>
        <p className="text-center mb-8 md:mb-12">악성 누수도 경험 많은 전문가가 직접 해결합니다.</p>
      </div>
      <div className="gallery"></div>
    </section>
  );
}
