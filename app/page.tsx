import Navbar from '@/components/Navbar';
import HeroShortener from '@/components/HeroShortener';
import LandingSections from '@/components/LandingSections';

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-950 text-navy-50 selection:bg-brand-500 selection:text-white">
      <Navbar />
      <HeroShortener />
      <LandingSections />
    </main>
  );
}
