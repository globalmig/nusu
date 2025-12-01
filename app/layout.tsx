import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  // ✅ 실제 도메인으로 변경!
  metadataBase: new URL("https://www.nusudetect.com"),
  title: {
    default: "누수탐지공사 | 여수·순천·광양 누수 탐지 전문업체",
    template: "%s | 누수탐지공사",
  },
  description: "여수·순천·광양 지역 악성 누수 전문 누수탐지공사. 첨단 장비와 숙련된 기술력으로 누수탐지부터 복구 공사까지 한 번에 해결해 드립니다. 누수탐지 실패 시 공사비를 받지 않습니다.",
  keywords: ["누수탐지공사", "누수 탐지", "누수 공사", "여수 누수", "순천 누수", "광양 누수", "욕실 누수", "배관 누수", "악성 누수", "누수 전문 업체"],
  alternates: {
    canonical: "https://www.nusudetect.com",
  },
  openGraph: {
    title: "누수탐지공사 | 여수·순천·광양 누수 탐지 전문업체",
    description: "집 안의 누수, 혼자 고민하지 마세요. 여수·순천·광양 지역 누수 탐지 및 공사 전문업체 누수탐지공사가 첨단장비로 정확하게 찾아드립니다.",
    url: "https://www.nusudetect.com",
    siteName: "누수탐지공사",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        // ✅ og 이미지 실제 경로/파일명 맞춰서 변경
        url: "/images/seo/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "누수탐지공사 여수·순천·광양 누수 탐지 전문업체",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "누수탐지공사 | 여수·순천·광양 누수 탐지 전문업체",
    description: "여수·순천·광양 지역 악성 누수 전문 누수탐지공사. 첨단 장비와 풍부한 경험으로 누수를 빠르게 진단하고 해결합니다.",
    images: ["/images/seo/og-main.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // ✅ 네이버 서치어드바이저 등록 후 값 넣기
  verification: {
    other: {
      "naver-site-verification": "2449dc051d87ea36ebd582ec80e3bcab2fde85f7",
      // "google-site-verification": "GOOGLE_VERIFICATION_CODE" // 필요하면
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "누수탐지공사",
    url: "https://www.nusudetect.com", // ✅ 실제 도메인
    image: "https://www.nusudetect.com/images/seo/og-main.jpg",
    telephone: "010-8631-2545",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "전라남도",
      addressLocality: "여수시", // 정확한 지역 있으면 수정
    },
    areaServed: ["여수시", "순천시", "광양시"],
    description: "여수·순천·광양 지역 악성 누수 전문 누수탐지공사. 첨단 장비를 이용해 누수 위치를 정확하게 진단하고 복구 공사까지 책임지고 진행합니다.",
  };

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ LocalBusiness 구조화 데이터 (SEO + 네이버/구글 둘 다 도움됨) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
