import {
  Clock,
  ShieldCheck,
  SlidersHorizontal,
  Wallet
} from "lucide-react";
const WhyStudyNook = () => {
  const features = [
    {
      icon: Clock,
      title: "Real-time availability",
      description:
        "See which rooms are free right now. Book instantly without refreshing or guessing.",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: ShieldCheck,
      title: "Guaranteed booking",
      description:
        "Once you book, the space is yours. No double bookings, no surprises when you arrive.",
      bg: "bg-green-50",
      iconColor: "text-green-700",
    },
    {
      icon: SlidersHorizontal,
      title: "Filter by your needs",
      description:
        "Need a quiet solo room or space for a group? Filter by amenities, capacity, and price.",
      bg: "bg-amber-50",
      iconColor: "text-amber-700",
    },
    {
      icon: Wallet,
      title: "Transparent pricing",
      description:
        "Clear hourly rates with no hidden fees. Pay only for the time you actually use.",
      bg: "bg-pink-50",
      iconColor: "text-pink-700",
    },
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
    
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mb-5">
          Why StudyNook
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-normal leading-tight mb-4">
          The smarter way to{" "}
          <span className="italic">book your study space</span>
        </h2>
        <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
          No more waiting in lines or uncertain availability. StudyNook gives
          you full control of your learning environment.
        </p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-white border border-slate-200 rounded-2xl p-7 hover:-translate-y-1 hover:border-slate-300 transition-all duration-300"
          >
            <div
              className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-5`}
            >
              <f.icon className={`w-5 h-5 ${f.iconColor}`} />
            </div>
            <h3 className="text-base font-semibold mb-2 text-slate-800">
              {f.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyStudyNook;
