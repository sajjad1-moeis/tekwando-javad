"use client";

import React, { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { Notification, NotificationBing } from "iconsax-reactjs";

export default function DashboardHeader() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-sidebar rounded-2xl p-3">
      <div className="flex items-center justify-between">
        {/* Right Side - Search */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A0A0A0] pointer-events-none" />
            <input
              type="text"
              placeholder="جستجو"
              className="bg-dark-bg border border-[#333333] rounded-lg pr-10 pl-4 py-2.5 text-white placeholder-[#A0A0A0] focus:outline-none focus:border-green-500 w-64 text-sm"
            />
          </div>
        </div>
        {/* Left Side - User Profile & Notifications */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors">
            <NotificationBing className="w-6 h-6 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <img src="/user.png" alt="Profile" className="size-10 rounded-full object-cover " />
            </div>
            <span className="text-body text-base">هادی ساعی</span>
            <ChevronDown className=" text-[#8A8A8A] " />
          </button>
        </div>
      </div>
    </header>
  );
}
