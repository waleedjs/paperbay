/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { Home, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function NotesPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How are the notes organized?",
      answer:
        "Our notes are organized by subject and topic, following the official Global curriculum. Each set of notes includes key concepts, explanations, diagrams, and practice questions to help you master the material.",
    },
    {
      question: "Are these notes aligned with the latest syllabus?",
      answer:
        "Yes, all our notes are regularly updated to align with the latest Global syllabi for A/AS Level, O Level, and IGCSE examinations. We ensure that all content reflects current examination requirements.",
    },
    {
      question: "Can I download the notes for offline study?",
      answer:
        "Yes, all our notes are available in downloadable PDF format, allowing you to study offline at your convenience. Simply navigate to the notes you need and click the download button.",
    },
    {
      question: "Do you provide notes for all subjects?",
      answer:
        "We provide comprehensive notes for most core subjects including Mathematics, Sciences, English, History, Geography, and more. We're continuously expanding our collection to cover additional subjects.",
    },
    {
      question: "How can I request notes for a specific topic?",
      answer:
        "If you need notes on a specific topic that isn't currently available, you can submit a request through our contact form. Our team reviews all requests and prioritizes creating new content based on student demand.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading uppercase">
              Notes
            </h1>
            <div className="w-full h-1 max-w-[100px] bg-red-500 mx-auto mt-4"></div>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex justify-center pb-10 items-center space-x-2 text-sm font-medium font-body text-gray-500">
            <Link href="/" className="flex items-center text-gray-700 hover:text-red-500">
              <Home className="h-5 w-5 mr-1" /> Home
            </Link>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500">Notes</span>
          </nav>
        </div>

        {/* Shape Divider */}
        <div className="absolute -bottom-1 left-0 right-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#f9fafb" d="M0,64L1440,32L1440,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Notes Cards Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-[[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* A and AS Level Notes Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-red-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold font-heading text-gray-900">AS and A Level Notes</h3>
                <div className="w-12 h-1 bg-red-500 mt-2"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 font-body mb-4">Comprehensive study materials for Advanced examinations.</p>
                <Link
                  href="/notes/as-a-level-notes"
                  className="inline-flex items-center font-medium text-red-500 hover:text-red-600 hover:underline">
                  Explore Notes
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* O Level Notes Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-red-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold font-heading text-gray-900">O Level Notes</h3>
                <div className="w-12 h-1 bg-red-500 mt-2"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 font-body mb-4">
                  High-quality notes for Global O Level subjects to help you excel in your exams.
                </p>
                <Link
                  href="/notes/o-level-notes"
                  className="inline-flex items-center font-medium text-red-500 hover:text-red-600 hover:underline">
                  Explore Notes
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* IGCSE Notes Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-red-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold font-heading text-gray-900">IGCSE Notes</h3>
                <div className="w-12 h-1 bg-red-500 mt-2"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 font-body mb-4">
                  Well-structured and comprehensive study materials tailored for the Global IGCSE curriculum.
                </p>
                <Link
                  href="/notes/igcse-notes"
                  className="inline-flex items-center font-medium text-red-500 hover:text-red-600 hover:underline">
                  Explore Notes
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-heading uppercase">
              Frequently Asked Questions
            </h2>
            <div className="w-full h-1 max-w-[100px] bg-red-500 mx-auto mt-4"></div>
            <p className="mt-4 text-gray-600 font-body">Find answers to common questions about our educational notes</p>
          </div>

          <div className="mt-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center py-4 text-left font-heading font-medium text-gray-900 focus:outline-none">
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      openFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-96 pb-4" : "max-h-0"
                  }`}>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
