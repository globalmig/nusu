"use client";
import React from "react";

export default function Contact01() {
  const phoneNumber = "010-8631-2545";

  // 클릭 핸들러
  const handleClick = (e: React.MouseEvent) => {
    const isMobile = /Android|iPhone|iPad|iPod|Samsung/i.test(navigator.userAgent);

    if (isMobile) {
      // 모바일 → 자동 전화 연결 유지
      return;
    }

    // PC → 전화 연결 안 되니까 복사 + 알럿
    e.preventDefault(); // tel 동작 막기
    navigator.clipboard.writeText(phoneNumber);
    alert(`전화번호가 복사되었습니다: ${phoneNumber}`);
  };

  return (
    <section
      id="contact"
      className="w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center py-20 text-white"
      style={{ backgroundImage: "url('/images/main/contact02.png')" }}
    >
      <h3>여수 · 순천 · 광양</h3>
      <h2 className="md:text-5xl">누수 전문 업체</h2>

      {/* 전화번호 표시 */}
      <a href={`tel:${phoneNumber}`} onClick={handleClick} className="mt-4 inline-block text-[#81D981] font-extrabold text-3xl">
        {phoneNumber}
      </a>

      {/* 버튼 */}
      <a href={`tel:${phoneNumber}`} onClick={handleClick} className="mt-4 inline-block bg-[#0E7D15] text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
        문의하기
      </a>
    </section>
  );
}
