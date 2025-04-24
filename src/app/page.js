import Home from '@/app/sections/HeroSection/';
import TrustSection from '@/app/sections/TrustSection/';
import WhyChooseSection from '@/app/sections/WhyChooseSection';
import TestimonalsSection from '@/app/sections/TestimonalsSection';
import GallerySection from '@/app/sections/GallerySection';
import TimelineSection from '@/app/sections/TimelineSection';
import CtaSection from '@/app/sections/CtaSection';

export default function Root() {
  return (
    <>
    <main>
      <Home />
      <TrustSection />
      <WhyChooseSection />
      <TestimonalsSection />
      <GallerySection />
      <TimelineSection />
      <CtaSection />
    </main>
    </>
  )
}