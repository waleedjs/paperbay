// pages/index.tsx
import HeroSection from "@/components/ui/HeroSection";
import PaperCategories from "@/components/ui/PaperCategories"; 
import LatestPapers from "@/components/ui/LatestPapers";
import ReviewsSection from "@/components/ui/ReviewsSection";
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PaperCategories />
      <LatestPapers />
      <ReviewsSection />
    </>
  )
}
