"use client";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={`bg-[#000000] w-[100%] flex items-center justify-center pt-[75px] pb-[45px] text-white  
        ${
          pathname === "/SignUp"
            ? "hidden"
            : pathname === "LogIn"
            ? "hidden"
            : pathname === "/"
            ? "hidden"
            : ""
        } `}
    >
      <div className="max-w-[1180px] w-[100%] px-[20px]  flex flex-col md:flex-row justify-between gap-[20px] ">
        <div className="space-y-6 max-w-lg flex flex-col max-[600px]:justify-center max-[600px]:items-center">
          <h2 className="text-2xl font-bold">audiophile</h2>
          <nav className="flex gap-6 text-sm tracking-widest uppercase flex-wrap min-[1000px]:hidden max-[600px]:flex-col">
            <Link className=" text-center" href="/HomePage">
              Home
            </Link>
            <Link className=" text-center" href="/Headphones">
              Headphones
            </Link>
            <Link className=" text-center" href="/SpeakersPage">
              Speakers
            </Link>
            <Link className=" text-center" href="/EarphonesPage">
              Earphones
            </Link>
          </nav>
          <p className="text-gray-400 text-sm leading-relaxed max-[600px]:text-center">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
          <p className="text-gray-400 text-sm font-semibold">
            Copyright 2021. All Rights Reserved
          </p>
        </div>

        <div className="flex flex-col justify-between items-end gap-8 w-full md:w-auto ">
          <nav className="flex gap-6 text-sm tracking-widest uppercase flex-wrap max-[1000px]:hidden">
            <Link href="/HomePage">Home</Link>
            <Link href="/Headphones">Headphones</Link>
            <Link href="/SpeakersPage">Speakers</Link>
            <Link href="/EarphonesPage">Earphones</Link>
          </nav>

          <div className="flex w-[100%] gap-4  max-[600px]:items-center max-[600px]:justify-center ">
            <Link href="#" className="hover:text-orange-500 transition">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-orange-500 transition">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-orange-500 transition">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
