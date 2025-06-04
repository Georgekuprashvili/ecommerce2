"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [inputKey, setInputKey] = useState(0);
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    price: 0,
    description: "",
    isNew: false,
    features: "",
    category: "",
    image: null as File | null,
    gallery: [null, null, null] as (File | null)[],
    includes: [{ quantity: 0, item: "" }],
    others: [{ slug: "", name: "" }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files?.[0] ?? null
          : value,
    }));
  };

  const handleArrayChange = (
    index: number,
    value: File | null,
    field: "gallery"
  ) => {
    const updatedArray = [...product[field]];
    updatedArray[index] = value;
    setProduct({ ...product, [field]: updatedArray });
  };

  const handleIncludesChange = (
    index: number,
    key: "quantity" | "item",
    value: string | number
  ) => {
    const updatedIncludes = [...product.includes];
    updatedIncludes[index] = {
      ...updatedIncludes[index],
      [key]: key === "quantity" ? Number(value) : value,
    };
    setProduct({ ...product, includes: updatedIncludes });
  };

  const handleOthersChange = (
    index: number,
    key: "slug" | "name",
    value: string
  ) => {
    const updatedOthers = [...product.others];
    updatedOthers[index] = {
      ...updatedOthers[index],
      [key]: value,
    };
    setProduct({ ...product, others: updatedOthers });
  };

  const addInclude = () =>
    setProduct({
      ...product,
      includes: [...product.includes, { quantity: 0, item: "" }],
    });
  const removeInclude = (index: number) =>
    setProduct({
      ...product,
      includes: product.includes.filter((_, i) => i !== index),
    });

  const addOther = () =>
    setProduct({
      ...product,
      others: [...product.others, { slug: "", name: "" }],
    });
  const removeOther = (index: number) =>
    setProduct({
      ...product,
      others: product.others.filter((_, i) => i !== index),
    });

  const handleSubmit = async () => {
    const formData = new FormData();

    if (product.image) formData.append("image", product.image);
    if (product.gallery[0]) formData.append("image1", product.gallery[0]);
    if (product.gallery[1]) formData.append("image2", product.gallery[1]);
    if (product.gallery[2]) formData.append("image3", product.gallery[2]);

    formData.append("name", product.name);
    formData.append("slug", product.slug);
    formData.append("price", product.price.toString());
    formData.append("description", product.description);
    formData.append("features", product.features);
    formData.append("isNew", JSON.stringify(product.isNew));
    formData.append("category", product.category);
    formData.append("includes", JSON.stringify(product.includes));
    formData.append("others", JSON.stringify(product.others));

    try {
      const res = await fetch(
        `${process.env.NEXT_PIBLIC_SERVER_URL}/api/admin`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(`Failed: ${data.error}`);
      } else {
        setProduct({
          name: "",
          slug: "",
          price: 0,
          description: "",
          isNew: false,
          features: "",
          category: "",
          image: null as File | null,
          gallery: [null, null, null] as (File | null)[],
          includes: [{ quantity: 0, item: "" }],
          others: [{ slug: "", name: "" }],
        });
        setInputKey((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
          value={product.name}
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
          value={product.slug}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
          value={product.price}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
          value={product.category}
        />
        <input
          type="text"
          name="features"
          placeholder="Features"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
          value={product.features}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
          value={product.description}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
        />
        <label className="flex items-center gap-2 col-span-2  cursor-pointer ">
          <input
            type="checkbox"
            name="isNew"
            checked={product.isNew}
            onChange={handleChange}
            className="cursor-pointer"
          />
          <span>Is New</span>
        </label>
      </div>

      <h2 className="mt-6 font-semibold">Gallery Images</h2>
      {product.gallery.map((_, i) => (
        <input
          key={`gallery-image-${i}-${inputKey}`}
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleArrayChange(i, e.target.files?.[0] ?? null, "gallery")
          }
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
        />
      ))}

      <h2 className="mt-6 font-semibold">Includes</h2>
      {product.includes.map((include, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2 items-center"
        >
          <input
            type="number"
            key={`main-image-${inputKey}`}
            value={include.quantity}
            onChange={(e) =>
              handleIncludesChange(i, "quantity", e.target.value)
            }
            placeholder="Quantity"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
            min={0}
          />
          <input
            type="text"
            value={include.item}
            onChange={(e) => handleIncludesChange(i, "item", e.target.value)}
            placeholder="Item Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
          />
          <button
            type="button"
            onClick={() => removeInclude(i)}
            className="text-red-600 hover:underline  cursor-pointer "
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addInclude}
        className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700  cursor-pointer "
      >
        Add Include
      </button>

      <h2 className="mt-6 font-semibold">Others</h2>
      {product.others.map((other, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 items-center"
        >
          <input
            type="text"
            value={other.slug}
            onChange={(e) => handleOthersChange(i, "slug", e.target.value)}
            placeholder="Slug"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
          />
          <input
            type="text"
            value={other.name}
            onChange={(e) => handleOthersChange(i, "name", e.target.value)}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
          />
          <button
            type="button"
            onClick={() => removeOther(i)}
            className="text-red-600 hover:underline  cursor-pointer   "
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addOther}
        className="  cursor-pointer mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Other
      </button>

      <button
        onClick={handleSubmit}
        className=" cursor-pointer mt-6 bg-black text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Submit
      </button>
    </div>
  );
}
