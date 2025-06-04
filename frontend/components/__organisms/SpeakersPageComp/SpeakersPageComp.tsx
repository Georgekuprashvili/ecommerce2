"use client";
import React, { useEffect, useState } from "react";
import FirstSpeakerImage from "../../../public/assets1/image-removebg-preview(38).svg";
import HeadphonesImage from "../../../public/assets1/headphones.svg";
import EarphoneImg from "../../../public/assets1/earphones.svg";
import AboutSection from "../AboutSection";
import SpeakersPageProducsSection from "../../__molecules/SpeakersPageProductsSection/SpeakersPageProducsSection";
import SpeakersPageProductsSmallDivs from "../../__molecules/SpeakersPageProductSmallDivs/SpeakersPageProductsSmallDivs";
import { fetchData } from "../../../app/common/funcs/fetch";
import { fetchdData } from "../../../app/common/types/Type";

function SpeakersPageComp() {
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
  const speakers = newdata.filter((item) => item.category === "speakers");

  return (
    <div className="w-[100%] flex items-center justify-center flex-col ">
      <p className="flex w-[100%] bg-[#000000] justify-center items-center py-[97px] text-[40px] text-[#FFFFFF] font-bold leading-[44px] tracking-[1.43px] max-[600px]:text-[28px]">
        SPEAKERS
      </p>
      {speakers.map((item, key) => (
        <SpeakersPageProducsSection
          link={`SpeakersPage/${item._id}`}
          key={key}
          h1={item.name}
          classname={`max-w-[1180px] w-[100%] mt-[160px] flex items-center justify-between px-[20px] gap-[20px] max-[800px]:flex-col max-[800px]:mt-[120px] max-[800px]:gap-[55px] ${
            key % 2 === 0 ? "" : "flex-row-reverse"
          }  `}
          image={item.image}
          p={item.description}
        />
      ))}

      <div className="max-w-[1180px] w-[100%] flex items-center justify-between mt-[160px] px-[20px] gap-[20px] max-[800px]:gap-[10px] max-[600px]:flex-col max-[600px]:gap-[55px] ">
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

export default SpeakersPageComp;
