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
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">Subject-wise IGCSE Past Papers</h1>
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
  { name: "Accounting", code: "0452", important: false },
  { name: "Accounting", code: "0985", important: false },
  { name: "Afrikaans", code: "0512", important: false },
  { name: "Afrikaans", code: "0548", important: false },
  { name: "Agriculture", code: "0600", important: false },
  { name: "Arabic", code: "0508", important: false },
  { name: "Arabic", code: "0527", important: false },
  { name: "Arabic", code: "0544", important: false },
  { name: "Arabic", code: "7184", important: false },
  { name: "Art and Design", code: "0400", important: false },
  { name: "Art and Design", code: "0415", important: false },
  { name: "Art and Design", code: "0989", important: false },
  { name: "Bahasa Indonesia", code: "0538", important: false },
  { name: "Bangladesh Studies", code: "0449", important: false },
  { name: "Biology", code: "0438", important: false },
  { name: "Biology", code: "0610", important: false },
  { name: "Biology", code: "0970", important: false },
  { name: "Business Studies", code: "0450", important: false },
  { name: "Business Studies", code: "0986", important: false },
  { name: "Chemistry", code: "0439", important: false },
  { name: "Chemistry", code: "0620", important: false },
  { name: "Chemistry", code: "0971", important: false },
  { name: "Child Development", code: "0637", important: false },
  { name: "Chinese", code: "0509", important: false },
  { name: "Chinese", code: "0523", important: false },
  { name: "Chinese", code: "0547", important: false },
  { name: "Computer Science", code: "0478", important: false },
  { name: "Computer Science", code: "0984", important: false },
  { name: "Computer Studies", code: "0420", important: false },
  { name: "Czech - First Language", code: "0514", important: false },
  { name: "Design and Technology", code: "0445", important: false },
  { name: "Design and Technology", code: "0979", important: false },
  { name: "Development Studies", code: "0453", important: false },
  { name: "Drama", code: "0411", important: false },
  { name: "Drama", code: "0428", important: false },
  { name: "Drama", code: "0994", important: false },
  { name: "Dutch", code: "0503", important: false },
  { name: "Dutch", code: "0515", important: false },
  { name: "Economics", code: "0455", important: false },
  { name: "Economics", code: "0987", important: false },
  { name: "English", code: "0427", important: false },
  { name: "English", code: "0476", important: false },
  { name: "English", code: "0477", important: false },
  { name: "English", code: "0486", important: false },
  { name: "English", code: "0500", important: false },
  { name: "English", code: "0510", important: false },
  { name: "English", code: "0511", important: false },
  { name: "English", code: "0522", important: false },
  { name: "English", code: "0524", important: false },
  { name: "English", code: "0526", important: false },
  { name: "English", code: "0627", important: false },
  { name: "English", code: "0772", important: false },
  { name: "English", code: "0990", important: false },
  { name: "English", code: "0991", important: false },
  { name: "English", code: "0993", important: false },
  { name: "English", code: "0475", important: false },
  { name: "English as a Second Language", code: "0465", important: false },
  { name: "English", code: "0472", important: false },
  { name: "English", code: "0992", important: false },
  { name: "Enterprise", code: "0454", important: false },
  { name: "Environmental Management", code: "0680", important: false },
  { name: "Food and Nutrition", code: "0648", important: false },
  { name: "French", code: "0501", important: false },
  { name: "French", code: "0520", important: false },
  { name: "French", code: "0528", important: false },
  { name: "French", code: "0685", important: false },
  { name: "French", code: "7156", important: false },
  { name: "Geography", code: "0460", important: false },
  { name: "Geography", code: "0976", important: false },
  { name: "German", code: "0505", important: false },
  { name: "German", code: "0525", important: false },
  { name: "German", code: "0677", important: false },
  { name: "German", code: "7159", important: false },
  { name: "Global Perspectives", code: "0426", important: false },
  { name: "Global Perspectives", code: "0457", important: false },
  { name: "Greek", code: "0543", important: false },
  { name: "Hindi", code: "0549", important: false },
  { name: "History", code: "0416", important: false },
  { name: "History", code: "0470", important: false },
  { name: "History", code: "0977", important: false },
  { name: "History - American", code: "0409", important: false },
  { name: "ICT", code: "0417", important: false },
  { name: "India Studies", code: "0447", important: false },
  { name: "Indonesian", code: "0545", important: false },
  { name: "Information and Communication Technology", code: "0983", important: false },
  { name: "IsiZulu", code: "0531", important: false },
  { name: "Islamiyat", code: "0493", important: false },
  { name: "Italian", code: "0535", important: false },
  { name: "Italian", code: "7164", important: false },
  { name: "Japanese", code: "0507", important: false },
  { name: "Japanese", code: "0519", important: false },
  { name: "Kazakh", code: "0532", important: false },
  { name: "Korean", code: "0521", important: false },
  { name: "Latin", code: "0480", important: false },
  { name: "Malay", code: "0546", important: false },
  { name: "Malay - First Language", code: "0696", important: false },
  { name: "Marine Science", code: "0697", important: false },
  { name: "Mathematics", code: "0444", important: false },
  { name: "Mathematics", code: "0459", important: false },
  { name: "Mathematics", code: "0580", important: false },
  { name: "Mathematics", code: "0581", important: false },
  { name: "Mathematics", code: "0606", important: false },
  { name: "Mathematics", code: "0607", important: false },
  { name: "Mathematics", code: "0626", important: false },
  { name: "Mathematics", code: "0980", important: false },
  { name: "Music", code: "0410", important: false },
  { name: "Music", code: "0429", important: false },
  { name: "Music", code: "0978", important: false },
  { name: "Pakistan Studies", code: "0448", important: false },
  { name: "Physical Education", code: "0413", important: false },
  { name: "Physical Science", code: "0652", important: false },
  { name: "Physical Education", code: "0995", important: false },
  { name: "Physics", code: "0443", important: false },
  { name: "Physics", code: "0625", important: false },
  { name: "Physics", code: "0972", important: false },
  { name: "Portuguese", code: "0504", important: false },
  { name: "Portuguese", code: "0540", important: false },
  { name: "Religious Studies", code: "0490", important: false },
  { name: "Russian", code: "0516", important: false },
  { name: "Sanskrit", code: "0499", important: false },
  { name: "Science", code: "0653", important: false },
  { name: "Sciences", code: "0442", important: false },
  { name: "Sciences", code: "0654", important: false },
  { name: "Sciences", code: "0973", important: false },
  { name: "Sociology", code: "0495", important: false },
  { name: "Spanish", code: "0678", important: false },
  { name: "Spanish", code: "0502", important: false },
  { name: "Spanish", code: "0530", important: false },
  { name: "Spanish", code: "0533", important: false },
  { name: "Spanish", code: "0537", important: false },
  { name: "Spanish", code: "7160", important: false },
  { name: "Spanish Literature", code: "0488", important: false },
  { name: "Swahili", code: "0262", important: false },
  { name: "Thai", code: "0518", important: false },
  { name: "Travel and Tourism", code: "0471", important: false },
  { name: "Turkish", code: "0513", important: false },
  { name: "Twenty-First Century Science", code: "0608", important: false },
  { name: "Urdu", code: "0539", important: false },
  { name: "World Literature", code: "0408", important: false },
];
