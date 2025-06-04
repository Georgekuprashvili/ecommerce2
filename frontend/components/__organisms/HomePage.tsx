import HeroSection from "./HeroSection";
import ProductPromos from "./ProductPromos";
import SpeakersPageProductsSmallDivs from "../__molecules/SpeakersPageProductSmallDivs/SpeakersPageProductsSmallDivs";
import AboutSection from "./AboutSection";
import HeadphonesImage from "../../public/assets1/headphones.svg";
import FirstSpeakerImage from "../../public/assets1/image-removebg-preview(38).svg";
import EarphoneImg from "../../public/assets1/earphones.svg";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <div className="mt-[200px] max-w-[1180px] px-[20px] mx-auto flex  gap-[20px] items-center justify-between max-[800px]:gap-[10px] max-[600px]:flex-col max-[600px]:gap-[100px]">
        <SpeakersPageProductsSmallDivs
          href="/Headphones"
          alt="HEADPHONES"
          image={HeadphonesImage}
          h3="HEADPHONES"
        />
        <SpeakersPageProductsSmallDivs
          href="/SpeakersPage"
          image={FirstSpeakerImage}
          h3="SPEAKERS"
          alt="SPEAKERS"
        />
        <SpeakersPageProductsSmallDivs
          href="/EarphonesPage"
          image={EarphoneImg}
          h3="EARPHONES"
          alt="EARPHONES"
        />
      </div>

      <ProductPromos />
      <div className="w-[100%] flex justify-center mt-[160px] mb-[160px] ">
        <AboutSection />
      </div>
    </main>
  );
}
