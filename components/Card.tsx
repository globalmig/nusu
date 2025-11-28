import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  description2?: string;
  img: string;
}

export default function Card(item: CardProps) {
  return (
    <div className="flex relative min-h-80  w-full bg-white/75 p-10 rounded-2xl shadow-2xl border text-[#0E7D15]">
      <div className="flex flex-col w-1/2">
        <h3 className="font-bold">{item.title}</h3>
        <p>{item.description}</p>
        <p className="mt-4">{item.description2}</p>
      </div>

      <Image src={item.img} alt={item.title} width={200} height={100} className="absolute bottom-0 right-0" />
    </div>
  );
}
