// components/LatestPapers.tsx
import { FileText } from "lucide-react"

export default function LatestPapers() {
  return (
    <section className="py-16 w-full bg-gray-50">
      <div className="container max-w-[1280px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-heading mb-4 text-gray-800">Latest Papers</h2>
        <p className="text-center font-body text-gray-600 mb-12 max-w-2xl mx-auto">
          Recently added examination papers from the latest sessions
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow p-6 flex flex-col">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded mr-4">
                  <FileText className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 font-heading">Mathematics (0580)</h3>
                  <p className="text-sm text-gray-500 font-body">May/June 2023 • Paper {item}</p>
                </div>
              </div>
              <div className="flex mt-auto pt-4 border-t border-gray-100">
                <button className="text-[#245d51] border font-body border-[#245d51] bg-transparent hover:bg-[#245d51] hover:text-white px-3 py-1 rounded-md text-sm font-medium transition-all">
                  View Papers
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
