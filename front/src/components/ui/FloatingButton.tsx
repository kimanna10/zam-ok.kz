"use client";

import { IoLogoWhatsapp } from "react-icons/io5";

export default function FloatingButton() {
  return (
    <button
      className="fixed bottom-6 right-4 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center transition"
      aria-label="Связаться с нами"
      onClick={() => window.open("https://wa.me/77017887185", "_blank")} // сюда вставь свой номер WhatsApp
    >
      <IoLogoWhatsapp size={28} />
    </button>
  );
}
