import React from "react";
import Image from "next/image";
import LeakCards from "@/components/LeakCard";
import Card from "@/components/Card";
import Contact01 from "@/components/Contact01";
import ScrollMouse from "@/components/ScrollMouse";
import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section
        className="w-full h-[500px] md:h-screen py-20 px-6 sticky top-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/main/Hero.png')",
        }}
      >
        <div className="relative w-full h-[500px] md:h-screen">
          <div className="relative z-10 max-w-4xl  md:mt-12 mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-snug text-balance  text-green-800" style={{ lineHeight: "1.2" }}>
              집 안의 누수,
              <br />
              혼자 고민하지 마세요.
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-green-800 ">악성누수도 경험 많은 전문가가 직접 해결합니다.</p>
          </div>
          <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-10 mb-6 md:block hidden">
            <ScrollMouse />
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="w-full -mt-10">
        <div className="bg-gradient-to-br from-[#fff59d] to-[#ffd54f] rounded-t-3xl">
          <div className="flex flex-col md:flex-row w-full mx-auto md:h-96">
            {/* 텍스트 영역 */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4 md:gap-6 p-6 md:p-10  py-10 text-green800 text-center">
              <h3 className="text-2xl md:text-4xl font-bold">
                누수 전문 업체를 <br className="md:hidden block" /> 찾으시나요?
              </h3>
              <p className="text-sm md:text-lg leading-relaxed">
                악성 누수 전담 베테랑 전문팀
                <br />
                정밀 첨단 장비 완비 · 고난도 누수까지 해결
              </p>
              <Link href="#contact">
                <button className="bg-[#369c2b] text-white px-4 md:px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition md:text-2xl">365일 24시간 즉시 상담 가능!</button>
              </Link>
            </div>

            {/* 이미지 영역 */}
            <div className="relative w-full md:w-1/2 h-96 md:h-auto overflow-hidden md:rounded-tr-3xl hidden md:block">
              <Image src="/images/main/contact01.png" alt="누수 상담" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 이유 섹션 */}
      <section id="work" className="relative w-full py-16 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image src="/images/main/cus.png" alt="" fill className="object-cover" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-[#364636]">
          <h2 className="text-2xl md:text-3xl font-black mb-4 text-center">누수탐지공사를 선택해야하는 이유</h2>
          <p className="text-center  md:mb-12">
            고객만족을 위해 전문가의 노하우로 작업을
            <br className="md:hidden block" /> 진행하는 누수탐지전문 업체입니다.
          </p>
          <LeakCards />
        </div>
      </section>

      {/* Benefit 섹션 */}
      <section className="relative w-full py-20 px-6 -mt-3">
        <div className="absolute inset-0 z-0">
          <Image src="/images/main/benefit.png" alt="" fill className="object-cover" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center">
          <div className="flex-shrink-0">
            <Image src="/images/main/benefit_card.png" alt="누수탐지 보증" width={320} height={320} className="w-full max-w-[280px] md:max-w-[320px] h-auto" />
          </div>
          <div className="text-white">
            <h2 className="text-2xl md:text-6xl font-bold mb-6 md:mb-10" style={{ lineHeight: "1.2" }}>
              누수탐지 실패시
              <br /> 공사비를 받지 않습니다.
            </h2>
            <p className="text-sm md:text-base leading-relaxed md:leading-[2] keep-break ">
              누수탐지공사는 여수·순천·광양 지역을 중심으로 누수 점검과 설비 관련 시공을 전문적으로 진행하고 있습니다. 가스·난방·수도 설비는 안전을 위해 전문건설면허를 가진 업체에서 시공하는 것이
              필수입니다.
              <br className="hidden md:block" />
              저희는 정식 면허와 풍부한 현장 경험을 바탕으로 누수 공사, 보일러·배관 시공 등 다양한 작업을 안전하게 제공합니다.
              <br className="hidden md:block" />
              지역에서 믿고 맡길 수 있는 누수 전문업체가 되기 위해 항상 최선을 다하겠습니다. <br className="hidden md:block" />
              감사합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-br from-[#fff59d] to-[#ffd54f] ">
        {/* < className="w-full bg-cover bg-center bg-no-repeat " style={{ backgroundImage: "url('/images/main/card_bg.png')" }}> */}

        <div className="relative z-10 flex flex-col justify-center items-center text-[#364636] py-20 px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-4 text-center">누수 공사 과정</h2>
          <p className="text-center mb-8 md:mb-12 font-light">
            악성성 누수, 미세 누수, 모든 누수 해결해드립니다!
            <br />더 이상 누수로 힘들어하지마세요!
          </p>
          <div className="grid gird-cols-1 md:grid-cols-2 gap-4">
            <Card
              title={"1. 전화 상담"}
              description={"누수 발생 시 유선 상담을 통해 현장 상황을 먼저 파악합니다."}
              description2={"문제 발생 시점, 누수량, 위치 등을 확인하며 주변 환경까지 함께 점검합니다."}
              img={"/images/main/card/image2.png"}
            />
            <Card
              title={"2. 현장 방문"}
              description={"전문가가 직접 현장을 확인한 후 누수 지점을 정확히 설명드립니다."}
              description2={"이후 문제 해결에 필요한 예상 비용과 작업 일정을 안내해드립니다."}
              img={"/images/main/card/image3.png"}
            />
            <Card
              title={"3. 공사 진행"}
              description={"예약된 일정에 맞춰 공사를 진행하며, 당일 시공이 가능한 경우 즉시 작업을 시작합니다."}
              description2={"모든 과정은 고객님과 협의 후 진행됩니다."}
              img={"/images/main/card/image4.png"}
            />
            <Card title={"4. 누수 공사 완료"} description={"배태랑 경험의 전문 기술력이 바탕이 되어 정확한 누수 지점을 기준으로 공사를 진행하고 마무리 합니다."} img={"/images/main/card/image5.png"} />
          </div>
        </div>
      </section>

      <Contact01 />
    </>
  );
}
