"use client";

import HeadphonesImage from "../../../public/assets1/headphones.svg";
import FirstSpeakerImage from "../../../public/assets1/image-removebg-preview(38).svg";
import EarphoneImg from "../../../public/assets1/earphones.svg";
import SpeakersPageProductsSmallDivs from "../../__molecules/SpeakersPageProductSmallDivs/SpeakersPageProductsSmallDivs";
import AboutSection from "../AboutSection";
import ProductPreview from "../../__molecules/ProductPreview";
import { useEffect, useState } from "react";
import { fetchdData } from "../../../app/common/types/Type";
import { fetchData } from "../../../app/common/funcs/fetch";

export default function HeadphonesPageComp() {
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
  const headphones = newdata.filter((item) => item.category === "headphones");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-[238px] bg-black py-24">
        <h1 className="text-white text-4xl font-bold uppercase text-center">
          Headphones
        </h1>
      </div>

      <div className="max-w-[1180px] w-full px-[20px]">
        {headphones.map((item, idx) => (
          <ProductPreview
            image={item.image}
            key={item._id}
            product={item}
            reverse={idx % 2 !== 0}
          />
        ))}
      </div>

      <div className="mt-[200px] max-w-[1180px] px-[20px] w-[100%] flex  gap-[20px] items-center justify-between max-[800px]:gap-[10px] max-[600px]:flex-col max-[600px]:gap-[100px]">
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
  );
}
