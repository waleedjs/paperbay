/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";

// Custom CheckCircle icon component
const CheckCircleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-green-500"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
};

// Custom Button component
const Button = ({
  children,
  type = "button",
  className = "",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md font-medium text-white transition-colors ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-primary hover:bg-primary/90 active:bg-secondery"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Custom Input component
const Input = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}: {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    />
  );
};

// Custom Label component
const Label = ({
  htmlFor,
  children,
  className = "",
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {children}
    </label>
  );
};

// Custom Textarea component
const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  className = "",
  required = false,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    />
  );
};

// Custom RadioGroup components
const RadioGroup = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
};

const RadioItem = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
}: {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-4 w-4 text-[#1e40af] border-gray-300 focus:ring-primary"
      />
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

// Custom Select components
const Select = ({
  id,
  value,
  onChange,
  children,
  placeholder,
  required = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  required?: boolean;
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
};

const SelectOption = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return <option value={value}>{children}</option>;
};

interface Report {
  id: string;
  examType: string;
  subject: string;
  year: number;
  session: string;
  issueType: string;
  description: string;
  email: string;
  resolved: boolean;
  createdAt: string;
}

const ReportList = ({
  reports,
  onDelete,
  loading,
  error,
}: {
  reports: Report[];
  onDelete: (id: string) => void;
  loading: boolean;
  error: string | null;
}) => {
  if (loading)
    return <div className="text-center py-4">Loading reports...</div>;
  if (error)
    return <div className="text-center py-4 text-primary">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Report List</h2>
      {reports.length === 0 ? (
        <p className="text-center py-4">No reports found.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    {report.subject} ({report.year})
                  </h3>
                  <p className="text-sm text-gray-600">
                    {report.examType.toUpperCase()} - {report.session}
                  </p>
                  <p className="mt-2">{report.description}</p>
                  <p className="text-sm mt-2">Reported by: {report.email}</p>
                  <p className="text-sm">
                    Status: {report.resolved ? "Resolved" : "Pending"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Reported on: {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button
                  onClick={() => onDelete(report.id)}
                  className="bg-primary hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ReportIssuePage() {
  const [viewMode, setViewMode] = useState<"submit" | "view">("submit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    examType: "",
    subject: "",
    year: "",
    session: "",
    issueType: "missing",
    description: "",
    email: "",
  });

  // Report list states
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [reportError, setReportError] = useState<string | null>(null);

  // Fetch reports when in view mode
  useEffect(() => {
    if (viewMode === "view") {
      fetchReports();
    }
  }, [viewMode]);

  const fetchReports = async () => {
    try {
      setLoadingReports(true);
      setReportError(null);
      const response = await fetch("http://localhost:3000/reports");
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }
      const data = await response.json();
      setReports(data);
    } catch (err) {
      setReportError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoadingReports(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      const response = await fetch(`http://localhost:3000/reports/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }

      // Remove the deleted report from state
      setReports(reports.filter((report) => report.id !== id));
    } catch (err) {
      setReportError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, issueType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("http://192.168.18.169:3000/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message && Array.isArray(data.message)) {
          // Handle validation errors from NestJS
          const validationErrors = data.message.reduce(
            (acc: Record<string, string>, err: any) => {
              acc[err.property] = Object.values(err.constraints).join(", ");
              return acc;
            },
            {}
          );
          setErrors(validationErrors);
        } else {
          throw new Error(data.message || "Failed to submit report");
        }
        return;
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting report:", error);
      setErrors({
        general:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
      examType: "",
      subject: "",
      year: "",
      session: "",
      issueType: "missing",
      description: "",
      email: "",
    });
    setErrors({});
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <CheckCircleIcon />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your issue has been reported successfully. We will look into it as
          soon as possible.
        </p>
        <Button onClick={resetForm} className="bg-primary">
          Report Another Issue
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {viewMode === "submit" ? "Report an Issue" : "View Reports"}
        </h1>
        <Button
          onClick={() => setViewMode(viewMode === "submit" ? "view" : "submit")}
        >
          {viewMode === "submit" ? "View Reports" : "Submit New Report"}
        </Button>
      </div>

      {viewMode === "submit" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="examType">Examination Type</Label>
              <Select
                id="examType"
                value={formData.examType}
                onChange={(value) => handleSelectChange("examType", value)}
                placeholder="Select examination type"
                required
              >
                <SelectOption value="alevel">As & A Level</SelectOption>
                <SelectOption value="olevel">O Level</SelectOption>
                <SelectOption value="igcse">IGCSE</SelectOption>
                <SelectOption value="other">Other</SelectOption>
              </Select>
              {errors.examType && (
                <p className="mt-1 text-sm text-primary">{errors.examType}</p>
              )}
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Mathematics, Physics, English"
                required
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-primary">{errors.subject}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Year</Label>
                <Select
                  id="year"
                  value={formData.year}
                  onChange={(value) => handleSelectChange("year", value)}
                  placeholder="Select year"
                  required
                >
                  {Array.from(
                    { length: 10 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <SelectOption key={year} value={year.toString()}>
                      {year}
                    </SelectOption>
                  ))}
                </Select>
                {errors.year && (
                  <p className="mt-1 text-sm text-primary">{errors.year}</p>
                )}
              </div>
              <div>
                <Label htmlFor="session">Session</Label>
                <Select
                  id="session"
                  value={formData.session}
                  onChange={(value) => handleSelectChange("session", value)}
                  placeholder="Select session"
                  required
                >
                  <SelectOption value="may-june">May/June</SelectOption>
                  <SelectOption value="oct-nov">October/November</SelectOption>
                  <SelectOption value="feb-march">February/March</SelectOption>
                </Select>
                {errors.session && (
                  <p className="mt-1 text-sm text-primary">{errors.session}</p>
                )}
              </div>
            </div>

            <div>
              <Label className="block mb-2">Issue Type</Label>
              <RadioGroup className="flex flex-col space-y-2">
                <RadioItem
                  id="missing"
                  name="issueType"
                  value="missing"
                  checked={formData.issueType === "missing"}
                  onChange={handleRadioChange}
                  label="Missing Paper"
                />
                <RadioItem
                  id="incorrect"
                  name="issueType"
                  value="incorrect"
                  checked={formData.issueType === "incorrect"}
                  onChange={handleRadioChange}
                  label="Incorrect Paper"
                />
                <RadioItem
                  id="broken"
                  name="issueType"
                  value="broken"
                  checked={formData.issueType === "broken"}
                  onChange={handleRadioChange}
                  label="Broken Link"
                />
                <RadioItem
                  id="other"
                  name="issueType"
                  value="other"
                  checked={formData.issueType === "other"}
                  onChange={handleRadioChange}
                  label="Other Issue"
                />
              </RadioGroup>
              {errors.issueType && (
                <p className="mt-1 text-sm text-primary">{errors.issueType}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Describe the Issue</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide details about the issue..."
                className="h-32"
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-primary">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="We'll notify you when the issue is resolved"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-primary">{errors.email}</p>
              )}
            </div>
          </div>

          {errors.general && (
            <div className="p-4 bg-red-50 text-primary rounded-md">
              {errors.general}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      ) : (
        <ReportList
          reports={reports}
          onDelete={handleDelete}
          loading={loadingReports}
          error={reportError}
        />
      )}
    </div>
  );
}
