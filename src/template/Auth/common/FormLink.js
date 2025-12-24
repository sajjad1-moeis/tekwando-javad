"use client";

import React from "react";

export default function FormLink({ text, linkText, onClick }) {
  return (
    <div className=" mt-6 text-sm">
      <span className="text-gray-400 me-2">{text}</span>
      <button type="button" onClick={onClick} className="text-green-500 hover:text-green-400 transition-colors">
        {linkText}
      </button>
    </div>
  );
}
