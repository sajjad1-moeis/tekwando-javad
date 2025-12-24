import React from "react";
import { Button } from "@/components/ui/button";
import { Whatsapp } from "iconsax-reactjs";

export default function SupportSection() {
  return (
    <div className="bg-sidebar rounded-2xl p-3">
      <div className="flex items-center justify-between gap-6">
        {/* Right Side - Title and Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg  text-white">نیاز به راهنمایی دارید؟</h3>
          <p className="text-caption">در صورت وجود هرگونه مشکل از طریق پشتیبانی سامانه با ما در ارتباط باشید.</p>
        </div>

        {/* Center - Phone Number with WhatsApp Icon */}

        <div class="flex gap-4">
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/09131234567"
              className="flex items-center gap-2 text-white hover:text-green-500 transition-colors"
            >
              <Whatsapp className="w-6 h-6" />
              <span>۰۹۱۳۱۲۳۴۵۶۷</span>
            </a>
          </div>
          {/* Left Side - Support Ticket Button */}
          <Button className="bg-[#E5E7EB1F] h-12 hover:bg-[#3A3A3A] rounded-lg text-white py-3 px-6  transition-colors  whitespace-nowrap">
            ارسال تیکت پشتیبانی
          </Button>
        </div>
      </div>
    </div>
  );
}
