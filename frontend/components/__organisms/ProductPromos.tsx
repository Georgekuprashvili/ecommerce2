import Image from "next/image";
import Link from "next/link";
import data from "../../data.json";

import zx9Img from "../../public/assets1/image-removebg-preview(38).svg";
import zx7Img from "../../public/assets1/image-speaker-zx7.jpg";
import yx1Img from "../../public/assets1/image-earphones-yx1.jpg";

export default function ProductPromos() {
  const zx9 = data.find((item) => item.slug === "zx9-speaker");
  const zx7 = data.find((item) => item.slug === "zx7-speaker");
  const yx1 = data.find((item) => item.slug === "yx1-earphones");

  return (
    <section className=" w-[100%]  px-[20px] flex items-center justify-center flex-col space-y-10 mt-[160px]">
      {zx9 && (
        <div className="bg-[#D87D4A] max-w-[1180px] w-[100%] rounded-lg p-10 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
          <Image
            src={zx9Img}
            alt={zx9.name}
            width={370}
            height={370}
            className="object-contain  mb-10 md:mb-0  relative    "
            priority
          />
          <div className="text-center lg:text-left text-white max-w-md">
            <h2 className="text-4xl font-bold uppercase mb-6">{zx9.name}</h2>
            <p className="text-white/80 mb-6">{zx9.description}</p>
            <Link
              href={`/SpeakersPage/${zx9.id}`}
              className="bg-black text-white py-3 px-6 text-sm uppercase tracking-widest hover:bg-neutral-800 transition"
            >
              See Product
            </Link>
          </div>
        </div>
      )}

      {zx7 && (
        <div
          className=" max-w-[1180px]  rounded-lg bg-cover bg-center bg-no-repeat w-full px-10 py-20 flex flex-col gap-5"
          style={{
            backgroundImage: `url(${zx7Img.src})`,
          }}
        >
          <h3 className="text-2xl font-bold uppercase text-black">
            {zx7.name}
          </h3>
          <Link
            href={`/SpeakersPage/${zx7.id}`}
            className="border border-black py-2 px-6 text-sm uppercase hover:bg-black hover:text-white transition w-fit"
          >
            See Product
          </Link>
        </div>
      )}

      {yx1 && (
        <div className=" max-w-[1180px] w-[100%] grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={yx1Img}
              alt={yx1.name}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg flex flex-col justify-center px-8 py-10">
            <h3 className="text-2xl font-bold uppercase mb-6">{yx1.name}</h3>
            <Link
              href={`/SpeakersPage/${yx1.id}`}
              className="border border-black py-2 px-6 text-sm uppercase hover:bg-black hover:text-white transition w-fit"
            >
              See Product
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
