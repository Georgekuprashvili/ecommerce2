"use client";

import Image from "next/image";
import React, { useState } from "react";
import minusImg from "../../../public/assets1/-.svg";
import plusImg from "../../../public/assets1/+.svg";
import { useCartStore } from "../../../app/common/Store/useCartStore";

interface SpeakersPageProducsSectionInterface {
  image: string;
  classname: string;
  h1: React.ReactNode;
  p: React.ReactNode;
  link?: number;
  price?: number;
}

function SpeakersInnerPageProductsSection({
  image,
  classname,
  h1,
  p,
  price = 0,
}: SpeakersPageProducsSectionInterface) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: Date.now(),
      name: String(h1),
      price,
      quantity,
      image,
    });
    setQuantity(1);
  };

  return (
    <div className={classname}>
      <div className="flex items-center justify-center bg-[#F1F1F1] max-w-[540px] w-full py-[100px] max-[800px]:max-w-full max-[600px]:py-[40px]">
        <Image
          src={image}
          alt="Speaker"
          width={500}
          height={500}
          className="max-w-[290px] w-full h-[350px]"
        />
      </div>
      <div className="flex flex-col max-[800px]:items-center">
        <h3 className="text-[#D87D4A] text-[14px] tracking-[10px] font-normal">
          NEW PRODUCT
        </h3>
        <h1 className="mt-4 text-black text-[40px] leading-[44px] tracking-[1.43px] font-bold max-[800px]:text-center max-[600px]:text-[28px]">
          {h1}
        </h1>
        <p className="text-[15px] text-black leading-[25px] mt-8 min-w-[300px] w-[450px] max-[1000px]:w-[350px] max-[800px]:text-center max-[800px]:w-full">
          {p}
        </p>
        <h3 className="text-black text-[18px] font-bold tracking-[1.3px] mt-8">
          $ {price}
        </h3>

        <div className="max-w-[300px] w-full flex items-center justify-between mt-12 gap-4">
          <div className="bg-[#F1F1F1] px-4 py-2 flex items-center justify-between max-w-[120px] w-full">
            <Image
              src={minusImg}
              alt="minus"
              width={10}
              height={10}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="cursor-pointer"
            />
            <p className="text-black text-[13px] font-bold">{quantity}</p>
            <Image
              src={plusImg}
              alt="plus"
              width={10}
              height={10}
              onClick={() => setQuantity((q) => q + 1)}
              className="cursor-pointer"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-[#D87D4A] w-full px-[32px] py-[15px] text-white text-[13px] font-bold cursor-pointer"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpeakersInnerPageProductsSection;
