import FeaturedCourses from '@/Component/FeaturedCourses';
// import Features from '@/Components/Features';
import Hero from '@/Component/Hero';
import HowItWorks from '@/Component/HowItWorks';
import WhyStudyNook from '@/Component/WhyStudyNook';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCourses />
      <WhyStudyNook />
      <HowItWorks/>
    </div>
  );
}