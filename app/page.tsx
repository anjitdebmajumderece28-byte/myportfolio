"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Download } from "lucide-react";

type Project = {
  id: number;
  title: string;
  year: number;
  short: string;
  tags: string[];
  thumb: string;
  details: string;
  github?: string;
  demo?: string;
};

const sampleProjects: Project[] = [
  {
    id: 1,
    title: "sudo.",
    year: 2025,
    short: "simple elegant sudoku game that I made for myself. Just personal project for fun!",
    tags: ["Front end", "JavaScript", "CSS"],
    thumb: "/images/sudo.png",
    details:
      "A minimal, focused Sudoku experience built with JavaScript and CSS. Designed for clarity and speed — includes a clean landing page and a built-in numpad for input.",
    github: "https://github.com/anjitdebmajumderece28-byte/sudolanding",
    demo: "https://anjitdebmajumderece28-byte.github.io/sudolanding/",
  }
];

export default function HomePage() {
  const [projects] = useState<Project[]>(sampleProjects);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selected, setSelected] = useState<Project | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisibleCount((v) => Math.min(projects.length, v + 3));
        });
      },
      { rootMargin: "200px" }
    );
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [projects.length]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f5f5] p-6 sm:p-12 antialiased">
      <header className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Anjit Deb Majumder</h1>
            <p className="mt-1 text-sm text-gray-400">Projects & Experiments</p>
            <p className="mt-1 text-sm text-gray-400">Bachelor of Technology in Electronics and Communications - Heritage Institute of Technology. 2028</p>
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-md text-sm"> <Mail size={16} /> Contact</a>
            <a href="/resume.pdf" className="inline-flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-md text-sm"> <Download size={16} /> Resume</a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <FilterPill label="All" active />
          <FilterPill label="Embedded" />
          <FilterPill label="DSP" />
          <FilterPill label="FPGA" />
          <FilterPill label="Comm" />
        </div>

        {/* Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, visibleCount).map((p) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-b from-white/1 to-white/0"
            >
              <button onClick={() => setSelected(p)} className="group block text-left w-full" aria-label={`Open ${p.title}`}>
                <div className="relative aspect-[4/3] w-full bg-gray-900">
                  <img src={p.thumb} alt={p.title} className="object-cover w-full h-full grayscale contrast-125 group-hover:scale-105 transition-transform duration-300" />
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-lg leading-snug">{p.title}</h3>
                  <p className="mt-1 text-sm text-gray-300">{p.short}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 border border-gray-700 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </section>

        <div ref={sentinelRef} className="h-12 mt-6" />

        {visibleCount >= projects.length && <p className="mt-8 text-center text-sm text-gray-400">You've reached the end — more coming soon.</p>}
      </main>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.98, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.98, y: 10 }} className="max-w-3xl w-full bg-[#0b0b0b] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative">
                <img src={selected.thumb} alt={selected.title} className="w-full object-cover h-64 grayscale" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 px-3 py-2 rounded bg-white/5">Close</button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold">{selected.title}</h2>
                <p className="mt-2 text-sm text-gray-300">{selected.details}</p>

                <div className="mt-4 flex items-center gap-3">
                  {selected.github && (
                    <a href={selected.github} target="_blank" rel="noreferrer" className="text-sm px-3 py-2 border border-gray-700 rounded-md">View on GitHub</a>
                  )}
                  {selected.demo && (
                    <a href={selected.demo} target="_blank" rel="noreferrer" className="text-sm px-3 py-2 border border-gray-700 rounded-md">Live Demo</a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer id="contact" className="max-w-5xl mx-auto mt-12 border-t border-gray-900 pt-8 text-sm text-gray-300">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <p>Electronics & Communication Engineer with an interest in AI/ML and WebDev — open to internships & collaborations.</p>
            <p className="mt-2">Email: <a href="mailto:you@example.com" className="underline">babianjit2004@gmail.com</a></p>
          </div>
          <div className="flex gap-3">
            <a href="#" className="px-3 py-2 border border-gray-700 rounded-md">LinkedIn</a>
            <a href="#" className="px-3 py-2 border border-gray-700 rounded-md">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FilterPill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={`text-sm px-3 py-1.5 rounded-full border ${active ? "border-white/40 bg-white/3" : "border-gray-800"}`}>
      {label}
    </button>
  );
}
