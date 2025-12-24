import React from "react";
import BackgroundIllustration from "@/template/Auth/BackgroundIllustration";
import SectionContainer from "@/template/Auth/common/SectionContainer";
import Image from "next/image";

export default function AuthLayout({ children, variant = "login", title, desc }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-9 bg-dark-bg">
      <div className="col-span-1 lg:col-span-4 bg-dark-bg  flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          <Image src={"/Logo.png"} className="mx-auto" width={93} height={96} alt="logo" />

          <SectionContainer title={title} description={desc} />
          {children}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-5 relative">
        <BackgroundIllustration variant={variant} />
      </div>
    </div>
  );
}
