"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // 추가!

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 메뉴 구성
  const menuItems = [
    { label: "HOME", type: "link", href: "/" },
    { label: "업무 영역", type: "scroll", target: "work" },
    { label: "현장 사진", type: "link", href: "/gallery" },
    { label: "Contact", type: "scroll", target: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* 로고 */}
        <h1
          className={`text-xl md:text-2xl font-bold tracking-tight transition-colors
          ${isScrolled ? "text-slate-900" : "text-white"}`}
        >
          누수탐지공사
        </h1>

        {/* PC 메뉴 */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {menuItems.map((item) =>
            item.type === "link" ? (
              <Link key={item.label} href={item.href!} className={`${isScrolled ? "text-slate-900 hover:text-blue-600" : "text-white hover:text-blue-200"} transition-colors`}>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.target!)}
                className={`${isScrolled ? "text-slate-900 hover:text-blue-600" : "text-white hover:text-blue-200"} transition-colors`}
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/40 backdrop-blur-sm text-white" onClick={() => setIsMenuOpen((prev) => !prev)}>
          <div className="space-y-1.5">
            <span className="block w-5 h-[2px] bg-white"></span>
            <span className="block w-5 h-[2px] bg-white"></span>
            <span className="block w-5 h-[2px] bg-white"></span>
          </div>
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {isMenuOpen && (
        <div className={`md:hidden w-full border-t ${isScrolled ? "bg-white border-slate-200" : "bg-black/70 border-white/10"}`}>
          <nav className="flex flex-col px-4 py-3 space-y-2">
            {menuItems.map((item) =>
              item.type === "link" ? (
                <Link key={item.label} href={item.href!} onClick={() => setIsMenuOpen(false)} className={`${isScrolled ? "text-slate-900" : "text-white"} py-2`}>
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  className={`${isScrolled ? "text-slate-900" : "text-white"} text-left py-2`}
                  onClick={() => {
                    scrollToSection(item.target!);
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
