import React from "react";

export default function SectionContainer({ title, description, children }) {
  return (
    <div dir="rtl">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mt-4">{title}</h1>
        {description && <p className="text-gray-500 text-sm mt-3">{description}</p>}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
