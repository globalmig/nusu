"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["HOME", "업무 영역", "현장 사진", "Contact"];

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* 로고 */}
        <h1
          className={`
            text-xl md:text-2xl font-bold tracking-tight transition-colors
            ${isScrolled ? "text-slate-900" : "text-white"}
          `}
        >
          누수탐지공사
        </h1>

        {/* PC 메뉴 */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`
                transition-colors
                ${isScrolled ? "text-slate-900 hover:text-blue-600" : "text-white hover:text-blue-200"}
              `}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/40 backdrop-blur-sm
                     transition-colors
                     text-white"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">메뉴 열기</span>
          <div className="space-y-1.5">
            <span className="block w-5 h-[2px] bg-white"></span>
            <span className="block w-5 h-[2px] bg-white"></span>
            <span className="block w-5 h-[2px] bg-white"></span>
          </div>
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div
          className={`
            md:hidden w-full border-t
            ${isScrolled ? "bg-white border-slate-200" : "bg-black/70 border-white/10"}
          `}
        >
          <nav className="flex flex-col px-4 py-3 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item}
                className={`
                  text-left text-sm py-2
                  ${isScrolled ? "text-slate-900" : "text-white"}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
