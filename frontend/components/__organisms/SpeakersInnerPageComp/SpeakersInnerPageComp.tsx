"use client";

import React, { useEffect, useState } from "react";
import FirstSpeakerImage from "../../../public/assets1/image-removebg-preview(38).svg";
import HeadphonesImage from "../../../public/assets1/headphones.svg";
import EarphoneImg from "../../../public/assets1/earphones.svg";
import AboutSection from "../AboutSection";
import Image from "next/image";
import SpeakersInnerPageProductsSection from "../../__molecules/SpeakersInnerPageProductsSection.tsx/SpeakersInnerPageProductsSection";
import {
  fetchdData,
  SpeakersInnerPageCompInterface,
} from "../../../app/common/types/Type";
import SpeakersPageProductsSmallDivs from "../../__molecules/SpeakersPageProductSmallDivs/SpeakersPageProductsSmallDivs";
import Link from "next/link";
import { fetchData } from "../../../app/common/funcs/fetch";

function SpeakersInnerPageComp({ product }: SpeakersInnerPageCompInterface) {
  const [newdata, setData] = useState<fetchdData[]>([]);
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData(
          `${process.env.NEXT_PIBLIC_SERVER_URL}/api/admin`
        );
        setData(data);
      } catch (e) {
        console.error("Error loading data");
      }
    }

    loadData();
  }, []);
  const speakers = newdata
    .filter((item) => item.category === "speakers")
    .slice(0, 3);

  return (
    <div className="w-[100%] flex items-center justify-center flex-col  ">
      <div className="w-[100%] flex justify-center mt-[160px]">
        <SpeakersInnerPageProductsSection
          h1={product?.name}
          classname={`max-w-[1180px] w-[100%] mt-[160px] flex items-center justify-between px-[20px] gap-[20px] max-[800px]:flex-col max-[800px]:mt-[120px] max-[800px]:gap-[55px]  `}
          image={product.image}
          p={product?.description}
          price={product.price}
        />
      </div>
      <div className="w-[100%] max-w-[1180px] mt-[160px] px-[20px] flex justify-between gap-[30px] max-[800px]:flex-col">
        <div className="flex flex-col">
          <h1 className="text-[#000000] text-[32px] font-bold eading-[36px] tracking-[1.14px] max-[500px]:text-[24px]">
            FEATURES
          </h1>
          <p className="max-w-[635px] leading-[25px] text-[15px] font-normal text-[#000000] mt-[32px] max-[800]:max-w-[100%]">
            {product.features}
          </p>
        </div>
        <div className="flex flex-col max-[800px]:flex-row max-[800px]:w-[100%] max-[800px]:justify-between max-[500px]:flex-col">
          <h1 className="text-[#000000] text-[32px] font-bold max-[500px]:text-[24px]">
            in the box
          </h1>
          <div className="flex flex-col mt-[32px] gap-[8px]">
            {product.includes.map((item, key) => (
              <div className="flex gap-[24px] items-center" key={key}>
                <p className="text-[#D87D4A] text-[15px] leading-[25px] font-bold">
                  {item.quantity}x
                </p>
                <p className="text-[#000000] text-[15px] leading-[25px] font-normal">
                  {item.item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1180px] w-full px-[20px] flex mt-[160px] gap-[32px] items-stretch justify-between max-[800px]:flex-col max-[800px]:gap-[20px]">
        <div className="flex flex-col gap-[32px] w-full max-w-[455px] max-[800px]:w-full max-[800px]:max-w-full max-[800px]:gap-[20px]">
          <Image
            src={product.gallery[0]}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto"
          />
          <Image
            src={product.gallery[1]}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        <div className="w-full max-w-[635px] h-auto max-[800px]:max-w-full">
          <Image
            src={product.gallery[2]}
            alt={product.name}
            width={500}
            height={1064}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex max-w-[1180px] px-[20px] w-[100%] items-center justify-center flex-col mt-[160px] ">
        <h1 className="font-bold text-[32px] leading-[36px] tracking-[1.14px] max-[800px]:text-[24px ">
          you may also like
        </h1>
        <div className="w-[100%] flex items-center justify-between mt-[64px] gap-[20px] max-[600px]:flex-col">
          {speakers.map((item, key) => (
            <div
              className="flex flex-col items-center justify-center gap-[45px] w-[100%]"
              key={key}
            >
              <div className="bg-[#F1F1F1] max-w-[350px]  w-[100%] py-[60px] flex itmes-center justify-center max-[800px]:py-[15px] max-[600px]:max-w-[100%] ">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="max-w-[250px] w-[100%] h-[220px] max-[800px]:max-w-[110px] max-[800px]:h-[120px]"
                />
              </div>
              <h1 className="text-[24px] text-[#000000] font-bold tracking-[1.7px]">
                {item.name}
              </h1>
              <Link
                href={`/SpeakersPage/${item._id}`}
                className="bg-[#D87D4A] text-[#fff] px-[29px] py-[15px] cursor-pointer font-bold text-[13px] tracking-[1px] hover:bg-[#FBAF85]"
              >
                See Product
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-[1180px] w-[100%] flex items-center justify-between mt-[260px] px-[20px] gap-[20px] max-[800px]:gap-[10px] max-[600px]:flex-col max-[600px]:gap-[55px] max-[800px]:mt-[160px] ">
        <SpeakersPageProductsSmallDivs
          href="/Headphones"
          alt="HEADPHONES"
          image={HeadphonesImage}
          h3="HEADPHONES"
        />
        <SpeakersPageProductsSmallDivs
          href="/SpeakersPage"
          image={FirstSpeakerImage}
          h3="SPEAKERS"
          alt="SPEAKERS"
        />
        <SpeakersPageProductsSmallDivs
          href="/EarphonesPage"
          image={EarphoneImg}
          h3="EARPHONES"
          alt="EARPHONES"
        />
      </div>
      <div className="mt-[160px] mb-[160px]">
        <AboutSection />
      </div>
    </div>
  );
}

export default SpeakersInnerPageComp;
