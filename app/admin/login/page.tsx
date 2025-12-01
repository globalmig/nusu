"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "로그인에 실패했습니다.");
        return;
      }

      router.push("/admin");
    } catch (e) {
      console.error(e);
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl md:text-3xl font-black text-[#364636] mb-2">관리자 페이지</h1>
        <p className="text-sm md:text-base text-gray-500 mb-10">관리자 페이지 접속을 위해 로그인을 해주세요.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#f7f7f7] rounded-full px-6 py-4 text-left">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              className="w-full bg-transparent outline-none text-sm md:text-base text-gray-800 placeholder:text-gray-400"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || password.length === 0}
            className="w-full rounded-full py-4 text-sm md:text-base font-semibold
                       bg-[#12a31b] text-white disabled:opacity-60 disabled:cursor-not-allowed
                       shadow-md shadow-green-500/30 transition-transform active:scale-[0.98]"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </main>
  );
}
