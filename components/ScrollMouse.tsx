"use client";
import React from "react";

interface ScrollMouseProps {
  className?: string;
}

const ScrollMouse: React.FC<ScrollMouseProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* 마우스 모양 */}
      <div className="relative w-7 h-11 border-2 border-white rounded-full opacity-75">
        {/* 스크롤 휠 애니메이션 */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-white rounded-full animate-scroll" />
      </div>

      {/* 아래 화살표 (선택사항) */}
      <svg className="w-5 h-5 text-white opacity-75 animate-bounce" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>

      <style jsx>{`
        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(8px);
          }
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollMouse;
