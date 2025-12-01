// components/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/"); // 메인 화면으로 변경
        router.refresh();
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <button onClick={handleLogout} className="mb-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
      로그아웃
    </button>
  );
}
