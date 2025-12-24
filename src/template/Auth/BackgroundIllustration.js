import React from "react";

export default function BackgroundIllustration({ className = "", variant = "login" }) {
  // Background image paths - شما می‌توانید این مسیرها را با مسیر تصاویر واقعی جایگزین کنید
  const backgroundImage = !(variant === "login") ? "/Auth/Login.png" : "/Auth/SignUp.png";

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay for better text readability */}
      </div>

      {/* Decorative gradient overlay - Iranian flag colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-red-600/20" />

      {/* Additional decorative text overlay */}
      <div className="absolute bottom-10 left-10 text-white/10 text-7xl font-bold">IRI</div>
      <div className="absolute top-10 right-10 text-white/5 text-5xl font-bold">F</div>
    </div>
  );
}
