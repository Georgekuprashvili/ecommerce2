"use client";
import { use, useEffect, useState } from "react";
import SpeakersInnerPageComp from "../../../../components/__organisms/SpeakersInnerPageComp/SpeakersInnerPageComp";
import { fetchdData } from "../../../common/types/Type";
import { fetchData } from "../../../common/funcs/fetch";

interface ParamsInterface {
  params: Promise<{ id: number }>;
}

function Page({ params }: ParamsInterface) {
  const { id } = use(params);
  const [newdata, setData] = useState<fetchdData[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData(
          "${process.env.NEXT_PIBLIC_SERVER_URL}/api/admin"
        );
        setData(data);
      } catch (e) {
        console.error("Error loading data", e);
      }
    }

    loadData();
  }, []);

  const product = newdata.find((item) => item._id === id);

  if (!newdata.length) return <div>Loading product...</div>;
  if (!product) return <div>Product not found</div>;

  if (!product) return <div>Product not found</div>;

  return <SpeakersInnerPageComp product={product} />;
}

export default Page;
