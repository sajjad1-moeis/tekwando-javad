"use client";

import React from "react";
import DashboardHeader from "@/template/Dashboard/DashboardHeader";
import DashboardSidebar from "@/template/Dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen  flex p-6 gap-8 background-sidebar">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Content */}
        <main className="flex-1 mt-6">{children}</main>
      </div>
    </div>
  );
}
