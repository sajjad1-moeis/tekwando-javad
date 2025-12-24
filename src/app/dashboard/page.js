"use client";

import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import WelcomeSection from "@/template/Dashboard/sections/WelcomeSection";
import NewsBanner from "@/template/Dashboard/sections/NewsBanner";
import QuickActions from "@/template/Dashboard/sections/QuickActions";
import RecentActivities from "@/template/Dashboard/sections/RecentActivities";
import EventCalendar from "@/template/Dashboard/sections/EventCalendar";
import SupportSection from "@/template/Dashboard/sections/SupportSection";

export default function DashboardPage() {
  return (
    <>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Welcome Section */}
          <WelcomeSection />

          {/* News Banner */}
          <NewsBanner />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EventCalendar />
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <QuickActions />

              <RecentActivities />
            </div>
          </div>

          {/* Support Section */}
          <SupportSection />
        </div>
      </DashboardLayout>
    </>
  );
}
