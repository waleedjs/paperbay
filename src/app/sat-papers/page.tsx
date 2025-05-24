import Link from "next/link";

export default function SatPapers() {
  const papers = Array.from({ length: 20 }, (_, i) => `SAT Paper ${i + 1}`);

  return (
    <div className="min-h-screen bg-secondary text-gray-800 ">
      <div className="bg-secondery text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2 font-heading">Sat Papers</h1>
        <p className="text-lg max-w-3xl mx-auto font-body">
          Access official SAT past papers and practice materials through the College Board website to help with exam
          preparation.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-4 font-body">
        <ul className="space-y-3">
          {papers.map((paper, index) => (
            <li key={index}>
              <Link
                href={`https://example.com/sat-paper-${index + 1}.pdf`}
                target="_blank"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-blue-50 transition-colors group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary mr-3 group-hover:scale-110 transition-transform"
                  fill="currentColor">
                  <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                  <path d="M14 2v6h6" />
                </svg>
                <span className="font-medium text-primary group-hover:underline">{paper}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
