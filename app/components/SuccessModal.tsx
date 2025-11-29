"use client";
import React from "react";

interface Props {
    message: string;
    onClose: () => void;
}

export default function SuccessModal({ message, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white p-8 rounded-xl w-[350px] shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-3">You have been registered successfully</h2>

        <p className="text-[16px] mb-6">{message}</p>

        <button
          onClick={onClose}
          className="bg-green-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
