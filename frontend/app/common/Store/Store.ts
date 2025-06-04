import { create } from "zustand";
import { PasswordToggleTypes } from "../types/Type";

export const PasswordToggle = create<PasswordToggleTypes>((set) => ({
  showPassword: false,
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));
