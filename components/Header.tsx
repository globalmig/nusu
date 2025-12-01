"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // 현재 경로
  const router = useRouter();

  const isMainPage = pathname === "/"; // 메인 페이지 여부

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 메뉴 구성
  const menuItems = [
    { label: "HOME", type: "link" as const, href: "/" },
    { label: "업무 영역", type: "scroll" as const, target: "work" },
    { label: "현장 사진", type: "link" as const, href: "/gallery" },
    { label: "Contact", type: "scroll" as const, target: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // 공통 클릭 핸들러 (scroll 타입용)
  const handleScrollMenuClick = (target: string) => {
    if (isMainPage) {
      // 메인 페이지에서는 스크롤만
      scrollToSection(target);
    } else {
      // 다른 페이지에서는 메인으로 이동 + 해시
      router.push(`/#${target}`);
    }
  };

  // 텍스트 색상 결정: 메인 페이지가 아니거나 스크롤된 경우 검은색
  const isDarkText = !isMainPage || isScrolled;
  // 배경 결정: 메인 페이지가 아니거나 스크롤된 경우 흰색 배경
  const hasWhiteBg = !isMainPage || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${hasWhiteBg ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/">
          <h3
            className={`text-sm md:text-base font-normal tracking-tight transition-colors  mb-0
          ${isDarkText ? "text-slate-900" : "text-white text-shadow"}`}
          >
            누수 탐지 전문 업체
          </h3>
          <h1
            className={`text-xl md:text-3xl font-bold tracking-tight transition-colors 
          ${isDarkText ? "text-slate-900" : "text-white text-shadow"}`}
          >
            누수탐지공사
          </h1>
        </Link>

        {/* PC 메뉴 */}
        <nav className="hidden md:flex gap-8 text-lg font-medium ">
          {menuItems.map((item) =>
            item.type === "link" ? (
              <Link key={item.label} href={item.href!} className={`${isDarkText ? "text-slate-900 hover:text-blue-600 " : "text-white text-shadow hover:text-blue-200"} transition-colors`}>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleScrollMenuClick(item.target!)}
                className={`${isDarkText ? "text-slate-900 hover:text-blue-600" : " text-shadow text-white hover:text-blue-200"} transition-colors`}
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          className={`md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border backdrop-blur-sm transition-colors
            ${isDarkText ? "border-slate-300 text-slate-900" : "border-white/40 text-white"}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <div className="space-y-1.5">
            <span className={`block w-5 h-[2px] ${isDarkText ? "bg-slate-900" : "bg-white"}`}></span>
            <span className={`block w-5 h-[2px] ${isDarkText ? "bg-slate-900" : "bg-white"}`}></span>
            <span className={`block w-5 h-[2px] ${isDarkText ? "bg-slate-900" : "bg-white"}`}></span>
          </div>
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {isMenuOpen && (
        <div className={`md:hidden w-full border-t ${hasWhiteBg ? "bg-white border-slate-200" : "bg-black/70 border-white/10"}`}>
          <nav className="flex flex-col px-4 py-3 space-y-2">
            {menuItems.map((item) =>
              item.type === "link" ? (
                <Link key={item.label} href={item.href!} onClick={() => setIsMenuOpen(false)} className={`${isDarkText ? "text-slate-900" : "text-white"} py-2`}>
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  className={`${isDarkText ? "text-slate-900" : "text-white"} text-left py-2`}
                  onClick={() => {
                    handleScrollMenuClick(item.target!);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
