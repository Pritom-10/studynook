
import Link from "next/link";
import { BookOpen } from "lucide-react";

const Logo = ({ dark = false }) => (
  <Link href="/" className="flex items-center gap-3">
    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
      <BookOpen className="w-5 h-5 text-white" />
    </div>
    <span
      className={`text-xl font-bold ${dark ? "text-white" : "text-slate-900"}`}
    >
      Study<span className="text-blue-600">Nook</span>
    </span>
  </Link>
);

export default Logo;
