import FeaturedCourses from '@/Component/FeaturedCourses';
// import Features from '@/Components/Features';
import Hero from '@/Component/Hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedCourses/>

      {/* <Features /> */}
    </div>
  );
}