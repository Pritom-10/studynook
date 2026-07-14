"use client";
import { Button } from "@heroui/react";
import { ArrowRight, Star, Play, MapPin, BookOpen, Zap } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32  from-blue-50 via-slate-50 to-slate-50">
      <Swiper
        navigation
        pagination={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full border border-blue-600/20 text-blue-600 font-bold text-sm animate-bounce-slow">
                  <Star className="w-4 h-4 fill-blue-600" />
                  <span>Trusted by 10,000+ Students Worldwide</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Study Smarter with
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">
                    StudyNook
                  </span>
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                  Access high-quality courses, organized study materials, and a
                  distraction-free learning experience designed to help students
                  learn faster and stay consistent.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/all_rooms">
                    <Button
                      href="/all_rooms"
                      color="primary"
                      size="lg"
                      className="h-14 px-10 text-lg font-bold rounded-full shadow-2xl shadow-blue-600/30 group"
                    >
                      Explore Rooms
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-8 pt-2">
                  {[
                    { value: "10K+", label: "Students" },
                    { value: "50+", label: "Study Rooms" },
                    { value: "4.9★", label: "Avg Rating" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-extrabold text-slate-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop"
                    alt="Learning"
                    fill
                    className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                          <Image
                            key={i}
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                            alt="avatar"
                          />
                        ))}
                      </div>
                      <div>
                        <p className="font-bold text-sm">Lets start study</p>
                        <p className="text-xs text-slate-500">
                          500+ new booking today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 rounded-full border border-green-600/20 text-green-600 font-bold text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>50+ Premium Study Rooms Available</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Find Your{" "}
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-green-500 to-green-700">
                    Perfect Room
                  </span>{" "}
                  Instantly
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                  Browse private cabins, group study halls, and silent zones.
                  Filter by capacity, amenities, and price — then book in
                  seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/all_rooms">
                    <Button
                      href="/all_rooms"
                      size="lg"
                      className="h-14 px-10 text-lg font-bold rounded-full bg-green-600 text-white shadow-2xl shadow-green-600/30 group hover:bg-green-700"
                    >
                      Browse Rooms
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-8 pt-2">
                  {[
                    { value: "50+", label: "Study Rooms" },
                    { value: "24/7", label: "Availability" },
                    { value: "4.9★", label: "Avg Rating" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-extrabold text-slate-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-green-400 to-green-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                    alt="Study Room"
                    fill
                    className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white/30 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">
                            Silent Zone — Floor 3
                          </p>
                          <p className="text-xs text-slate-500">
                            Capacity: 1–2 people
                          </p>
                        </div>
                      </div>
                      <span className="text-green-600 font-extrabold text-sm bg-green-50 px-3 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 rounded-full border border-purple-600/20 text-purple-600 font-bold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Boost Your Focus & Productivity</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Learn Without{" "}
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-purple-700">
                    Limits
                  </span>
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                  A distraction-free environment with high-speed Wi-Fi,
                  whiteboards, and everything you need to stay in the zone and
                  get things done.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/all_rooms">
                    <Button
                      size="lg"
                      className="h-14 px-10 text-lg font-bold rounded-full bg-purple-600 text-white shadow-2xl shadow-purple-600/30 group hover:bg-purple-700"
                    >
                      Start Studying
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Amenities pills */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    "High-speed WiFi",
                    "Whiteboards",
                    "AC Rooms",
                    "Power Outlets",
                    "Quiet Zones",
                  ].map((amenity) => (
                    <span
                      key={amenity}
                      className="px-4 py-1.5 bg-purple-50 text-purple-700 text-sm font-semibold rounded-full border border-purple-100"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-purple-400 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video lg:aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
                    alt="Focused studying"
                    fill
                    className="rounded-[2rem] object-cover transform transition duration-700 group-hover:scale-105"
                  />
                  {/* Floating progress card */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white/30 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <p className="font-bold text-sm">
                            Today focus session
                          </p>
                          <p className="text-sm font-bold text-purple-600">
                            3h 20m
                          </p>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full w-[72%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
