import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#243124] py-20 relative text-white text-center">
      <h3>누수 탐지 공사</h3>

      <p className="font-light text-sm ">대표: 정현</p>

      <Link href="/admin/login" className="font-light text-sm">
        관리자페이지
      </Link>
      <p className="font-light text-sm ">사업자번호 :229-08-02323 ｜ 주소 : 대전광역시 서구 월평서로6번길 49-10, 302호(월평동)</p>
      <p className="font-light text-sm ">전화 : 010-8631-2545 ｜이메일 : op2966@naver.com</p>
    </footer>
  );
}
