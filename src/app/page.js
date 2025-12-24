"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleGoToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* ویدیو */}
      <video
        ref={videoRef}
        className="w-full h-screen object-cover"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* متن در پایین ویدیو */}
      {videoEnded && (
        <div
          onClick={handleGoToLogin}
          className="absolute inset-x-0 m-auto size-max  top-[58%]  text-white text-xl md:text-2xl font-semibold cursor-pointer hover:text-green-400 transition-colors animate-fade-in"
        >
          برای ادامه، وارد حساب کاربری خود شوید
        </div>
      )}
    </div>
  );
}
