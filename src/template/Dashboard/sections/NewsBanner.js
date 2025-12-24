"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const newsItems = [
  {
    id: 1,
    image: "/placeholder-news.jpg",
    title: "کسب ۹ مدال رنگارنگ پاراتکواندوکاران ایران در پایان مسابقات",
    description: "پرونده تیم ملی پاراتکواندو ایران در بازی های پاراآسیایی جوانان دبی ۲۰۲۵ با کسب ۹ مدال بسته شد.",
  },
  {
    id: 2,
    image: "/placeholder-news.jpg",
    title: "عنوان خبر دوم",
    description: "توضیحات خبر دوم",
  },
  {
    id: 3,
    image: "/placeholder-news.jpg",
    title: "عنوان خبر سوم",
    description: "توضیحات خبر سوم",
  },
];

export default function NewsBanner() {
  return (
    <div className="relative bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2A2A2A]">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full h-64 md:h-80"
      >
        <CarouselContent>
          {newsItems.map((item) => (
            <CarouselItem key={item.id} className="basis-full">
              <div className="relative h-64 md:h-80 w-full">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-[#D0D0D0] text-sm md:text-base mb-4">{item.description}</p>
                  <button className="flex items-center gap-2 bg-[#44D879] hover:bg-[#3BC869] text-white px-4 py-2 rounded-lg transition-colors">
                    <span>مشاهده جزئیات</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
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
