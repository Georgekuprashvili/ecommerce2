import Image from "next/image";
import React from "react";
// import RightArrowImage from "../../../public/assets/rightarrow.svg";
import Link from "next/link";

interface SpeakersPageProductsSmallDivsInterface {
  h3: string;
  image: string;
  alt: string;
  href: string;
}

function SpeakersPageProductsSmallDivs({
  h3,
  alt,
  image,
  href,
}: SpeakersPageProductsSmallDivsInterface) {
  return (
    <div className="max-w-[350px] w-[100%] flex items-center justify-center max-[600px]:max-w-[100%]">
      <div className="bg-[#F1F1F1] w-[100%] flex items-center justify-center rounded-[8px] flex-col relative">
        <Image
          src={image}
          alt={alt}
          width={500}
          height={500}
          className="w-[122px] h-[160px] absolute top-[-80px] max-[800px]:w-[80px] max-[800px]:h-[104px] max-[800px]:top-[-50px]"
        />
        <div className="w-[122px] h-[18px] bg-[#000000] blur-[20px] absolute top-[60px] max-[800px]:w-[94px] max-[800px]:h-[14px] max-[800px]:top-[40px]" />
        <div className="w-[100%] items-center justify-center flex flex-col pb-[30px] pt-[116px] max-[800px]:pt-[88px] max-[800px]:pb-[22px] max-[600px]:gap-[15px]">
          <h3 className="text-[18px] text-[#000000] font-bold tracking-[1.4px]">
            {h3}
          </h3>
          <div className="flex items-center gap-[14px]">
            <Link
              href={href}
              className="flex items-center gap-[14px] cursor-pointer"
            >
              <p className="text-[13px] font-bold text-[#000000] hover:text-[#D87D4A]">
                Shop
              </p>
              {/* <Image
                src={RightArrowImage}
                alt="Right_arrow"
                width={500}
                height={500}
                className="w-[5px] h-[10px]"
              /> */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeakersPageProductsSmallDivs;
