"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import SignUpInputsMinorDiv from "../SignUpInoutsMinorDiv/SignUpInputsMinorDiv";
import { SignUpSchema } from "../../../app/common/ValidationSchema/ValidationSchema";
import SignUpPasswordInput from "../SignUpPasswordInput/SignUpPasswordInput";
import RegistrationButton from "../../__atoms/RegistrationButton/RegistrationButton";
import { PasswordToggle } from "../../../app/common/Store/Store";
import { SignUpData } from "../../../app/common/types/Type";
import axios from "axios";

function SignUpInputsDiv() {
  const router = useRouter();
  const { toggleShowPassword, showPassword } = PasswordToggle();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(SignUpSchema),
  });
  const onSubmit = async (data: SignUpData) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
        fullName: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/LogIn");
    } catch (error: any) {
      alert(error?.response?.data?.error || "Something went wrong");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-[32px] gap-[16px]"
    >
      <SignUpInputsMinorDiv
        LabelName="Name"
        type="text"
        htmlFor="name"
        id="name"
        register={register("name")}
        ErrorText={errors.name?.message}
      />
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
      <RegistrationButton text={"Create Account"} />
    </form>
  );
}

export default SignUpInputsDiv;
