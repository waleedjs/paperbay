"use client";
import Link from "next/link";
import { Home, Search, ArrowLeft, BookOpen, FileText, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 font-heading">
      {/* Hero Section with Wave Background */}
      <section className="relative py-16 bg-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading uppercase">
              Page Not Found
            </h1>
            <div className="w-full h-1 max-w-[100px] bg-primary mx-auto mt-4"></div>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex justify-center pb-6 items-center space-x-2 text-sm font-medium font-body text-gray-500">
            <Link href="/" className="flex items-center text-gray-700 hover:text-primary">
              <Home className="h-5 w-5 mr-1" /> Home
            </Link>
            <span className="text-gray-500">Error 404</span>
          </nav>
        </div>

        {/* Shape Divider */}
        <div className="absolute -bottom-1 left-0 right-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#f9fafb" d="M0,64L1440,32L1440,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Error Information */}
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="flex items-center justify-center md:justify-start">
                <div className="relative">
                  <div className="text-9xl font-bold text-gray-100">404</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl font-bold text-primary">404</div>
                  </div>
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-800 text-center md:text-left">
                Oops! We can't find that page
              </h2>

              <p className="mt-4 text-gray-600 text-center md:text-left">
                The page you are looking for might have been removed, had its name changed, or is temporarily
                unavailable.
              </p>

              <div className="mt-8 space-y-4">
                <Link
                  href="/"
                  className="flex items-center justify-center w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-red-600 transition-colors">
                  <Home className="h-5 w-5 mr-2" />
                  Return to Homepage
                </Link>

                <Link
                  href="/topical-past-papers"
                  className="flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  <FileText className="h-5 w-5 mr-2" />
                  Browse Past Papers
                </Link>
              </div>
            </div>

            {/* Right Side - Helpful Resources */}
            <div className="md:w-1/2 bg-gray-50 p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Popular Resources</h3>

              <ul className="space-y-4">
                <li>
                  <Link
                    href="/notes"
                    className="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow transition-shadow">
                    <BookOpen className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-gray-800">Study Notes</div>
                      <div className="text-sm text-gray-500">Access comprehensive study materials</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/past-papers"
                    className="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow transition-shadow">
                    <FileText className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-gray-800">Past Papers</div>
                      <div className="text-sm text-gray-500">Practice with previous exam papers</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow transition-shadow">
                    <HelpCircle className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium text-gray-800">Need Help?</div>
                      <div className="text-sm text-gray-500">Contact our support team</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-gray-600 hover:text-primary">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Go Back to Previous Page
          </button>
        </div>
      </div>
    </main>
  );
}
