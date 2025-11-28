import React from "react";

export default function Contact01() {
  return (
    <section
      id="contact"
      className=" w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center py-20 text-white"
      style={{ backgroundImage: "url('/images/main/contact02.png')" }}
    >
      <h3>여수 · 순천 · 광양</h3>
      <h2 className="md:text-5xl">누수 전문 업체</h2>
      <a href="tel:010-8631-2545" className="mt-4 inline-block text-[#81D981] font-extrabold text-3xl">
        010-8631-2545
      </a>
      <a href="tel:010-8631-2545" className="mt-4 inline-block bg-[#0E7D15] text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors">
        문의하기
      </a>
    </section>
  );
}
