"use client";

import React, { useEffect, useState } from "react";
import AboutSection from "../AboutSection";
import HeadphonesImage from "../../../public/assets1/headphones.svg";
import FirstSpeakerImage from "../../../public/assets1/image-removebg-preview(38).svg";
import EarphoneImg from "../../../public/assets1/earphones.svg";
import SpeakersPageProductsSmallDivs from "../../__molecules/SpeakersPageProductSmallDivs/SpeakersPageProductsSmallDivs";
import { fetchData } from "../../../app/common/funcs/fetch";
import { fetchdData } from "../../../app/common/types/Type";
import SpeakersPageProducsSection from "../../__molecules/SpeakersPageProductsSection/SpeakersPageProducsSection";

export default function Page() {
  const [newdata, setData] = useState<fetchdData[]>([]);
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData(
          "${process.env.NEXT_PIBLIC_SERVER_URL}/api/admin"
        );
        setData(data);
      } catch (e) {
        console.error("Error loading data");
      }
    }

    loadData();
  }, []);
  const Earphones = newdata.filter((item) => item.category === "earphones");
  return (
    <div>
      <div className="w-full  h-[238px] bg-black flex justify-center items-center text-center">
        <h1 className="text-[32px] font-[700] text-white">EARPHONES</h1>
      </div>

      <div>
        <div className="flex flex-col justify-center items-center w-[100%]">
          {Earphones.map((item, key) => (
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
        </div>
        <div className="mt-[200px] max-w-[1180px] px-[20px] mx-auto flex  gap-[20px] items-center justify-between max-[800px]:gap-[10px] max-[600px]:flex-col max-[600px]:gap-[100px]">
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

        <div className="w-[100%] flex justify-center mt-[160px] mb-[160px]">
          <AboutSection />
        </div>
      </div>
    </div>
  );
}
