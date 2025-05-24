"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import CountUp from "react-countup";

export default function PastPapersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Category Cards Section */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-heading mb-4">Past Papers Categories</h2>
            <div className="w-24 h-1 bg-primary rounded-full mb-6"></div>
            <p className="text-gray-600 font-body text-center max-w-2xl">
              Browse our extensive collection of past papers organized by examination level
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AS & A Level Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-20 w-20 text-white opacity-30" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 font-heading mb-2">AS & A Level</h3>
                <p className="text-gray-600 mb-4 font-body">
                  Access past papers for Advanced qualifications, covering a wide range of subjects.
                </p>
                <Link
                  href="/past-papers/as-a-level"
                  className="inline-flex items-center font-body text-red-600 font-medium hover:text-red-800">
                  Browse Papers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* O Level Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-20 w-20 text-white opacity-30" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">O Level</h3>
                <p className="text-gray-600 mb-4 font-body">
                  Find comprehensive O Level past papers for all subjects, perfect for exam preparation and revision.
                </p>
                <Link
                  href="/past-papers/o-level"
                  className="inline-flex items-center font-body text-blue-600 font-medium hover:text-blue-800">
                  Browse Papers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* IGCSE Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-green-500 to-green-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-20 w-20 text-white opacity-30" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">IGCSE</h3>
                <p className="text-gray-600 mb-4 font-body">
                  Explore IGCSE past papers from various examination boards, organized by subject and year.
                </p>
                <Link
                  href="/past-papers/igcse"
                  className="inline-flex items-center font-body text-green-600 font-medium hover:text-green-800">
                  Browse Papers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Box 1: Past Papers */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold font-heading text-secondary mb-2">
                <CountUp end={100000} duration={3} />+
              </div>
              <div className="text-gray-600 font-body">Past Papers</div>
            </div>

            {/* Box 2: Subjects */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-heading font-bold text-secondary mb-2">
                <CountUp end={50} duration={3} />+
              </div>
              <div className="text-gray-600 font-body">Subjects</div>
            </div>

            {/* Box 3: Years Coverage */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-heading font-bold text-secondary mb-2">
                <CountUp end={15} duration={3} />+
              </div>
              <div className="text-gray-600 font-body">Years Coverage</div>
            </div>

            {/* Box 4: Teachers */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-heading font-bold text-secondary mb-2">
                <CountUp end={500} duration={3} />+
              </div>
              <div className="text-gray-600 font-body">Teachers Involved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="bg-gradient-to-r from-indigo-800 to-primary rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex items-center">
              <div className="md:w-2/3 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-4 font-heading">Ready to Excel in Your Exams?</h2>
                <p className="text-indigo-100 mb-6 text-lg font-body">
                  Get unlimited access to our complete collection of past papers, mark schemes, and examiner reports.
                </p>
                <div>
                  <Link href="/contact-us">
                    <Button variant="primary" size="md">
                      Get In Touch
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3 relative">
                <div className="p-8 md:p-0">
                  <Image
                    src="/images/past-papers/CTA.png"
                    alt="Study materials"
                    width={300}
                    height={300}
                    className="mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
