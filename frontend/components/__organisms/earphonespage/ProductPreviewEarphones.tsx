"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchdData } from "../../../app/common/types/Type";

export default function ProductPreview({
  name,
  description,

  link,
}: fetchdData) {
  return (
    <section
      className={`mt-20 flex flex-col md:flex-row justify-between items-center bg-white gap-10 max-w-[1180px] w-[100%] mx-[20px]`}
    >
      <div className="bg-gray-100 w-full md:w-1/2 p-10 flex justify-center">
        {/* <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="w-full max-w-[400px] object-contain"
        /> */}
      </div>

      <div className="text-center md:text-left md:w-1/2 px-6">
        <p className="text-[#D87D4A] tracking-[10px]  text-sm mb-4 uppercase">
          New Product
        </p>
        <h2 className="mt-[16px] text-[#000000] text-[40px] leading-[44px] tracking-[1.43px] font-bold  max-[600px]:text-[28px]">
          {name}
        </h2>
        <p className="text-gray-600 mb-6 text-[16px] md:text-[18px] max-w-[480px] mx-auto md:mx-0 mt-[32px]">
          {description}
        </p>
        <Link href={link}>
          <button className="bg-[#D87D4A] text-white px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#fbaf85] transition">
            See Product
          </button>
        </Link>
      </div>
    </section>
  );
}
