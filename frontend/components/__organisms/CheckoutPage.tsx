"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../app/common/Store/useCartStore";
import { api } from "../../app/common/api";

const CheckoutPage = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  const clearCart = useCartStore((state) => state.clearCart);

  const [isClient, setIsClient] = useState(false);
  const [payment, setPayment] = useState<"e-Money" | "Cash on Delivery">(
    "e-Money"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    eMoneyNumber: "",
    eMoneyPin: "",
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validate = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.zip.trim()) newErrors.zip = "ZIP Code is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (payment === "e-Money") {
      if (!form.eMoneyNumber.trim())
        newErrors.eMoneyNumber = "e-Money Number is required";
      if (!form.eMoneyPin.trim())
        newErrors.eMoneyPin = "e-Money PIN is required";
    }
    return newErrors;
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not authenticated!");

      await api.post(
        "/api/cart",
        { items },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await api.post(
        "/api/order",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsSubmitted(true);
      clearCart();
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Order failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-10 bg-[#FAFAFA] relative">
      {isSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Thank You For Your Order
            </h2>
            <p className="text-gray-600 mb-6">
              You will receive a confirmation email shortly.
            </p>
            <button
              onClick={() => router.push("/HomePage")}
              className="bg-[#D87D4A] text-white px-6 py-2 rounded-lg font-semibold cursor-pointer"
            >
              BACK TO HOME
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8">
        <div className="bg-white p-8 rounded-lg w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-8">CHECKOUT</h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-sm text-[#D87D4A] tracking-widest font-bold mb-4">
                BILLING DETAILS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    placeholder="Name"
                    className="input w-full"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Email Address"
                    className="input w-full"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <input
                    placeholder="Phone Number"
                    className="input w-full"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-[#D87D4A] tracking-widest font-bold mb-4">
                SHIPPING INFO
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <input
                    placeholder="Address"
                    className="input w-full"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="ZIP Code"
                    className="input w-full"
                    value={form.zip}
                    onChange={(e) => handleChange("zip", e.target.value)}
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm">{errors.zip}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="City"
                    className="input w-full"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <input
                    placeholder="Country"
                    className="input w-full"
                    value={form.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-[#D87D4A] tracking-widest font-bold mb-4">
                PAYMENT DETAILS
              </h3>
              <p className="text-sm font-bold mb-2">Payment Method</p>
              <div className="flex gap-4 mb-4">
                <label className="border p-3 w-full flex items-center gap-2 rounded-md">
                  <input
                    type="radio"
                    name="payment"
                    value="e-Money"
                    checked={payment === "e-Money"}
                    onChange={() => setPayment("e-Money")}
                  />
                  e-Money
                </label>
                <label className="border p-3 w-full flex items-center gap-2 rounded-md">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={payment === "Cash on Delivery"}
                    onChange={() => setPayment("Cash on Delivery")}
                  />
                  Cash on Delivery
                </label>
              </div>

              {payment === "e-Money" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      placeholder="e-Money Number"
                      className="input w-full"
                      value={form.eMoneyNumber}
                      onChange={(e) =>
                        handleChange("eMoneyNumber", e.target.value)
                      }
                    />
                    {errors.eMoneyNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.eMoneyNumber}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      placeholder="e-Money PIN"
                      className="input w-full"
                      value={form.eMoneyPin}
                      onChange={(e) =>
                        handleChange("eMoneyPin", e.target.value)
                      }
                    />
                    {errors.eMoneyPin && (
                      <p className="text-red-500 text-sm">{errors.eMoneyPin}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg w-full lg:w-1/3 h-fit">
          <h3 className="text-lg font-bold mb-6">SUMMARY</h3>

          <div className="space-y-4">
            {isClient &&
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded"
                    />
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-gray-500 text-sm">${item.price}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 font-bold text-sm">
                    x{item.quantity}
                  </p>
                </div>
              ))}
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>TOTAL</span>
              <span className="text-black font-bold">
                {isClient ? `$${total}` : ""}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-[#D87D4A] text-white py-3 font-bold tracking-wider cursor-pointer"
          >
            CONTINUE & PAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
