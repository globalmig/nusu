"use client";

import Image from "next/image";

export default function LeakCards() {
  const cards = [
    {
      image: "/images/main/cus01.png",
      title: "누수 진단에 최적화된 전문 기술력",
      desc: "다년간의 현장 경험과 축적된 데이터로 누수 원인을 정확하게 찾는 정밀 진단 서비스를 제공합니다. 일반 점검으로 찾기 어려운 문제도 체계적인 방식으로 빠르고 확실하게 해결합니다.",
    },
    {
      image: "/images/main/cus02.png",
      title: "업계 최고의 누수 탐사 장비를 보유한 전문업체",
      desc: "총 15종 이상의 탐지 장비를 직접 운용하며, 배관 내시경 카메라·열화상 카메라·특수가스 탐지기·청음식 누수탐지기 등 현장 환경에 맞춰 가장 정확한 장비를 선택해 진단합니다.",
    },
    {
      image: "/images/main/cus03.png",
      title: "옥내누수 감면·보험 처리까지 도와드립니다",
      desc: "상하수도 요금 감면 신청부터 가정용배상책임보험 등 적용 가능한 부분까지 서류 준비를 도와드려 누수로 인한 부담을 최소화합니다.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden transition hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]">
            {/* 이미지 영역 */}
            <div className="relative w-full h-48">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>

            {/* 텍스트 */}
            <div className="p-6">
              <h3 className="text-lg  font-extrabold mb-2  text-gray-700">{item.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
