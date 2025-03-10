import HeroCarousel from '@/sections/home-page/hero-carousel';
import CategoryCarousel from '@/sections/home-page/categories-section';
import CategorySection from '@/sections/home-page/category-section';
import DealsSection from '@/sections/home-page/deals-section';
import AltCategorySection from '@/sections/home-page/alt-category-section';
import CTASection from '@/sections/home-page/cta-section';

export default async function Home() {
  return (
    <main className="container mx-auto mt-0 flex w-full max-w-7xl flex-col justify-center px-4 py-8 md:mt-14">
      <HeroCarousel />
      <CategoryCarousel />
      <CategorySection category="electronics" />
      <DealsSection />
      <AltCategorySection category="women's clothing" />
      <CTASection />
    </main>
  );
}
