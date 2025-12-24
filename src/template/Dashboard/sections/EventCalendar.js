"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/green.css";

// رویدادهای نمونه - در آینده از API می‌آید
// ساختار: { day: number, title: string, date: string, color: "green" | "yellow" | "red" }
const eventsData = [
  { day: 17, title: "مسابقات قهرمانی کشور", date: "۱۷ اسفند", color: "green" },
  { day: 26, title: "دوره مربیگری درجه ۳", date: "۲۶ اسفند", color: "yellow" },
];

// تبدیل به object برای استفاده در mapDays
const calendarEvents = eventsData.reduce((acc, event) => {
  acc[event.day] = event.color;
  return acc;
}, {});

const upcomingEvents = eventsData
  .sort((a, b) => a.day - b.day)
  .map((event) => ({
    title: event.title,
    date: event.date,
    color: event.color === "green" ? "bg-[#44D879]" : event.color === "yellow" ? "bg-yellow-500" : "bg-[#B93335]",
  }));
console.log(upcomingEvents);
export default function EventCalendar() {
  return (
    <div className="bg-sidebar rounded-2xl p-3 ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg  text-white">تقویم رویدادها</h3>
        <a href="#" className="text-green-400 hover:text-green-100 flex items-center gap-1 text-sm">
          <span>مشاهده کامل رویدادها</span>
          <ArrowLeft className="w-4 h-4" />
        </a>
      </div>

      {/* Calendar Container */}
      <div className="w-full overflow-hidden mb-6">
        <Calendar
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-center"
          className="rmdp-green !border-0"
          style={{
            boxShadow: "none",
            border: "none",
            width: "100%",
            maxWidth: "100%",
          }}
          mapDays={({ date }) => {
            // در react-multi-date-picker با calendar="persian"، date.day مستقیماً روز شمسی است
            const dayNumber = date.day;
            const eventColor = calendarEvents[dayNumber];

            // بررسی امروز بودن
            const today = new Date();
            const jalaali = require("jalaali-js");
            const jToday = jalaali.toJalaali(today);
            const isToday = date.year === jToday.jy && date.month.number === jToday.jm && date.day === jToday.jd;

            const props = {};

            if (isToday) {
              props.className = "rmdp-day rmdp-today rmdp-day-active";
            }

            if (eventColor) {
              props["data-event-color"] = eventColor;
              props.className = `${props.className || ""} rmdp-day-with-event`.trim();
            }

            return props;
          }}
        />
      </div>

      {/* Upcoming Events */}
      <div className="mt-4 bg-[#333333] rounded-2xl p-3">
        <h3 className="text-sm text-caption mb-3">نزدیک ترین رویداد ها</h3>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex-between gap-3 text-sm">
              <div className="flex-center gap-2">
                <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                <p className="text-white font-medium ">{event.title}</p>
              </div>
              <p className="text-body text-sm">{event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
