"use client";

import { Book1, MedalStar, Refresh, ScanBarcode } from "iconsax-reactjs";
import React from "react";

const actions = [
  {
    id: "digital-card",
    label: "ثبت نام مسابقه",
    icon: MedalStar,
    color: "bg-green-400 hover:bg-green-600 text-[#1F3A2B]",
  },
  {
    id: "renew-membership",
    label: "ثبت نام دوره",
    icon: Book1,
    color: "bg-[#E74C3C] hover:bg-[#A82A2C]",
  },
  {
    id: "course-registration",
    label: "تمدید عضویت",
    icon: Refresh,
    color: "bg-green-400 hover:bg-green-600 text-[#1F3A2B]",
  },
  {
    id: "competition-registration",
    label: "کارت دیجیتال",
    icon: ScanBarcode,
    color: "bg-[#E74C3C] hover:bg-[#A82A2C]",
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 rounded-2xl bg-sidebar">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            className={`${action.color} overflow-hidden relative text-white py-3 rounded-xl flex flex-col items-center justify-center gap-3 transition-colors`}
          >
            <div class="absolute -top-1/4 -left-1/4 -rotate-[20deg] ">
              <Icon variant="Bold" size={94} className=" text-white/10 " var />
            </div>
            <Icon variant="Bold" size={48} />
            <span className="text-lg text-center">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
