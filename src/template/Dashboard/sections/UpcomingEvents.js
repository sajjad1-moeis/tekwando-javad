"use client";

import React from "react";

const events = [
  { title: "مسابقات قهرمانی کشور", date: "۲۵ اسفند", color: "bg-green-500" },
  { title: "دوره مربیگری درجه ۳", date: "۲۶ اسفند", color: "bg-yellow-500" },
];

export default function UpcomingEvents() {
  return (
    <div className="bg-sidebar rounded-lg p-6 border border-[#2A2A2A]">
      <h3 className="text-xl font-bold text-white mb-4">نزدیک ترین رویداد ها</h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
            <div className="flex-1">
              <p className="text-white font-medium">{event.title}</p>
              <p className="text-[#A0A0A0] text-sm">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
