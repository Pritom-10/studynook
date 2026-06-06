import { Button } from "@heroui/react";
import Link from "next/link";
import {
  Search,
  CalendarPlus,
  CheckCheck,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Browse & filter rooms",
    description:
      "Explore available study rooms. Filter by floor, capacity, amenities, and hourly rate.",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-50 text-blue-600",
  },
  {
    step: "02",
    icon: CalendarPlus,
    title: "Pick your time slot",
    description:
      "Choose your preferred date and time. The calendar shows real-time availability.",
    bg: "bg-green-50",
    iconColor: "text-green-700",
    badgeBg: "bg-green-50 text-green-700",
  },
  {
    step: "03",
    icon: CheckCheck,
    title: "Confirm & show up",
    description:
      "Confirm your booking and get a summary. Simply arrive at the room and start studying.",
    bg: "bg-amber-50",
    iconColor: "text-amber-700",
    badgeBg: "bg-amber-50 text-amber-700",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto border-t border-slate-100">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-green-700 bg-green-50 px-4 py-1.5 rounded-full mb-5">
          How it works
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-normal leading-tight mb-4">
          Book a room in <span className="italic">three simple steps</span>
        </h2>
        <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
          From browsing to sitting down with your books — the whole process
          takes under two minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className="flex flex-col items-center text-center relative"
          >
            
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-slate-200" />
            )}

           
            <div
              className={`w-16 h-16 rounded-full ${s.bg} border border-slate-200 flex items-center justify-center mb-6`}
            >
              <s.icon className={`w-5 h-5 ${s.iconColor}`} />
            </div>

           
            <span
              className={`text-xs font-semibold tracking-widest uppercase ${s.badgeBg} px-3 py-1 rounded-full mb-3`}
            >
              Step {s.step}
            </span>

            <h3 className="text-base font-semibold text-slate-800 mb-2">
              {s.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-55">
              {s.description}
            </p>
          </div>
        ))}
      </div>

   
      <div className="text-center mt-12">
        <Link href="/all_rooms">
          <Button color="primary" className="px-8 font-semibold rounded-xl">
            Start Browsing →
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
