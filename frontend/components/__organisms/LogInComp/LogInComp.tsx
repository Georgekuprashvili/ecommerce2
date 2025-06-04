"use client";
import Link from "next/link";
import React from "react";
import Conteiner from "../../__molecules/Conteiner/Conteiner";
import Logo from "../../../app/common/svg/logo";

function LogInComp() {
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center bg-[#F8F4F0]  max-[1100px]:flex-col max-[1100px]:justify-between">
      <div className="flex items-center justify-between max-w-[1440px] w-[100%] h-[100%] gap-[20px] max-[1100px]:justify-center px-[20px] flex-col py-[100px]">
        <div className="w-[100%] flex items-center justify-center border-b-[1px] border-b-solid border-b-[#00000033] pb-[30px]">
          <Logo />
        </div>
        <div className="max-w-[560px] w-[100%] bg-[white]  rounded-[12px] p-[32px]   ">
          <h1 className="text-[32px] font-bold leading-[38.5px] text-[#141414] text-center">
            Login
          </h1>
          <Conteiner />
          <div className="flex w-[100%] items-center justify-center mt-[32px]">
            <p className=" leading-[21px] text-[#696868] text-[14px]">
              Need to create an account?
            </p>
            <Link
              className="text-[#201F24] text-[14px] font-bold underline"
              href={"/SignUp"}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInComp;
