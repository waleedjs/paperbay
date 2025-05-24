import Link from "next/link";
import { Instagram, Phone, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-cyan-950 text-white">
      <div className="container max-w-[1280px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-semibold mb-4 font-heading">About Papers Bay</h3>

            <p className="text-gray-200 text-md font-body leading-relaxed">
              Your Gateway to Comprehensive Past Papers PDFs Worldwide. Explore our platform meticulously designed to
              offer a wealth of international past papers and resources. Engage interactively with our user-centric
              services, leveraging the extensive collection of backward-compatible ideas.
            </p>
          </div>

          {/* Pages Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4 font-heading">Pages</h3>
            <ul className="space-y-1 font-body">
              {[
                { href: "/", label: "Home" },
                { href: "/about-us", label: "About us" },
                { href: "/blog", label: "Blog" },
                { href: "/report-issue", label: "Report Issue" },
                { href: "/contact-us", label: "Contact us" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 hover:text-gray-300 transition-colors py-1">
                    <span className="inline-block w-1 h-1 bg-white rounded-full"></span>
                    <span className="relative">
                      {label}
                      <span className="group-hover:w-full w-0 absolute -bottom-[1px] left-0 h-[1px] bg-cyan-800 transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories and Contact */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Categories */}
            <div>
              <h3 className="text-xl font-semibold mb-4 font-heading">Categories</h3>
              <ul className="space-y-1 font-body">
                {[
                  { href: "/past-papers/as-a-level", label: "As & A Levels" },
                  { href: "/past-papers/o-level", label: "O Levels" },
                  { href: "/past-papers/igcse", label: "IGCSE" },
                  { href: "/topical-past-papers", label: "Topical Past Papers" },
                  { href: "/sat-papers", label: "SAT Papers" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 hover:text-gray-300 transition-colors py-1">
                      <span className="inline-block w-1 h-1 bg-white rounded-full"></span>
                      <span className="relative">
                        {label}
                        <span className="group-hover:w-full w-0 absolute -bottom-[1px] left-0 h-[1px] bg-cyan-800 transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4 font-heading">Contact Info</h3>
              <ul className="space-y-2 font-body">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="group inline-block hover:text-gray-300 transition-colors py-1">
                    <span className="relative">
                      Privacy Policy
                      <span className="group-hover:w-full w-0 absolute -bottom-[1px] left-0 h-[1px] bg-cyan-800 transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#FF4B6C]" />
                  <a href="tel:+923355553574" className="group inline-block hover:text-gray-300 transition-colors py-1">
                    <span className="relative">
                      +923355553574
                      <span className="group-hover:w-full w-0 absolute -bottom-[1px] left-0 h-[1px] bg-cyan-800 transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#FF4B6C]" />
                  <a
                    href="mailto:paperscambridge@gmail.com"
                    className="group inline-block hover:text-gray-300 transition-colors py-1">
                    <span className="relative">
                      paperscambridge@gmail.com
                      <span className="group-hover:w-full w-0 absolute -bottom-[1px] left-0 h-[1px] bg-cyan-800 transition-all duration-300"></span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-4 mt-4">
                  <a
                    href="https://pinterest.com"
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label="Pinterest">
                    <div className="bg-[#FF4B6C] rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z" />
                      </svg>
                    </div>
                  </a>
                  <a
                    href="https://instagram.com"
                    className="text-white hover:text-gray-300 transition-colors"
                    aria-label="Instagram">
                    <div className="bg-[#FF4B6C]  rounded-full p-2">
                      <Instagram className="h-3.5 w-3.5" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-100 text-gray-600 py-4">
        <div className="container mx-auto px-4 text-center font-body text-sm">
          © {new Date().getFullYear()} All Rights Reserved. Developed by
          <a
            href="https://www.pixelizio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-700 hover:text-secondery underline ml-1">
            Pixelizio
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
