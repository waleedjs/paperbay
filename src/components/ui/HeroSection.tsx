/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Search, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        const gridHover = document.getElementById("grid-hover");
        if (gridHover) {
          gridHover.style.setProperty("--mouse-x", `${x}px`);
          gridHover.style.setProperty("--mouse-y", `${y}px`);
          gridHover.style.setProperty("opacity", "1");
        }
      }
    };

    const handleMouseLeave = () => {
      const gridHover = document.getElementById("grid-hover");
      if (gridHover) {
        gridHover.style.setProperty("opacity", "0");
      }
    };

    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.addEventListener("mousemove", handleMouseMove);
      heroSection.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener("mousemove", handleMouseMove);
        heroSection.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const categories = ["As & A Level",  "O Level","IGCSE"];

  return (
    <section
      id="hero-section"
      className="relative h-[500px] lg:h-[600px] bg-green-50 overflow-hidden flex items-center">
      <div id="grid-hover" className="absolute inset-0 grid-hover-area"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gray-800 tracking-tight transition-transform duration-300">
          Find Your{" "}
          <span className="text-primary font-heading relative inline-block transition-transform duration-300 hover:after:bg-[#e75222]">
            Exam Papers
          </span>{" "}
          Easily
        </h1>
        <p className="text-xl max-w-2xl mx-auto font-body mb-10 text-gray-600">
          Access thousands of past papers, marking schemes, and examiner reports for all major examinations.
        </p>
        <div className="flex flex-wrap justify-center gap-3 font-body">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 text-sm hover:scale-105 ${
                category === selectedCategory
                  ? "bg-[#245d51] font-body text-white shadow-md hover:bg-[#245d51]/90"
                  : "bg-white text-gray-700 shadow-sm hover:shadow-md border border-gray-100 hover:border-[#245d51]/20"
              }`}>
              {category}
            </button>
          ))}
        </div>
        <div className="max-w-2xl mx-auto relative mt-10">
          <div className="bg-white rounded-full shadow-lg p-1.5 flex items-center justify-center hover:shadow-xl transition-shadow duration-300 transform">
            <div className="bg-[#245d51]/10 xl:inline hidden rounded-full p-2">
              <Search className="w-5 h-5 text-[#245d51]" />
            </div>
            <input
              type="text"
              placeholder="Search for papers, subjects, or qualifications..."
              className="flex-1 font-body py-2 px-4 bg-transparent border-none outline-none text-gray-700"
            />
            <button className="bg-primary hover:bg-[#e75222]/90 text-white rounded-full px-6 py-2 font-medium transition-all flex items-center gap-1 hover:shadow-md">
              Search
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
