import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Papers Cambridge",
  description: "Explore our latest articles, tips, and resources for academic success",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

