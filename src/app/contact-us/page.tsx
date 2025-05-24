"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Home, ChevronRight, Mail, Phone, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

interface FormData {
  fullName: string
  phone: string
  email: string
  message: string
}

interface ApiResponse {
  message?: string
  success?: boolean
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setShowSuccess(false)
    setShowError(false)

    try {
      const contactData: FormData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      }

      // Use environment variable or relative path for API endpoint
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api/contact"

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      const result: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit contact form")
      }

      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        message: "",
      })

      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (error) {
      setIsSubmitting(false)
      setShowError(true)
      const errorMsg = error instanceof Error ? error.message : "An error occurred"
      setErrorMessage(errorMsg)

      setTimeout(() => {
        setShowError(false)
      }, 5000)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative py-16 bg-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl uppercase">Contact Us</h1>
            <div className="w-full h-1 max-w-[100px] bg-red-500 mx-auto mt-4"></div>
          </div>

          <nav className="flex justify-center pb-10 items-center space-x-2 text-sm font-medium text-gray-500">
            <Link href="/" className="flex items-center text-gray-700 hover:text-red-500 transition-colors">
              <Home className="h-5 w-5 mr-1" /> Home
            </Link>
            <ChevronRight className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500">Contact Us</span>
          </nav>
        </div>

        <div className="absolute -bottom-1 left-0 right-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#f9fafb" d="M0,64L1440,32L1440,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      <section className="pb-16 pt-6 w-full">
        <div className="container max-w-[1080px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Get In Touch</h2>
              <form className="space-y-4 font-body" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {showSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 font-body px-4 py-3 rounded-md flex items-center animate-in fade-in duration-300">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Your message has been sent successfully!</span>
                  </div>
                )}

                {showError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center animate-in fade-in duration-300">
                    <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-all duration-200 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm flex items-center justify-center">
              <Image
                src="/images/contact/contact.png"
                alt="Contact illustration"
                width={400}
                height={400}
                className="max-w-full h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-red-50 p-6 rounded-lg flex items-center hover:shadow-md transition-shadow">
              <div className="bg-red-500 p-3 rounded-full mr-4 shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900 font-heading">Location</h3>
                <p className="text-sm text-gray-600 font-body">27/2b, New York, USA</p>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg flex items-center hover:shadow-md transition-shadow">
              <div className="bg-red-500 p-3 rounded-full mr-4 shadow-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900 font-heading">Email Address</h3>
                <p className="text-sm text-gray-600 font-body">
                  <a href="mailto:paperscambridge@gmail.com" className="hover:text-red-500 transition-colors">
                    paperscambridge@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg flex items-center hover:shadow-md transition-shadow">
              <div className="bg-red-500 p-3 rounded-full mr-4 shadow-lg">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900 font-heading">Contact Number</h3>
                <p className="text-sm text-gray-600 font-body">
                  <a href="tel:+923456716817" className="hover:text-red-500 transition-colors">
                    +923456716817
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
