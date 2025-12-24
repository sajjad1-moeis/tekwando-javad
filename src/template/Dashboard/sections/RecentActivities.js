"use client";

import React from "react";

const activities = [
  { activity: "پرداخت موفق عضویت", date: "امروز – ۱۰:۱۵" },
  { activity: "ثبت نام در دوره مربیگری", date: "دیروز" },
  { activity: "ثبت نام در دوره مربیگری", date: "دیروز" },
];

export default function RecentActivities() {
  return (
    <div className="bg-sidebar rounded-2xl p-3 overflow-hidden">
      <h3 className="text-lg text-white mb-4 text-right">۳ فعالیت اخیر شما</h3>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-right py-3 px-4  font-thin text-body text-sm bg-[#404040]">فعالیت</th>
              <th className="text-right py-3 font-thin  text-body text-sm bg-[#404040]">تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item, index) => (
              <tr key={index} className={index === activities.length - 1 ? "" : "border-b border-[#404040]"}>
                <td className="py-3 px-4 text-white text-right bg-dark-bg">{item.activity}</td>
                <td className="py-3 text-[#A0A0A0]  bg-dark-bg">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
