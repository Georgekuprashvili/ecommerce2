"use client";
import React from "react";
import Image from "next/image";
// import EyeImage from "../../../public/assets/hide.png";
import { SignUpInputsMinorDivInterface } from "../../../app/common/types/Type";
function SignUpPasswordInput({
  htmlFor,
  type,
  id,
  LabelName,
  toggleShowPassword,
  ErrorText,
  register,
}: SignUpInputsMinorDivInterface) {
  return (
    <div className=" flex flex-col gap-[4px]">
      <div className="flex justify-between">
        <label
          className="cursor-pointer text-[#696868] font-bold "
          htmlFor={htmlFor}
        >
          {LabelName}
        </label>
        <p className=" text-[#F44336] font-bold">{ErrorText}</p>
      </div>
      <div className=" outline-none border-solid border-[#98908B] border-[1px] rounded-[8px] p-[12px] flex">
        <input
          className="w-[100%] h-[100%] outline-none"
          {...register}
          type={type}
          id={id}
        />
        {/* <Image
          className="w-[16px] h-[16px] cursor-pointer"
          src={EyeImage}
          alt="Eye_image"
          width={500}
          height={500}
          onClick={toggleShowPassword}
        /> */}
      </div>
      <p className=" text-[#696868] text-[12px] leading-[18px]  self-end">
        Passwords must be at least 8 characters
      </p>
    </div>
  );
}

export default SignUpPasswordInput;
