"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import SignUpInputsMinorDiv from "../SignUpInoutsMinorDiv/SignUpInputsMinorDiv";
import SignUpPasswordInput from "../SignUpPasswordInput/SignUpPasswordInput";
import { LoginSchema } from "../../../app/common/ValidationSchema/ValidationSchema";
import { LoginData } from "../../../app/common/types/Type";
import { PasswordToggle } from "../../../app/common/Store/Store";
import axios from "axios";

function Conteiner() {
  const router = useRouter();
  const { toggleShowPassword, showPassword } = PasswordToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PIBLIC_SERVER_URL}/auth/sign-in`,
        {
          email: data.email,
          password: data.password,
        }
      );
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("userEmail", res.data.email);
      router.push("/HomePage");
    } catch (error: any) {
      alert(error?.response?.data?.error || "Login failed");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-[32px] gap-[16px]"
    >
      <SignUpInputsMinorDiv
        LabelName="Email"
        type="email"
        htmlFor="email"
        id="email"
        register={register("email")}
        ErrorText={errors.email?.message}
      />
      <SignUpPasswordInput
        LabelName="Password"
        type={showPassword ? "text" : "password"}
        htmlFor="password"
        id="password"
        toggleShowPassword={toggleShowPassword}
        register={register("password")}
        ErrorText={errors.password?.message}
      />
      <button
        className="w-[100%] p-[16px] cursor-pointer bg-[#201F24] rounded-[8px] text-white font-bold text-[14px]"
        type="submit"
      >
        Create Account
      </button>
    </form>
  );
}

export default Conteiner;
