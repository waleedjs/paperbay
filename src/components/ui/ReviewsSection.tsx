/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef } from "react";

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "Ahmed Khan",
      role: "A-Level Student",
      comment:
        "This website has been a lifesaver for my A-level preparation. All the past papers are well organized and easy to find.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "IGCSE Teacher",
      comment:
        "Great resource for Global IGCSE students. I particularly like how the marking schemes are available alongside the question papers.",
      rating: 4,
    },
    {
      name: "Michael Brown",
      role: "O-Level Student",
      comment:
        "The past papers collection has helped me improve my exam preparation significantly. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emma Wilson",
      role: "A-Level Teacher",
      comment:
        "An excellent resource for both teachers and students. The organization of papers makes my job much easier.",
      rating: 5,
    },
  ];

  // Create a circular array for infinite loop
  const circularReviews = [...reviews, ...reviews, ...reviews];
  const totalSlides = circularReviews.length;

  // Check screen size and update slidesToShow
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate slide width based on slidesToShow
  const slideWidth = 100 / slidesToShow;

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, slidesToShow]);

  // Handle infinite loop
  useEffect(() => {
    if (currentIndex >= totalSlides - slidesToShow) {
      // If we're at the end, jump to the beginning without animation
      const timeout = setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = "none";
          setCurrentIndex(reviews.length);

          // Re-enable transition after the jump
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.style.transition = "transform 500ms ease-in-out";
            }
          }, 50);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }

    if (currentIndex < reviews.length) {
      // If we're at the beginning, jump to the middle set without animation
      const timeout = setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = "none";
          setCurrentIndex(reviews.length);

          // Re-enable transition after the jump
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.style.transition = "transform 500ms ease-in-out";
            }
          }, 50);
        }
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalSlides, slidesToShow, reviews.length]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="py-16 overflow-hidden">
      <div ref={containerRef} className="container max-w-[1280px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 font-heading">Student Reviews</h2>
        <p className="text-center font-body text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear what students and teachers are saying about our past paper collection.
        </p>

        <div className="mx-auto relative">
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * slideWidth}%)`,
              }}>
              {circularReviews.map((review, index) => (
                <div key={index} className="px-2 flex-shrink-0" style={{ width: `${slideWidth}%` }}>
                  <div
                    className={`bg-white rounded-lg shadow-lg p-6 h-full transition-all duration-300 transform ${
                      index >= currentIndex && index < currentIndex + slidesToShow ? "-translate-y-2" : ""
                    }`}>
                    <p className="text-gray-700 mb-6 font-body">"{review.comment}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800 font-medium font-heading">{review.name}</p>
                        <p className="text-sm font-body text-gray-500">{review.role}</p>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.393 4.287a1 1 0 00.95.69h4.5c.969 0 1.371 1.24.588 1.81l-3.639 2.586a1 1 0 00-.364 1.118l1.393 4.287c.3.921-.755 1.688-1.538 1.118l-3.639-2.586a1 1 0 00-1.175 0l-3.639 2.586c-.783.57-1.838-.197-1.538-1.118l1.393-4.287a1 1 0 00-.364-1.118L2.318 9.714c-.783-.57-.381-1.81.588-1.81h4.5a1 1 0 00.95-.69l1.393-4.287z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous slide">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
            aria-label="Next slide">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}