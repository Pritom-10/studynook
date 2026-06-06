
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

const socialLinks = [
  {
    href: "#",
    label: "Facebook",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Twitter",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Instagram",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
         
          <div className="space-y-5">
            <Logo dark />

            <p className="text-sm leading-relaxed">
              Your go-to platform for booking distraction-free study spaces.
              Learn smarter, stay focused, and achieve more.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {socialLinks.map(({ href, label, svg }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-200"
                >
                  {svg}
                </Link>
              ))}
            </div>

            
            <div className="pt-3">
              <p className="text-xs font-semibold text-white uppercase tracking-widest mb-3">
                Newsletter
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />

                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "All Rooms", href: "/all_rooms" },
                { label: "About Us", href: "#" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />

                <span className="text-sm leading-relaxed wrap-break-word">
                  123 Study Lane, Academic Block,
                  <br />
                  Chattagram, Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />

                <a
                  href="tel:+8801852483885"
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  +880 1852483885
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />

                <a
                  href="mailto:hello@studynook.com"
                  className="text-sm hover:text-blue-400 transition-colors break-all"
                >
                  hello@studynook.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

     
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-slate-500 hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
