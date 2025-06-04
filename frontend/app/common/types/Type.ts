export interface OtherProduct {
  slug: string;
  name: string;
  image: string;
}

export interface SpeakersInnerPageCompInterface {
  product: {
    name: string;
    id: number;
    slug: string;
    description: string;
    price?: number;
    features: string;
    image: string;
    includes: {
      quantity: number;
      item: string;
    }[];
    others: OtherProduct[];
    gallery: string[];
  };
}
import { UseFormRegisterReturn } from "react-hook-form";

export interface SignUpInputsMinorDivInterface {
  LabelName: string;
  type: string;
  htmlFor: string;
  id: string;
  toggleShowPassword?: () => void;
  register: UseFormRegisterReturn;
  ErrorText?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface PasswordToggleTypes {
  showPassword: boolean;
  toggleShowPassword: () => void;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface fetchdData {
  image: string;
  _id: number;
  id: number;
  link: string;
  slug: string;
  name: string;

  category: string;
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: {
    quantity: number;
    item: string;
  }[];
  gallery: string[];
  others: {
    slug: string;
    name: string;
    image: string;
  }[];
}

export interface SpeakersPageProducsSectionInterface {
  image: string;
  classname: string;
  h1: React.ReactNode;
  p: React.ReactNode;
  link: string;
}
