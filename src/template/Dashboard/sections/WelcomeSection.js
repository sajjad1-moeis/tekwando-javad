"use client";

import React from "react";

export default function WelcomeSection() {
  return (
    <div className="bg-sidebar rounded-2xl p-4 border border-[#2A2A2A]">
      <div className="flex items-center justify-between">
        {/* Right Side - Welcome Message */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl  text-white">خوش آمدید، هادی 👋</h2>
          <p className="text-caption">خوشحالیم که به سامانه مدیریت یکپارچه تکواندو ایران بازگشتید</p>
        </div>

        {/* Left Side - User Info */}
        <div className="flex items-center gap-4 ">
          <div className="text-sm text-[#FCFCFC]">
            <span className="text-body">آخرین ورود:</span> امروز ۱۰:۴۵
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-body">نقش کاربری:</span>
            <div className="flex items-center gap-2 bg-[#1F3A2B] rounded-lg px-3 py-1.5 ">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-green-400 text-sm">استاد</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
