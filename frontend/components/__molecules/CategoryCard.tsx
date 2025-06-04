import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  image: string;
  href: string;
};

export default function CategoryCard({ title, image, href }: Props) {
  return (
    <div className="rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center py-8">
      <Image
        src={image}
        alt={title}
        width={120}
        height={120}
        className="mb-6"
      />
      <h3 className="text-md font-bold tracking-widest uppercase mb-2">
        {title}
      </h3>
      <Link
        href={href}
        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-orange-500 transition"
      >
        Shop <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
