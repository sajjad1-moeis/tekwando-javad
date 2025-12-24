"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: 1,
    image: "/banner.png",
    title: "کسب ۹ مدال رنگارنگ پاراتکواندوکاران ایران در پایان مسابقات",
    description: "پرونده تیم ملی پاراتکواندو ایران در بازی های پاراآسیایی جوانان دبی ۲۰۲۵ با کسب ۹ مدال بسته شد.",
  },
  {
    id: 2,
    image: "/banner.png",
    title: "عنوان خبر دوم",
    description: "توضیحات خبر دوم",
  },
  {
    id: 3,
    image: "/banner.png",
    title: "عنوان خبر سوم",
    description: "توضیحات خبر سوم",
  },
];

export default function NewsBanner() {
  return (
    <div className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden ">
      <Carousel
        opts={{
          align: "end",
          loop: false,
        }}
        className="w-full h-40 md:h-64"
        dir="rtl"
      >
        <CarouselContent>
          {newsItems.map((item) => (
            <CarouselItem key={item.id} className="basis-full">
              <div className="relative h-40 md:h-64 w-full">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 liner-slider z-50" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 px-6 right-0 pointer-events-none text-right flex-between w-full z-[555]">
                  <Button className="flex items-center gap-2 text-white bg-white/15 px-4 py-2 rounded-lg">
                    <ArrowLeft className="w-4 h-4" />
                    <span>مشاهده جزئیات</span>
                  </Button>
                  <div class="">
                    <h3 className="text-2xl  font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-body text-sm mb-4">{item.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
