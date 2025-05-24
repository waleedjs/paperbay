"use client";
import Link from "next/link";
import { Home, ChevronRight, Grid, List, FileText, Search, Filter, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function TopicalPastPapers() {
  // Sample data for topical past papers
  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"];

  const topicalPapers = [
    {
      id: 1,
      subject: "Mathematics",
      topic: "Algebra",
      years: "2018-2022",
      pdfUrl: "/sample-papers/math-algebra.pdf", // Sample PDF URL
    },
    {
      id: 2,
      subject: "Mathematics",
      topic: "Calculus",
      years: "2018-2022",
      pdfUrl: "/sample-papers/math-calculus.pdf",
    },
    {
      id: 3,
      subject: "Mathematics",
      topic: "Geometry",
      years: "2018-2022",
      pdfUrl: "/sample-papers/math-geometry.pdf",
    },
    {
      id: 4,
      subject: "Physics",
      topic: "Mechanics",
      years: "2018-2022",
      pdfUrl: "/sample-papers/physics-mechanics.pdf",
    },
    {
      id: 5,
      subject: "Physics",
      topic: "Electricity",
      years: "2018-2022",
      pdfUrl: "/sample-papers/physics-electricity.pdf",
    },
    {
      id: 6,
      subject: "Physics",
      topic: "Waves",
      years: "2018-2022",
      pdfUrl: "/sample-papers/physics-waves.pdf",
    },
    {
      id: 7,
      subject: "Chemistry",
      topic: "Organic Chemistry",
      years: "2018-2022",
      pdfUrl: "/sample-papers/chemistry-organic.pdf",
    },
    {
      id: 8,
      subject: "Chemistry",
      topic: "Inorganic Chemistry",
      years: "2018-2022",
      pdfUrl: "/sample-papers/chemistry-inorganic.pdf",
    },
    {
      id: 9,
      subject: "Biology",
      topic: "Cell Biology",
      years: "2018-2022",
      pdfUrl: "/sample-papers/biology-cell.pdf",
    },
    {
      id: 10,
      subject: "Biology",
      topic: "Genetics",
      years: "2018-2022",
      pdfUrl: "/sample-papers/biology-genetics.pdf",
    },
    {
      id: 11,
      subject: "English",
      topic: "Comprehension",
      years: "2018-2022",
      pdfUrl: "/sample-papers/english-comprehension.pdf",
    },
    {
      id: 12,
      subject: "Computer Science",
      topic: "Programming",
      years: "2018-2022",
      pdfUrl: "/sample-papers/cs-programming.pdf",
    },
  ];

  const [isGridView, setIsGridView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  // Filter papers based on search term and selected subject
  const filteredPapers = topicalPapers.filter((paper) => {
    const matchesSearch =
      paper.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject = selectedSubject === "All" || paper.subject === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  return (
    <main className="min-h-screen bg-gray-50 font-heading">
      {/* Hero Section */}
      <section className="relative py-16 bg-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading uppercase">
              Topical Past Papers
            </h1>
            <div className="w-full h-1 max-w-[100px] bg-red-500 mx-auto mt-4"></div>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex justify-center pb-6 items-center space-x-2 text-sm font-medium font-body text-gray-500">
            <Link href="/" className="flex items-center text-gray-700 hover:text-red-500">
              <Home className="h-5 w-5 mr-1" /> Home
            </Link>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500">Topical Past Papers</span>
          </nav>
        </div>

        {/* Shape Divider */}
        <div className="absolute -bottom-1 left-0 right-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#f9fafb" d="M0,64L1440,32L1440,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Search by subject or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Subject Filter */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}>
                <option value="All">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-end md:justify-start">
              <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                <button
                  onClick={() => setIsGridView(false)}
                  className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 ${
                    !isGridView ? "bg-red-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
                  }`}
                  title="List View"
                  aria-label="Switch to list view">
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsGridView(true)}
                  className={`flex items-center justify-center p-2 rounded-md ml-1 transition-all duration-200 ${
                    isGridView ? "bg-red-500 text-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
                  }`}
                  title="Grid View"
                  aria-label="Switch to grid view">
                  <Grid className="h-5 w-5" />
                </button>
              </div>
              <div className="ml-3 text-sm text-gray-500 font-medium hidden md:block">
                {isGridView ? "Grid View" : "List View"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Papers List */}
      <div className="max-w-[1280px] mx-auto px-4 pb-16">
        {filteredPapers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No past papers found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSubject("All");
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <ul className={`${isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}`}>
            {filteredPapers.map((paper) => (
              <li key={paper.id}>
                <div
                  className={`p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors duration-200 group ${
                    isGridView ? "flex flex-col items-center text-center" : "flex items-center"
                  }`}>
                  <FileText
                    className={`w-5 h-5 text-red-500 group-hover:scale-110 transition-transform ${
                      isGridView ? "mb-2" : "mr-3"
                    }`}
                  />
                  <div className={`${isGridView ? "text-center" : "flex-grow"}`}>
                    <span className="font-medium text-gray-800 group-hover:text-red-500 transition-colors duration-200 block">
                      {paper.subject}: {paper.topic}
                    </span>
                    <span className="text-sm text-gray-500 block">Years: {paper.years}</span>
                  </div>

                  <div
                    className={`${
                      isGridView ? "mt-3 flex justify-center space-x-2" : "ml-auto flex items-center space-x-2"
                    }`}>
                    {/* Download Button */}
                    <a
                      href={paper.pdfUrl}
                      download={`${paper.subject}-${paper.topic}-${paper.years}.pdf`}
                      className="text-gray-600 hover:text-red-500 rounded-md hover:bg-gray-100 transition-colors"
                      title="Download PDF">
                      {" "}
                      <button className="bg-gray-100 text-gray-600 hover:bg-secondery  hover:text-white px-3 py-1 rounded transition-colors flex items-center space-x-1">
                      <span>Download</span>
                      <Download className="h-4 w-4" />
                    </button>
                    </a>

                    {/* View Button */}
                    <button className="bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white px-3 py-1 rounded transition-colors flex items-center space-x-1">
                      <span>View</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
