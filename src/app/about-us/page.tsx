import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  HomeIcon,
  ChevronRightIcon,
  Briefcase,
  GraduationCap,
  LayoutGrid,
  Lightbulb,
  Monitor,
  MousePointer,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl uppercase">About Us</h1>
            <div className="w-full h-1 max-w-[100px] bg-red-500 mx-auto mt-4"></div>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center space-x-2 text-sm font-medium text-gray-500">
            <Link href="/" className="flex items-center text-gray-700 hover:text-red-500">
              <HomeIcon className="h-5 w-5 mr-1" /> Home
            </Link>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-500">About Us</span>
          </nav>
        </div>

        {/* Shape Divider */}
        <div className="absolute -bottom-1 left-0 right-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#f9fafb" d="M0,64L1440,32L1440,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 w-full bg-[#f9fafb]">
        <div className="container max-w-[1280px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 uppercase font-heading">Who We Are</h2>
              <p className="text-gray-600 mb-4 font-body text-md">
                Welcome to Papers Bay, your go-to platform for accessing international past papers worldwide. Our
                mission is to empower you in achieving academic excellence by providing a comprehensive resource hub.
              </p>
              <p className="text-gray-600 mb-4 font-body text-md">
                Our commitment lies in making knowledge universally accessible, fostering growth, and ensuring success
                for every individual. Recognizing the diverse needs of learners, we have crafted a platform that adapts
                to various learning styles and preferences.
              </p>
              <p className="text-gray-600 font-body text-md">
                Whether you are a dedicated student striving for excellence, an educator in search of innovative
                resources, or a lifelong learner hungry for knowledge, Papers Bay is your dedicated ally on the
                academic frontier. We are committed to making knowledge accessible to all, fostering growth and success
                for everyone.
              </p>
            </div>
            <div className="relative">
              <div
                className="relative z-10 bg-contain bg-no-repeat bg-center duration-500 ease-in-out transform hover:scale-110"
                style={{ backgroundImage: "url('/images/about/banner-bg.png')" }}>
                <Image
                  src="/images/about/about.png"
                  alt="Student studying"
                  width={400}
                  height={400}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 w-full">
        <div className="container max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="bg-blue-500 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">Flexible Studying</h3>
              <p className="text-gray-600 text-sm font-body text-md">
                Personalize your study hours to suit your life, creating an adaptable and stress-free learning
                experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="bg-green-500 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">Effortless Placements</h3>
              <p className="text-gray-600 text-sm font-body text-md">
                Navigate placements effortlessly with our user-friendly support, simplifying your journey to success.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="bg-orange-500 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MousePointer className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold font-heading mb-3">On-the-Go Learning</h3>
              <p className="text-gray-600 font-body text-md">
                Study anytime, anywhere with our platform designed for dynamic, on-the-move learners.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6">
              <div className="bg-yellow-500 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold font-heading mb-3">Innovative Transitions</h3>
              <p className="text-gray-600 font-body text-md">
                Experience a new era of learning, transcending boundaries with creative methods and transformative
                journeys.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6">
              <div className="bg-blue-500 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Monitor className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Interactive Learning</h3>
              <p className="text-gray-600 font-body text-md">
                Immerse in hands-on education, where theory meets practice for a dynamic and impactful learning
                experience.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6">
              <div className="bg-green-500 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Easy to Access</h3>
              <p className="text-gray-600 font-body text-md">
                Seamlessly access a wealth of resources and past papers, ensuring a smooth and efficient study journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* What Sets Us Apart Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 font-heading">What Sets Our Courses Apart?</h2>
            <p className="text-gray-300 font-body text-md">
              Discover exceptional courses for a standout learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-1">
            {/* Step 1 */}
            <div className="animated-border bg-gray-800 p-8 rounded-2xl text-center  transition-transform duration-300">
              <div className="bg-transparent animated-border w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold font-heading mb-2">01. Learn</h3>
              <p className="text-gray-400 font-body text-md">
                Explore diverse subjects effortlessly with our international resources for an engaging learning
                experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="animated-border bg-gray-800 p-8 rounded-2xl text-center transition-transform duration-300">
              <div className="bg-transparent animated-border w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">02. Graduate</h3>
              <p className="text-gray-400 font-body text-md">
                Achieve academic milestones confidently, guided by our supportive resources on your graduation journey.
              </p>
            </div>

            {/* Step 3 */}
            <div className="animated-border bg-gray-800 p-8 rounded-2xl text-center transition-transform duration-300">
              <div className="bg-transparent animated-border w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">03. Work</h3>
              <p className="text-gray-400 font-body text-md">
                Apply knowledge seamlessly to succeed in a fulfilling work experience using our practical resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-10 w-full">
        <div className="container max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold font-heading text-gray-900 mb-4">What We Offer</h2>
            <div className="w-full h-1 max-w-[100px] bg-red-500 mx-auto mt-4 mb-8"></div>
          </div>
          <div className="mx-auto">
            <p className="text-gray-600 font-body text-md">
              At Papers Bay, we offer more than just study materials; we provide a gateway to a transformative
              learning experience. Our platform stands out with an extensive collection of Cambridge International
              Examinations (CIE) past papers, meticulously curated to make your educational journey seamless. With a
              focus on accessibility and innovation, we empower learners to adapt their study schedules, ensuring
              education is flexible and personalized. From effortless access to CIE past papers to on-the-go learning
              options, we strive to redefine your academic adventure. Let us help you navigate through innovative
              transitions, promoting interactive learning, and unlocking a world of knowledge that transcends
              traditional boundaries. Choose us for a holistic approach beyond textbooks, fostering a dynamic and
              enriching learning environment tailored to your success.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
