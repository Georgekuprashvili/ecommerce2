import React from "react";
import { SignUpInputsMinorDivInterface } from "../../../app/common/types/Type";

function SignUpInputsMinorDiv({
  LabelName,
  type,
  htmlFor,
  id,
  register,
  ErrorText,
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
      <input
        className=" outline-none border-solid border-[#98908B] border-[1px] rounded-[8px] p-[12px] "
        type={type}
        id={id}
        {...register}
      />
    </div>
  );
}

export default SignUpInputsMinorDiv;
