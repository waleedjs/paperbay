"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path, isParent = false) => {
    if (!mounted) return false;
    if (path === "/") return pathname === path;
    if (isParent) {
      // For parent dropdowns, check if any child route is active
      return (
        pathname?.startsWith(path) ||
        (path === "/past-papers" &&
          (pathname?.startsWith("/past-papers/as-a-level") ||
           pathname?.startsWith("/past-papers/o-level") ||
           pathname?.startsWith("/past-papers/igcse"))) ||
        (path === "/notes" &&
          (pathname?.startsWith("/notes/as-a-level-notes") ||
           pathname?.startsWith("/notes/o-level-notes") ||
           pathname?.startsWith("/notes/igcse-notes")))
      );
    }
    return pathname?.startsWith(path) || false;
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm font-body">
      <div className="container max-w-[1280px] mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-[#FF4B6C]">
            <Image src="/images/logo/logo.svg" alt="Study materials" width={220} height={100} className="mx-auto" />
          </div>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#1B4B66] focus:outline-none"
          aria-label="Toggle menu"
          type="button">
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`py-2 px-3 rounded-md transition-colors ${
              isActive("/") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66] hover:text-[#FF4B6C]"
            }`}>
            Home
          </Link>

          {/* Past Papers Dropdown */}
          <div className="relative group">
            <div
              className={`flex items-center gap-1 py-2 px-3 rounded-md transition-colors cursor-pointer ${
                isActive("/past-papers", true) ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66] hover:text-[#FF4B6C]"
              }`}>
              <Link href="/past-papers">Past Papers</Link>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
            <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-2">
              <Link
                href="/past-papers/as-a-level"
                className={`block px-3 py-2 rounded-md hover:bg-pink-100 transition-colors ${
                  isActive("/past-papers/as-a-level") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66]"
                }`}>
                AS and A Level
              </Link>
              <Link
                href="/past-papers/o-level"
                className={`block px-3 py-2 rounded-md hover:bg-pink-100 transition-colors ${
                  isActive("/past-papers/o-level") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66]"
                }`}>
                O Level
              </Link>
              <Link
                href="/past-papers/igcse"
                className={`block px-3 py-2 rounded-md hover:bg-pink-100 transition-colors ${
                  isActive("/past-papers/igcse") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66]"
                }`}>
                IGCSE
              </Link>
            </div>
          </div>

          <Link
            href="/sat-papers"
            className={`py-2 px-3 rounded-md transition-colors ${
              isActive("/sat-papers") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B6C] hover:text-[#FF4B6C]"
            }`}>
            SAT Papers
          </Link>

          {/* Notes Dropdown */}
          <div className="relative group">
            <div
              className={`flex items-center gap-1 py-2 px-3 rounded-md transition-colors cursor-pointer ${
                isActive("/notes", true) ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66] hover:text-[#FF4B6C]"
              }`}>
              <Link href="/notes">Notes</Link>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
            <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-2">
              <Link
                href="/notes/as-a-level-notes"
                className={`block px-3 py-2 rounded-md hover:bg-pink-100 transition-colors ${
                  isActive("/notes/as-a-level-notes") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66]"
                }`}>
                A Level Notes
              </Link>
              <Link
                href="/notes/o-level-notes"
                className={`block px-3 py-2 rounded-md hover:bg-pink-100 transition-colors ${
                  isActive("/notes/o-level-notes") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66]"
                }`}>
                O Level Notes
              </Link>
              <Link
                href="/notes/igcse-notes"
                className={`block px-3 py-2 rounded-md hover:bg-pink-100 transition-colors ${
                  isActive("/notes/igcse-notes") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66]"
                }`}>
                IGCSE Notes
              </Link>
            </div>
          </div>

          <Link
            href="/blog"
            className={`py-2 px-3 rounded-md transition-colors ${
              isActive("/blog") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66] hover:text-[#FF4B6C]"
            }`}>
            Blog
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link href="/report-issue">
            <button
              type="button"
              className="bg-[#FF4B6C] cursor-pointer text-white px-4 py-2 rounded-md hover:bg-[#e6435f] transition-colors">
              Report Issue
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && mounted && (
        <nav className="md:hidden bg-white shadow-lg p-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block py-2 px-3 rounded-md mb-1 ${
              isActive("/") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66] hover:text-[#FF4B6C]"
            }`}>
            Home
          </Link>

          {/* Mobile Past Papers */}
          <div className="mb-1">
            <button
              type="button"
              onClick={() => handleDropdownToggle("past-papers")}
              className={`flex items-center justify-between w-full py-2 px-3 rounded-md ${
                isActive("/past-papers", true) ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66] hover:text-[#FF4B6C]"
              }`}>
              Past Papers
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === "past-papers" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "past-papers" && (
              <div className="mt-2 ml-3 pl-2 space-y-1 rounded-xl bg-pink-50 p-2">
                <Link
                  href="/past-papers/as-a-level"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded-md ${
                    isActive("/past-papers/as-a-level") ? "text-[#FF4B6C] bg-pink-100" : "text-[#1B4B66] hover:text-[#FF4B6C]"
                  }`}>
                  AS and A Level
                </Link>
                <Link
                  href="/past-papers/o-level"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded-md ${
                    isActive("/past-papers/o-level") ? "text-[#FF4B6C] bg-pink-100" : "text-[#1B4B66] hover:text-[#FF4B6C]"
                  }`}>
                  O Level
                </Link>
                <Link
                  href="/past-papers/igcse"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded-md ${
                    isActive("/past-papers/igcse") ? "text-[#FF4B6C] bg-pink-100" : "text-[#1B4B66] hover:text-[#FF4B6C]"
                  }`}>
                  IGCSE
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/sat-papers"
            onClick={() => setIsOpen(false)}
            className={`block py-2 px-3 rounded-md mb-1 ${
              isActive("/sat-papers") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66] hover:text-[#FF4B6C]"
            }`}>
            SAT Papers
          </Link>

          {/* Mobile Notes */}
          <div className="mb-1">
            <button
              type="button"
              onClick={() => handleDropdownToggle("notes")}
              className={`flex items-center justify-between w-full py-2 px-3 rounded-md ${
                isActive("/notes", true) ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66] hover:text-[#FF4B6C]"
              }`}>
              Notes
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === "notes" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "notes" && (
              <div className="mt-2 ml-3 pl-2 space-y-1 rounded-xl bg-pink-50 p-2">
                <Link
                  href="/notes/a-level"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded-md ${
                    isActive("/notes/a-level") ? "text-[#FF4B6C] bg-pink-100" : "text-[#1B4B66] hover:text-[#FF4B6C]"
                  }`}>
                  A Level Notes
                </Link>
                <Link
                  href="/notes/o-level"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded-md ${
                    isActive("/notes/o-level") ? "text-[#FF4B6C] bg-pink-100" : "text-[#1B4B66] hover:text-[#FF4B6C]"
                  }`}>
                  O Level Notes
                </Link>
                <Link
                  href="/notes/igcse"
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded-md ${
                    isActive("/notes/igcse") ? "text-[#FF4B6C] bg-pink-100" : "text-[#1B4B66] hover:text-[#FF4B6C]"
                  }`}>
                  IGCSE Notes
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className={`block py-2 px-3 rounded-md mb-1 ${
              isActive("/blog") ? "text-[#FF4B6C] bg-pink-50" : "text-[#1B4B66] hover:text-[#FF4B6C]"
            }`}>
            Blog
          </Link>
          <Link href="/report-issue">
            <button
              type="button"
              className="mt-4 w-full bg-[#FF4B6C] text-white px-4 py-2 rounded-md hover:bg-[#e6435f] transition-colors">
              Report Issue
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
}