import { FileText, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function PaperCategories() {
  return (
    <section className="py-16 w-full">
      <div className="container max-w-[1280px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 font-heading">Paper Categories</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl font-body mx-auto">
          Select from our comprehensive collection of examination papers organized by qualification level.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-2 hover:shadow-xl border border-gray-100 transition-all duration-300">
            <div className="w-14 h-14 bg-[#245d51]/20 rounded-lg flex items-center justify-center mb-6">
              <FileText className="text-[#245d51] w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 font-heading">AS & A Levels</h3>
            <p className="text-gray-600 font-body mb-6">
              Access comprehensive papers with marking schemes and examiner reports.
            </p>
            <Link href="/past-papers/as-a-level">
              <button className="bg-primary font-body cursor-pointer hover:bg-[#e75222]/90 text-white px-4 py-2 rounded-md font-medium transition-all">
                Browse Papers
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-2 hover:shadow-xl border border-gray-100 transition-all duration-300">
            <div className="w-14 h-14 bg-[#245d51]/20 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="text-[#245d51] w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 font-heading">O Levels</h3>
            <p className="text-gray-600 font-body mb-6">
              Find papers from all subjects with detailed solutions and guidance.
            </p>
            <Link href="/past-papers/o-level">
              <button className="bg-primary font-body cursor-pointer hover:bg-[#e75222]/90 text-white px-4 py-2 rounded-md font-medium transition-all">
                Browse Papers
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-2 hover:shadow-xl border border-gray-100 transition-all duration-300">
            <div className="w-14 h-14 bg-[#245d51]/20 rounded-lg flex items-center justify-center mb-6">
              <GraduationCap className="text-[#245d51] w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 font-heading">IGCSE</h3>
            <p className="text-gray-600 font-body mb-6">
              Explore papers with comprehensive solutions and study materials.
            </p>
            <Link href="/past-papers/igcse">
              <button className="bg-primary font-body cursor-pointer hover:bg-[#e75222]/90 text-white px-4 py-2 rounded-md font-medium transition-all">
                Browse Papers
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
