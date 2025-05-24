"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const router = useRouter();

  // Filter subjects based on search query and active tab
  useEffect(() => {
    let filtered = subjects;

    // Filter by search query (name or code)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (subject) => subject.name.toLowerCase().includes(query) || subject.code.toLowerCase().includes(query)
      );
    }

    // Filter by tab (first letter)
    if (activeTab !== "all") {
      filtered = filtered.filter((subject) => subject.name.toLowerCase().startsWith(activeTab.toLowerCase()));
    }

    setFilteredSubjects(filtered);
  }, [searchQuery, activeTab]);

  // Get unique first letters for tabs
  const uniqueFirstLetters = Array.from(
    new Set(subjects.map((subject) => subject.name.charAt(0).toUpperCase()))
  ).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 pt-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Subject-wise O Level Past Papers</h1>
          <p className="mt-2 text-body text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive collection of past papers organized by subject
          </p>

          {/* Custom Search Bar */}
          <div className="relative max-w-md mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
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
              placeholder="Search by subject name or code..."
              className="w-full pl-12 py-2 pr-10 bg-white border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 rounded-xl shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery("")}>
                <span className="sr-only">Clear search</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="mt-10 mb-8">
          <div className="flex justify-center">
            <div className="bg-white shadow-md xl:rounded-full rounded-2xl h-auto p-2 flex flex-wrap justify-center gap-1 border border-gray-100">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-full px-4 py-2 font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-primary text-white shadow-md"
                    : "bg-transparent text-gray-700 hover:bg-gray-100"
                }`}>
                All
              </button>
              {uniqueFirstLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setActiveTab(letter)}
                  className={`rounded-full px-4 py-2 font-medium transition-all ${
                    activeTab === letter
                      ? "bg-primary text-white shadow-md"
                      : "bg-transparent text-gray-700 hover:bg-gray-100"
                  }`}>
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
                  <div className="bg-primary px-6 py-4 rounded-t-xl">
                    <div className="grid grid-cols-7 text-white font-heading font-medium">
                      <div className="col-span-5">Subject</div>
                      <div className="col-span-2 text-center">Code</div>
                    </div>
                  </div>

                  {filteredSubjects.length > 0 ? (
                    <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto custom-scrollbar">
                      {filteredSubjects.map((subject) => (
                        <a
                          key={subject.id}
                          href={`/subjects/${subject.code}`}
                          className="px-6 py-4 flex items-center hover:bg-gray-50 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(`/subjects/${subject.code}`);
                          }}>
                          <div className="grid grid-cols-7 w-full items-center">
                            <div className="col-span-5 flex items-center gap-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-primary flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="font-body text-gray-800">{subject.name}</span>
                              {subject.important && (
                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full font-body">
                                  IMPORTANT
                                </span>
                              )}
                            </div>
                            <div className="col-span-2 text-center font-body text-gray-600">{subject.code}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-gray-500">
                      <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-1">No subjects found</h3>
                      <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white shadow-md rounded-xl p-6 sticky top-6 border border-gray-100">
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Information</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-3 py-2">
                      <h3 className="font-heading font-medium text-gray-900">Past Papers</h3>
                      <p className="font-body text-sm text-gray-600">
                        Access past examination papers from various examination boards and subjects
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-3 py-2">
                      <h3 className="font-heading font-medium text-gray-900">Mark Schemes</h3>
                      <p className="font-body text-sm text-gray-600">
                        Find detailed marking guidelines for accurate self-assessment
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-3 py-2">
                      <h3 className="font-heading font-medium text-gray-900">Examiner Reports</h3>
                      <p className="font-body text-sm text-gray-600">
                        Get insights from examiners on common mistakes and best practices
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-heading font-medium text-gray-900 mb-2">Search Tips</h3>
                    <ul className="space-y-2 text-sm font-body text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Search by subject name (e.g., Mathematics)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Search by subject code (e.g., 9709)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Use the alphabet tabs to filter by first letter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>Click on All to see all available subjects</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const subjects = [
  { id: 1, name: "Accounting", code: "7110", important: false },
  { id: 2, name: "Agriculture", code: "5038", important: false },
  { id: 3, name: "Art and Design", code: "6090", important: false },
  { id: 4, name: "Bangladesh Studies", code: "7094", important: false },
  { id: 5, name: "Biology", code: "5090", important: false },
  { id: 6, name: "Business Studies", code: "7115", important: false },
  { id: 7, name: "Chemistry", code: "5070", important: false },
  { id: 8, name: "Commerce", code: "7100", important: false },
  { id: 9, name: "Commercial Studies", code: "7101", important: false },
  { id: 10, name: "Computer Science", code: "2210", important: false },
  { id: 11, name: "Design and Communication", code: "7048", important: false },
  { id: 12, name: "Design and Technology", code: "6043", important: false },
  { id: 13, name: "Economics", code: "2281", important: false },
  { id: 14, name: "English Language", code: "1123", important: false },
  { id: 15, name: "Environmental Management", code: "5014", important: false },
  { id: 16, name: "Food and Nutrition", code: "6065", important: false },
  { id: 17, name: "French", code: "3015", important: false },
  { id: 18, name: "Geography", code: "2217", important: false },
  { id: 19, name: "German", code: "3025", important: false },
  { id: 20, name: "Global Perspectives", code: "2069", important: false },
  { id: 21, name: "Hindi as a Second Language", code: "2055", important: false },
  { id: 22, name: "History", code: "2147", important: false },
  { id: 23, name: "History (Modern World Affairs)", code: "2134", important: false },
  { id: 24, name: "Islamiyat", code: "2058", important: false },
  { id: 25, name: "Literature in English", code: "2010", important: false },
  { id: 26, name: "Mathematics", code: "4024", important: false },
  { id: 27, name: "Mathematics – Additional", code: "4037", important: false },
  { id: 28, name: "Mathematics – International", code: "0607", important: false },
  { id: 29, name: "Mathematics – Syllabus D", code: "4024", important: false },
  { id: 30, name: "Physics", code: "5054", important: false },
  { id: 31, name: "Principles of Accounts", code: "7110", important: false },
  { id: 32, name: "Religious Studies", code: "2048", important: false },
  { id: 33, name: "Science – Combined", code: "5129", important: false },
  { id: 34, name: "Science – Co-ordinated", code: "5129", important: false },
  { id: 35, name: "Science – Dual", code: "0654", important: false },
  { id: 36, name: "Sociology", code: "2251", important: false },
  { id: 37, name: "Spanish", code: "3035", important: false },
  { id: 38, name: "Statistics", code: "4040", important: false },
  { id: 39, name: "Travel and Tourism", code: "7096", important: false },
  { id: 40, name: "Urdu – First Language", code: "3247", important: false },
  { id: 41, name: "Urdu – Second Language", code: "3248", important: false },
];
