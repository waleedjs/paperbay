"use client";
import Link from "next/link";
import { Home, ChevronRight, Grid, List, BookOpen } from "lucide-react";
import { useState } from "react";

export default function SatPapers() {
  const papers = Array.from({ length: 20 }, (_, i) => `IGCSE Notes ${i + 1}`);
  const [isGridView, setIsGridView] = useState(false); // Default is list view (false)

  // const toggleView = () => {
  //   setIsGridView((prev) => !prev);
  // };

  return (
    <main className="min-h-screen bg-gray-50 font-heading">
      {/* Hero Section */}
      <section className="relative py-16 bg-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading uppercase">
              IGCSE Notes
            </h1>
            <div className="w-full h-1 max-w-[100px] bg-red-500 mx-auto mt-4"></div>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex justify-center pb-6 items-center space-x-2 text-sm font-medium font-body text-gray-500">
            <Link href="/" className="flex items-center text-gray-700 hover:text-red-500">
              <Home className="h-5 w-5 mr-1" /> Home
            </Link>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500">IGCSE Notes</span>
          </nav>
        </div>

        {/* Shape Divider */}
        <div className="absolute -bottom-1 left-0 right-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#f9fafb" d="M0,64L1440,32L1440,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* View Toggle Section - Moved below hero section */}
      <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-4">
        <div className="flex justify-end items-center">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              onClick={() => setIsGridView(false)}
              className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 ${
                !isGridView ? "bg-red-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
              title="List View"
              aria-label="Switch to list view">
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsGridView(true)}
              className={`flex items-center justify-center p-2 rounded-md ml-1 transition-all duration-200 ${
                isGridView ? "bg-red-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Grid View"
              aria-label="Switch to grid view">
              <Grid className="h-5 w-5" />
            </button>
          </div>
          <div className="ml-3 text-sm text-gray-500 font-medium">{isGridView ? "Grid View" : "List View"}</div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 pb-16">
        <ul className={`${isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}`}>
          {papers.map((paper, index) => (
            <li key={index}>
              <Link
                href={`https://example.com/sat-paper-${index + 1}.pdf`}
                target="_blank"
                className={`p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors duration-200 group block ${
                  isGridView ? "flex flex-col items-center text-center" : "flex items-center"
                }`}>
                <BookOpen
                  className={`w-5 h-5 text-red-500 group-hover:scale-110 transition-transform ${
                    isGridView ? "mb-2" : "mr-3"
                  }`}
                />
                <span className="font-medium text-gray-800 group-hover:text-red-500 transition-colors duration-200">
                  {paper}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
