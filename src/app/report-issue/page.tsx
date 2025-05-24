import ReportIssueForm from "@/components/ui/report-issue-form";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-secondery text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Report Issue</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Facing a problem? Fill the form below to report the issue and our team will assist you shortly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary text-white p-6">
            <h2 className="text-2xl font-bold">Report Missing Paper or Issue</h2>
            <p className="mt-2">Can not find a specific paper or noticed an issue? Let us know and we will fix it.</p>
          </div>

          <div className="p-6">
            <ReportIssueForm />
          </div>
        </div>
      </div>
    </main>
  );
}
