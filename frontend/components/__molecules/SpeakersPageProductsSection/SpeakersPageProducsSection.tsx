import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../../__atoms/Button/Button";
import { SpeakersPageProducsSectionInterface } from "../../../app/common/types/Type";

function SpeakersPageProducsSection({
  image,
  classname,
  h1,
  p,
  link,
}: SpeakersPageProducsSectionInterface) {
  return (
    <div className={classname}>
      <div className="flex items-center justify-center bg-[#F1F1F1] max-w-[540px] w-[100%] py-[100px] max-[800px]:max-w-[100%] max-[600px]:py-[40px]">
        <Image
          src={image || ""}
          alt="Speaker"
          width={500}
          height={500}
          className="max-w-[290px] w-[100%] h-[350px] "
        />
      </div>
      <div className="flex flex-col max-[800px]:items-center">
        <h3 className="text-[#D87D4A] text-[14px] tracking-[10px] font-normal">
          NEW PRODUCT
        </h3>
        <h1 className="mt-[16px] text-[#000000] text-[40px] leading-[44px] tracking-[1.43px] font-bold max-[800px]:text-center max-[600px]:text-[28px]">
          {h1}
        </h1>
        <p className="text-[15px] text-[#000000] leading-[25px] mt-[32px] min-w-[300px] w-[450px] max-[1000]:w-[350px] max-[800px]:text-center max-[800]:w-[100%]">
          {p}
        </p>
        <Link href={link}>
          <Button text="See Product" />
        </Link>
      </div>
    </div>
  );
}

export default SpeakersPageProducsSection;
