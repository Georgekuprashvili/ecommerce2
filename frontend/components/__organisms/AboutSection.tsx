import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="max-w-[1180] w-[100%] px-[20px]   grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6">
          Bringing you the <br /> <span className="text-orange-500">best</span>{" "}
          audio gear
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>

      <div className="rounded-lg overflow-hidden">
        <Image
          src="/assets1/Bitmap (17).svg"
          alt="Audiophile person"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
