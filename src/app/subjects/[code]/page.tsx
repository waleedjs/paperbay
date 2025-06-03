"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the type for params
interface Params {
  code: string;
}

// Define the props type for the page
interface Props {
  params: Params;
}

export default function SubjectDetailPage({ params }: Props) {
  const subject = subjects.find((s) => s.code === params.code);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeYearTab, setActiveYearTab] = useState("all");
  const router = useRouter();

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Subject not found</h1>
          <p className="mb-4">The subject you are looking for does not exist.</p>
          <button
            onClick={() => router.back()}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Go back to subjects
          </button>
        </div>
      </div>
    );
  }

  // Generate years from 2010 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2009 },
    (_, i) => (currentYear - i).toString()
  );

  // Filter papers based on search and active year tab
  const filteredPapers = papers
    .filter((paper) => paper.subjectCode === subject.code)
    .filter((paper) => {
      if (activeYearTab !== "all") {
        return paper.year === activeYearTab;
      }
      return true;
    })
    .filter((paper) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          paper.title.toLowerCase().includes(query) ||
          paper.year.toLowerCase().includes(query) ||
          paper.session.toLowerCase().includes(query)
        );
      }
      return true;
    });

  // Group papers by year and session
  const papersByYear = years
    .map((year) => {
      const papersForYear = filteredPapers.filter((paper) => paper.year === year);

      // Group by session
      const sessions = ["March", "May-June", "Oct-Nov"];
      const papersBySession = sessions
        .map((session) => {
          return {
            session,
            papers: papersForYear.filter((paper) => paper.session === session),
          };
        })
        .filter((group) => group.papers.length > 0);

      return {
        year,
        sessions: papersBySession,
        hasPapers: papersForYear.length > 0,
      };
    })
    .filter((yearGroup) => yearGroup.hasPapers);

  // Function to open PDF in a new tab with Google Docs Viewer
  const openPdfViewer = (pdfUrl: string) => {
    const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
    window.open(googleDocsUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <button
              onClick={() =>
                router.push(subject.level === "A-Level" ? "past-papers/as-a-level" : "/igcse")
              }
              className="text-primary hover:underline font-medium"
            >
              {subject.level === "A-Level" ? "All A-Level Subjects" : "All IGCSE Subjects"}
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mx-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-600">{subject.name}</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            {subject.name} {subject.code} {subject.level} Past Papers
          </h1>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search this page"
              className="w-full sm:w-64 pl-10 py-2 pr-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View:</span>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Year Tabs */}
        <div className="mb-8">
          <div className="bg-white shadow-sm rounded-md p-2">
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setActiveYearTab("all")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeYearTab === "all"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYearTab(year)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    activeYearTab === year
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Papers List/Grid */}
        {papersByYear.length > 0 ? (
          <div className="space-y-8">
            {papersByYear.map((yearGroup) => (
              <div
                key={yearGroup.year}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-secondery px-6 py-3 text-white font-heading font-medium">
                  {yearGroup.year}
                </div>

                <div className="p-6">
                  {yearGroup.sessions.map((sessionGroup) => (
                    <div key={sessionGroup.session} className="mb-6 last:mb-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        {sessionGroup.session}
                      </h3>

                      {viewMode === "list" ? (
                        <div className="space-y-2">
                          {sessionGroup.papers.map((paper) => (
                            <div
                              key={paper.id}
                              className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex-shrink-0 mr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 text-red-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 006 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                  />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {paper.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {paper.year} {paper.session} • Paper {paper.paperNumber}
                                </p>
                              </div>
                              <div className="flex-shrink-0 ml-2 space-x-2">
                                <button
                                  onClick={() => openPdfViewer(paper.pdfUrl)}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                  View
                                </button>
                                <a
                                  href={paper.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                  </svg>
                                  Download
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {sessionGroup.papers.map((paper) => (
                            <div
                              key={paper.id}
                              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center justify-center h-16 mb-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-12 w-12 text-red-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 006 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                  />
                                </svg>
                              </div>
                              <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">
                                {paper.title}
                              </h4>
                              <p className="text-xs text-gray-500 mb-3">
                                {paper.year} {paper.session} • Paper {paper.paperNumber}
                              </p>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openPdfViewer(paper.pdfUrl)}
                                  className="flex-1 inline-flex justify-center items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                  View
                                </button>
                                <a
                                  href={paper.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 inline-flex justify-center items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                  </svg>
                                  Download
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 006 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No papers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

const subjects = [
  // A-Level Subjects
  { id: 1, name: "Accounting", code: "9706", important: false, level: "A-Level" },
  { id: 2, name: "Afrikaans", code: "9679", important: false, level: "A-Level" },
  { id: 3, name: "Arabic", code: "9680", important: false, level: "A-Level" },
  { id: 4, name: "Art and Design", code: "9704", important: false, level: "A-Level" },
  { id: 5, name: "Biology", code: "9700", important: false, level: "A-Level" },
  { id: 6, name: "Business", code: "9609", important: false, level: "A-Level" },
  { id: 7, name: "Chemistry", code: "9701", important: true, level: "A-Level" },
  { id: 8, name: "Chinese", code: "9715", important: false, level: "A-Level" },
  { id: 9, name: "Classical Studies", code: "9274", important: false, level: "A-Level" },
  { id: 10, name: "Computer Science", code: "9618", important: false, level: "A-Level" },
  { id: 11, name: "Design and Technology", code: "9705", important: false, level: "A-Level" },
  { id: 12, name: "Divinity", code: "9011", important: false, level: "A-Level" },
  { id: 13, name: "Economics", code: "9708", important: true, level: "A-Level" },
  { id: 14, name: "English", code: "9093", important: false, level: "A-Level" },
  { id: 15, name: "English Literature", code: "9695", important: false, level: "A-Level" },
  { id: 16, name: "Environmental Management", code: "8291", important: false, level: "A-Level" },
  { id: 17, name: "French", code: "9716", important: true, level: "A-Level" },
  { id: 18, name: "Geography", code: "9696", important: false, level: "A-Level" },
  { id: 19, name: "German", code: "9717", important: false, level: "A-Level" },
  { id: 20, name: "Global Perspectives", code: "9239", important: false, level: "A-Level" },
  { id: 21, name: "Hindi", code: "9687", important: false, level: "A-Level" },
  { id: 22, name: "History", code: "9489", important: false, level: "A-Level" },
  { id: 23, name: "Information Technology", code: "9626", important: false, level: "A-Level" },
  { id: 24, name: "Islamic Studies", code: "9488", important: false, level: "A-Level" },
  { id: 25, name: "Japanese", code: "9281", important: false, level: "A-Level" },
  { id: 26, name: "Law", code: "9084", important: false, level: "A-Level" },
  { id: 27, name: "Marine Science", code: "9693", important: false, level: "A-Level" },
  { id: 28, name: "Mathematics", code: "9709", important: true, level: "A-Level" },
  { id: 29, name: "Media Studies", code: "9607", important: false, level: "A-Level" },
  { id: 30, name: "Music", code: "9483", important: false, level: "A-Level" },
  { id: 31, name: "Physical Education", code: "9396", important: false, level: "A-Level" },
  { id: 32, name: "Physics", code: "9702", important: true, level: "A-Level" },
  { id: 33, name: "Portuguese", code: "9718", important: false, level: "A-Level" },
  { id: 34, name: "Psychology", code: "9990", important: false, level: "A-Level" },
  { id: 35, name: "Sociology", code: "9699", important: false, level: "A-Level" },
  { id: 36, name: "Spanish", code: "9719", important: true, level: "A-Level" },
  { id: 37, name: "Tamil", code: "9689", important: false, level: "A-Level" },
  { id: 38, name: "Thinking Skills", code: "9694", important: false, level: "A-Level" },
  { id: 39, name: "Travel and Tourism", code: "9395", important: false, level: "A-Level" },
  { id: 40, name: "Urdu", code: "9676", important: false, level: "A-Level" },

  // O-Level Subjects
  { id: 41, name: "Accounting", code: "7110", important: false, level: "O-Level" },
  { id: 42, name: "Agriculture", code: "5038", important: false, level: "O-Level" },
  { id: 43, name: "Art and Design", code: "6090", important: false, level: "O-Level" },
  { id: 44, name: "Bangladesh Studies", code: "7094", important: false, level: "O-Level" },
  { id: 45, name: "Biology", code: "5090", important: false, level: "O-Level" },
  { id: 46, name: "Business Studies", code: "7115", important: false, level: "O-Level" },
  { id: 47, name: "Chemistry", code: "5070", important: false, level: "O-Level" },
  { id: 48, name: "Commerce", code: "7100", important: false, level: "O-Level" },
  { id: 49, name: "Commercial Studies", code: "7101", important: false, level: "O-Level" },
  { id: 50, name: "Computer Science", code: "2210", important: false, level: "O-Level" },
  { id: 51, name: "Design and Communication", code: "7048", important: false, level: "O-Level" },
  { id: 52, name: "Design and Technology", code: "6043", important: false, level: "O-Level" },
  { id: 53, name: "Economics", code: "2281", important: false, level: "O-Level" },
  { id: 54, name: "English Language", code: "1123", important: false, level: "O-Level" },
  { id: 55, name: "Environmental Management", code: "5014", important: false, level: "O-Level" },
  { id: 56, name: "Food and Nutrition", code: "6065", important: false, level: "O-Level" },
  { id: 57, name: "French", code: "3015", important: false, level: "O-Level" },
  { id: 58, name: "Geography", code: "2217", important: false, level: "O-Level" },
  { id: 59, name: "German", code: "3025", important: false, level: "O-Level" },
  { id: 60, name: "Global Perspectives", code: "2069", important: false, level: "O-Level" },
  { id: 61, name: "Hindi as a Second Language", code: "2055", important: false, level: "O-Level" },
  { id: 62, name: "History", code: "2147", important: false, level: "O-Level" },
  { id: 63, name: "History (Modern World Affairs)", code: "2134", important: false, level: "O-Level" },
  { id: 64, name: "Islamiyat", code: "2058", important: false, level: "O-Level" },
  { id: 65, name: "Literature in English", code: "2010", important: false, level: "O-Level" },
  { id: 66, name: "Mathematics", code: "4024", important: false, level: "O-Level" },
  { id: 67, name: "Mathematics – Additional", code: "4037", important: false, level: "O-Level" },
  { id: 68, name: "Mathematics – International", code: "0607", important: false, level: "O-Level" },
  { id: 69, name: "Mathematics – Syllabus D", code: "4024", important: false, level: "O-Level" },
  { id: 70, name: "Physics", code: "5054", important: false, level: "O-Level" },
  { id: 71, name: "Principles of Accounts", code: "7110", important: false, level: "O-Level" },
  { id: 72, name: "Religious Studies", code: "2048", important: false, level: "O-Level" },
  { id: 73, name: "Science – Combined", code: "5129", important: false, level: "O-Level" },
  { id: 74, name: "Science – Co-ordinated", code: "5129", important: false, level: "O-Level" },
  { id: 75, name: "Science – Dual", code: "0654", important: false, level: "O-Level" },
  { id: 76, name: "Sociology", code: "2251", important: false, level: "O-Level" },
  { id: 77, name: "Spanish", code: "3035", important: false, level: "O-Level" },
  { id: 78, name: "Statistics", code: "4040", important: false, level: "O-Level" },
  { id: 79, name: "Travel and Tourism", code: "7096", important: false, level: "O-Level" },
  { id: 80, name: "Urdu – First Language", code: "3247", important: false, level: "O-Level" },
  { id: 81, name: "Urdu – Second Language", code: "3248", important: false, level: "O-Level" },

  // IGCSE Subjects
  { id: 82, name: "Accounting", code: "0452", important: false, level: "IGCSE" },
  { id: 83, name: "Accounting", code: "0985", important: false, level: "IGCSE" },
  { id: 84, name: "Afrikaans", code: "0512", important: false, level: "IGCSE" },
  { id: 85, name: "Afrikaans", code: "0548", important: false, level: "IGCSE" },
  { id: 86, name: "Agriculture", code: "0600", important: false, level: "IGCSE" },
  { id: 87, name: "Arabic", code: "0508", important: false, level: "IGCSE" },
  { id: 88, name: "Arabic", code: "0527", important: false, level: "IGCSE" },
  { id: 89, name: "Arabic", code: "0544", important: false, level: "IGCSE" },
  { id: 90, name: "Arabic", code: "7184", important: false, level: "IGCSE" },
  { id: 91, name: "Art and Design", code: "0400", important: false, level: "IGCSE" },
  { id: 92, name: "Art and Design", code: "0415", important: false, level: "IGCSE" },
  { id: 93, name: "Art and Design", code: "0989", important: false, level: "IGCSE" },
  { id: 94, name: "Bahasa Indonesia", code: "0538", important: false, level: "IGCSE" },
  { id: 95, name: "Bangladesh Studies", code: "0449", important: false, level: "IGCSE" },
  { id: 96, name: "Biology", code: "0438", important: false, level: "IGCSE" },
  { id: 97, name: "Biology", code: "0610", important: false, level: "IGCSE" },
  { id: 98, name: "Biology", code: "0970", important: false, level: "IGCSE" },
  { id: 99, name: "Business Studies", code: "0450", important: false, level: "IGCSE" },
  { id: 100, name: "Business Studies", code: "0986", important: false, level: "IGCSE" },
  { id: 101, name: "Chemistry", code: "0439", important: false, level: "IGCSE" },
  { id: 102, name: "Chemistry", code: "0620", important: false, level: "IGCSE" },
  { id: 103, name: "Chemistry", code: "0971", important: false, level: "IGCSE" },
  { id: 104, name: "Child Development", code: "0637", important: false, level: "IGCSE" },
  { id: 105, name: "Chinese", code: "0509", important: false, level: "IGCSE" },
  { id: 106, name: "Chinese", code: "0523", important: false, level: "IGCSE" },
  { id: 107, name: "Chinese", code: "0547", important: false, level: "IGCSE" },
  { id: 108, name: "Computer Science", code: "0478", important: false, level: "IGCSE" },
  { id: 109, name: "Computer Science", code: "0984", important: false, level: "IGCSE" },
  { id: 110, name: "Computer Studies", code: "0420", important: false, level: "IGCSE" },
  { id: 111, name: "Czech - First Language", code: "0514", important: false, level: "IGCSE" },
  { id: 112, name: "Design and Technology", code: "0445", important: false, level: "IGCSE" },
  { id: 113, name: "Design and Technology", code: "0979", important: false, level: "IGCSE" },
  { id: 114, name: "Development Studies", code: "0453", important: false, level: "IGCSE" },
  { id: 115, name: "Drama", code: "0411", important: false, level: "IGCSE" },
  { id: 116, name: "Drama", code: "0428", important: false, level: "IGCSE" },
  { id: 117, name: "Drama", code: "0994", important: false, level: "IGCSE" },
  { id: 118, name: "Dutch", code: "0503", important: false, level: "IGCSE" },
  { id: 119, name: "Dutch", code: "0515", important: false, level: "IGCSE" },
  { id: 120, name: "Economics", code: "0455", important: false, level: "IGCSE" },
  { id: 121, name: "Economics", code: "0987", important: false, level: "IGCSE" },
  { id: 122, name: "English", code: "0427", important: false, level: "IGCSE" },
  { id: 123, name: "English", code: "0476", important: false, level: "IGCSE" },
  { id: 124, name: "English", code: "0477", important: false, level: "IGCSE" },
  { id: 125, name: "English", code: "0486", important: false, level: "IGCSE" },
  { id: 126, name: "English", code: "0500", important: false, level: "IGCSE" },
  { id: 127, name: "English", code: "0510", important: false, level: "IGCSE" },
  { id: 128, name: "English", code: "0511", important: false, Limitlevel: "IGCSE" },
  { id: 129, name: "English", code: "0522", important: false, level: "IGCSE" },
  { id: 130, name: "English", code: "0524", important: false, level: "IGCSE" },
  { id: 131, name: "English", code: "0526", important: false, level: "IGCSE" },
  { id: 132, name: "English", code: "0627", important: false, level: "IGCSE" },
  { id: 133, name: "English", code: "0772", important: false, level: "IGCSE" },
  { id: 134, name: "English", code: "0990", important: false, level: "IGCSE" },
  { id: 135, name: "English", code: "0991", important: false, level: "IGCSE" },
  { id: 136, name: "English", code: "0993", important: false, level: "IGCSE" },
  { id: 137, name: "English", code: "0475", important: false, level: "IGCSE" },
  { id: 138, name: "English as a Second Language", code: "0465", important: false, level: "IGCSE" },
  { id: 139, name: "English", code: "0472", important: false, level: "IGCSE" },
  { id: 140, name: "English", code: "0992", important: false, level: "IGCSE" },
  { id: 141, name: "Enterprise", code: "0454", important: false, level: "IGCSE" },
  { id: 142, name: "Environmental Management", code: "0680", important: false, level: "IGCSE" },
  { id: 143, name: "Food and Nutrition", code: "0648", important: false, level: "IGCSE" },
  { id: 144, name: "French", code: "0501", important: false, level: "IGCSE" },
  { id: 145, name: "French", code: "0520", important: false, level: "IGCSE" },
  { id: 146, name: "French", code: "0528", important: false, level: "IGCSE" },
  { id: 147, name: "French", code: "0685", important: false, level: "IGCSE" },
  { id: 148, name: "French", code: "7156", important: false, level: "IGCSE" },
  { id: 149, name: "Geography", code: "0460", important: false, level: "IGCSE" },
  { id: 150, name: "Geography", code: "0976", important: false, level: "IGCSE" },
  { id: 151, name: "German", code: "0505", important: false, level: "IGCSE" },
  { id: 152, name: "German", code: "0525", important: false, level: "IGCSE" },
  { id: 153, name: "German", code: "0677", important: false, level: "IGCSE" },
  { id: 154, name: "German", code: "7159", important: false, level: "IGCSE" },
  { id: 155, name: "Global Perspectives", code: "0426", important: false, level: "IGCSE" },
  { id: 156, name: "Global Perspectives", code: "0457", important: false, level: "IGCSE" },
  { id: 157, name: "Greek", code: "0543", important: false, level: "IGCSE" },
  { id: 158, name: "Hindi", code: "0549", important: false, level: "IGCSE" },
  { id: 159, name: "History", code: "0416", important: false, level: "IGCSE" },
  { id: 160, name: "History", code: "0470", important: false, level: "IGCSE" },
  { id: 161, name: "History", code: "0977", important: false, level: "IGCSE" },
  { id: 162, name: "History - American", code: "0409", important: false, level: "IGCSE" },
  { id: 163, name: "ICT", code: "0417", important: false, level: "IGCSE" },
  { id: 164, name: "India Studies", code: "0447", important: false, level: "IGCSE" },
  { id: 165, name: "Indonesian", code: "0545", important: false, level: "IGCSE" },
  { id: 166, name: "Information and Communication Technology", code: "0983", important: false, level: "IGCSE" },
  { id: 167, name: "IsiZulu", code: "0531", important: false, level: "IGCSE" },
  { id: 168, name: "Islamiyat", code: "0493", important: false, level: "IGCSE" },
  { id: 169, name: "Italian", code: "0535", important: false, level: "IGCSE" },
  { id: 170, name: "Italian", code: "7164", important: false, level: "IGCSE" },
  { id: 171, name: "Japanese", code: "0507", important: false, level: "IGCSE" },
  { id: 172, name: "Japanese", code: "0519", important: false, level: "IGCSE" },
  { id: 173, name: "Kazakh", code: "0532", important: false, level: "IGCSE" },
  { id: 174, name: "Korean", code: "0521", important: false, level: "IGCSE" },
  { id: 175, name: "Latin", code: "0480", important: false, level: "IGCSE" },
  { id: 176, name: "Malay", code: "0546", important: false, level: "IGCSE" },
  { id: 177, name: "Malay - First Language", code: "0696", important: false, level: "IGCSE" },
  { id: 178, name: "Marine Science", code: "0697", important: false, level: "IGCSE" },
  { id: 179, name: "Mathematics", code: "0444", important: false, level: "IGCSE" },
  { id: 180, name: "Mathematics", code: "0459", important: false, level: "IGCSE" },
  { id: 181, name: "Mathematics", code: "0580", important: false, level: "IGCSE" },
  { id: 182, name: "Mathematics", code: "0581", important: false, level: "IGCSE" },
  { id: 183, name: "Mathematics", code: "0606", important: false, level: "IGCSE" },
  { id: 184, name: "Mathematics", code: "0607", important: false, level: "IGCSE" },
  { id: 185, name: "Mathematics", code: "0626", important: false, level: "IGCSE" },
  { id: 186, name: "Mathematics", code: "0980", important: false, level: "IGCSE" },
  { id: 187, name: "Music", code: "0410", important: false, level: "IGCSE" },
  { id: 188, name: "Music", code: "0429", important: false, level: "IGCSE" },
  { id: 189, name: "Music", code: "0978", important: false, level: "IGCSE" },
  { id: 190, name: "Pakistan Studies", code: "0448", important: false, level: "IGCSE" },
  { id: 191, name: "Physical Education", code: "0413", important: false, level: "IGCSE" },
  { id: 192, name: "Physical Science", code: "0652", important: false, level: "IGCSE" },
  { id: 193, name: "Physical Education", code: "0995", important: false, level: "IGCSE" },
  { id: 194, name: "Physics", code: "0443", important: false, level: "IGCSE" },
  { id: 195, name: "Physics", code: "0625", important: false, level: "IGCSE" },
  { id: 196, name: "Physics", code: "0972", important: false, level: "IGCSE" },
  { id: 197, name: "Portuguese", code: "0504", important: false, level: "IGCSE" },
  { id: 198, name: "Portuguese", code: "0540", important: false, level: "IGCSE" },
  { id: 199, name: "Religious Studies", code: "0490", important: false, level: "IGCSE" },
  { id: 200, name: "Russian", code: "0516", important: false, level: "IGCSE" },
  { id: 201, name: "Sanskrit", code: "0499", important: false, level: "IGCSE" },
  { id: 202, name: "Science", code: "0653", important: false, level: "IGCSE" },
  { id: 203, name: "Sciences", code: "0442", important: false, level: "IGCSE" },
  { id: 204, name: "Sciences", code: "0654", important: false, level: "IGCSE" },
  { id: 205, name: "Sciences", code: "0973", important: false, level: "IGCSE" },
  { id: 206, name: "Sociology", code: "0495", important: false, level: "IGCSE" },
  { id: 207, name: "Spanish", code: "0678", important: false, level: "IGCSE" },
  { id: 208, name: "Spanish", code: "0502", important: false, level: "IGCSE" },
  { id: 209, name: "Spanish", code: "0530", important: false, level: "IGCSE" },
  { id: 210, name: "Spanish", code: "0533", important: false, level: "IGCSE" },
  { id: 211, name: "Spanish", code: "0537", important: false, level: "IGCSE" },
  { id: 212, name: "Spanish", code: "7160", important: false, level: "IGCSE" },
  { id: 213, name: "Spanish Literature", code: "0488", important: false, level: "IGCSE" },
  { id: 214, name: "Swahili", code: "0262", important: false, level: "IGCSE" },
  { id: 215, name: "Thai", code: "0518", important: false, level: "IGCSE" },
  { id: 216, name: "Travel and Tourism", code: "0471", important: false, level: "IGCSE" },
  { id: 217, name: "Turkish", code: "0513", important: false, level: "IGCSE" },
  { id: 218, name: "Twenty-First Century Science", code: "0608", important: false, level: "IGCSE" },
  { id: 219, name: "Urdu", code: "0539", important: false, level: "IGCSE" },
  { id: 220, name: "World Literature", code: "0408", important: false, level: "IGCSE" },
];

// Sample data for papers (A-Level papers only; you can add O-Level papers in the same format)
const papers = [
  // Mathematics papers
  {
    id: 1,
    subjectCode: "9709",
    title: "Mathematics: Pure Mathematics 1",
    year: "2024",
    session: "May-June",
    paperNumber: "1",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Mathematics%20(9709)/2023/9709_s23_qp_12.pdf",
  },
  {
    id: 2,
    subjectCode: "9709",
    title: "Mathematics: Pure Mathematics 2",
    year: "2024",
    session: "May-June",
    paperNumber: "2",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Mathematics%20(9709)/2023/9709_s23_qp_22.pdf",
  },
  {
    id: 3,
    subjectCode: "9709",
    title: "Mathematics: Mechanics",
    year: "2024",
    session: "May-June",
    paperNumber: "4",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Mathematics%20(9709)/2023/9709_s23_qp_42.pdf",
  },
  {
    id: 4,
    subjectCode: "9709",
    title: "Mathematics: Probability & Statistics 1",
    year: "2024",
    session: "May-June",
    paperNumber: "5",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Mathematics%20(9709)/2023/9709_s23_qp_52.pdf",
  },
  {
    id: 5,
    subjectCode: "9709",
    title: "Mathematics: Pure Mathematics 1",
    year: "2024",
    session: "March",
    paperNumber: "1",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Mathematics%20(9709)/2023/9709_m23_qp_12.pdf",
  },
  {
    id: 6,
    subjectCode: "9709",
    title: "Mathematics: Pure Mathematics 1",
    year: "2023",
    session: "Oct-Nov",
    paperNumber: "1",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Mathematics%20(9709)/2023/9709_w23_qp_12.pdf",
  },
  {
    id: 7,
    subjectCode: "9709",
    title: "Mathematics: Pure Mathematics 2",
    year: "2023",
    session: "Oct-Nov",
    paperNumber: "2",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Mathematics%20(9709)/2023/9709_w23_qp_22.pdf",
  },
  {
    id: 8,
    subjectCode: "9709",
    title: "Mathematics: Pure Mathematics 1",
    year: "2023",
    session: "May-June",
    paperNumber: "1",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Mathematics%20(9709)/2023/9709_s23_qp_12.pdf",
  },

  // Physics papers
  {
    id: 35,
    subjectCode: "9702",
    title: "Physics: Multiple Choice",
    year: "2023",
    session: "May-June",
    paperNumber: "1",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Physics%20(9702)/2023/9702_s23_qp_11.pdf",
  },
  {
    id: 36,
    subjectCode: "9702",
    title: "Physics: AS Structured Questions",
    year: "2023",
    session: "May-June",
    paperNumber: "2",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Physics%20(9702)/2023/9702_s23_qp_21.pdf",
  },

  // Accounting papers
  {
    id: 45,
    subjectCode: "9706",
    title: "Accounting: Multiple Choice",
    year: "2023",
    session: "May-June",
    paperNumber: "1",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Accounting%20(9706)/2023/9706_s23_qp_11.pdf",
  },
  {
    id: 46,
    subjectCode: "9706",
    title: "Accounting: Structured Questions",
    year: "2023",
    session: "May-June",
    paperNumber: "2",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Accounting%20(9706)/2023/9706_s23_qp_21.pdf",
  },
  {
    id: 47,
    subjectCode: "9706",
    title: "Accounting: Multiple Choice",
    year: "2022",
    session: "Oct-Nov",
    paperNumber: "1",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Accounting%20(9706)/2022/9706_w22_qp_11.pdf",
  },
  {
    id: 48,
    subjectCode: "9706",
    title: "Accounting: Structured Questions",
    year: "2022",
    session: "Oct-Nov",
    paperNumber: "2",
    pdfUrl: "https://papers.gceguide.com/A%20Levels/Accounting%20(9706)/2022/9706_w22_qp_21.pdf",
  },
];