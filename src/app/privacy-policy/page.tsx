/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Papers Bay",
  description: "Our privacy policy explains how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen font-heading ">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-secondery px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            <p className="mt-2 text-green-100 font-body">Last Updated: May 21, 2025</p>
          </div>

          <div className="px-6 py-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6 font-body">
                At Papers Bay, we are committed to protecting your privacy and ensuring the security of your personal
                information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit
                our website.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                Information We Collect
              </h2>
              <p className="text-gray-600 mb-4 font-body">
                We collect information that you provide directly to us, such as when you create an account, subscribe to
                our newsletter, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 font-body">
                <li className="mb-2">Personal information (name, email address, contact details)</li>
                <li className="mb-2">Account credentials</li>
                <li className="mb-2">Educational information (school, grade level, subjects of interest)</li>
                <li className="mb-2">Payment information when purchasing premium content</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-600 mb-4 font-body">
                When you visit our website, we automatically collect certain information about your device and usage,
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 font-body">
                <li className="mb-2">IP address and device information</li>
                <li className="mb-2">Browser type and settings</li>
                <li className="mb-2">Usage data and browsing activity</li>
                <li className="mb-2">Cookies and similar technologies</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4 font-body">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 font-body">
                <li className="mb-2">Providing and improving our educational resources and services</li>
                <li className="mb-2">Processing transactions and managing your account</li>
                <li className="mb-2">Personalizing your experience and recommending relevant content</li>
                <li className="mb-2">Communicating with you about updates, offers, and support</li>
                <li className="mb-2">Analyzing usage patterns to enhance our website functionality</li>
                <li className="mb-2">Ensuring the security and integrity of our platform</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                Data Sharing and Disclosure
              </h2>
              <p className="text-gray-600 mb-4 font-body">
                We do not sell your personal information to third parties. We may share your information in the
                following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 font-body">
                <li className="mb-2">With service providers who help us operate our website</li>
                <li className="mb-2">To comply with legal obligations</li>
                <li className="mb-2">With your consent or at your direction</li>
                <li className="mb-2">In connection with a business transfer or merger</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                Your Rights and Choices
              </h2>
              <p className="text-gray-600 mb-4 font-body">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6 font-body">
                <li className="mb-2">Accessing, correcting, or deleting your personal information</li>
                <li className="mb-2">Restricting or objecting to our use of your data</li>
                <li className="mb-2">Requesting portability of your information</li>
                <li className="mb-2">Withdrawing consent for future processing</li>
              </ul>
              <p className="text-gray-600 mb-6 font-body">
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                Data Security
              </h2>
              <p className="text-gray-600 mb-6 font-body">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                Children's Privacy
              </h2>
              <p className="text-gray-600 mb-6 font-body">
                Our services are not directed to children under 13. We do not knowingly collect personal information
                from children under 13. If you believe we have collected information from a child under 13, please
                contact us immediately.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                Changes to This Policy
              </h2>
              <p className="text-gray-600 mb-6 font-body">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                updated policy on this page with a new "Last Updated" date.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
                Contact Us
              </h2>
              <p className="text-gray-600 mb-6 font-body">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices,
                please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700 font-medium">Papers Bay</p>
                <p className="text-gray-600 font-body">Email: Papers Bay@gmail.com</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondery focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
