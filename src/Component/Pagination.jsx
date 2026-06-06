"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goTo = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        ‹
      </button>

      
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => goTo(page)}
            className={`w-9 h-9 rounded-xl border font-bold text-sm transition
              ${
                currentPage === page
                  ? "bg-green-800 text-white border-green-800"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"
              }`}
          >
            {page}
          </button>
        );
      })}

     
      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        ›
      </button>
    </div>
  );
}
