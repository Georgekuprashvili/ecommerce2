"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useCartStore } from "../../app/common/Store/useCartStore";
import { api } from "../../app/common/api";

const CartDrawer = () => {
  const { items, updateQuantity, clearCart, total, removeItem } =
    useCartStore();

  const syncCartWithBackend = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const items = useCartStore.getState().items;

    try {
      await api.post(
        "/api/cart",
        { items },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(" Cart synced with MongoDB");
    } catch (error) {
      console.error(" Failed to sync cart:", error);
    }
  };

  useEffect(() => {
    syncCartWithBackend();
  }, []);

  return (
    <div className="absolute top-24 right-8 max-sm:left-1/2 max-sm:w-full max-sm::right-auto max-sm:-translate-x-1/2 w-[375px] bg-white rounded-lg shadow-xl z-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-black">CART ({items.length})</h2>
        {items.length > 0 && (
          <button
            onClick={() => {
              clearCart();
              syncCartWithBackend();
            }}
            className="text-sm underline text-gray-500"
          >
            Remove all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 font-medium">Cart is empty</p>
      ) : (
        <>
          <div className="flex flex-col gap-6 max-h-[300px] overflow-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Optional image display */}
                  {/* <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded"
                  /> */}
                  <div className="text-left">
                    <p className="font-bold text-sm text-black">{item.name}</p>
                    <p className="text-gray-500 text-sm">${item.price}</p>
                  </div>
                </div>

                <div className="flex gap-[10px]">
                  <div className="flex items-center gap-2 bg-[#D87D4A] px-2 py-1">
                    <button
                      className="text-amber-50 font-bold cursor-pointer"
                      onClick={() => {
                        updateQuantity(item.id, Math.max(1, item.quantity - 1));
                        syncCartWithBackend();
                      }}
                    >
                      -
                    </button>
                    <span className="mx-1 text-sm text-amber-50 font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="text-amber-50 font-bold cursor-pointer"
                      onClick={() => {
                        updateQuantity(item.id, item.quantity + 1);
                        syncCartWithBackend();
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      removeItem(item.id);
                      syncCartWithBackend();
                    }}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center font-bold mt-6 text-black text-lg">
            <p>TOTAL</p>
            <p>${total()}</p>
          </div>

          <button
            onClick={() => (window.location.href = "/checkout")}
            className="w-full bg-[#D87D4A] text-white py-3 mt-6 font-bold text-sm tracking-[1px] cursor-pointer"
          >
            CHECKOUT
          </button>
        </>
      )}
    </div>
  );
};

export default CartDrawer;
