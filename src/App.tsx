/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HamaraStory from './components/HamaraStory';
import Facilities from './components/Facilities';
import PricingCalculator from './components/PricingCalculator';
import ExtrasDashboard from './components/ExtrasDashboard';
import BookingPolicies from './components/BookingPolicies';
import ServiceEthics from './components/ServiceEthics';
import Community from './components/Community';
import ThingsToDo from './components/ThingsToDo';
import Testimonials from './components/Testimonials';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import { LanguageProvider } from './LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen flex flex-col font-serif antialiased selection:bg-ocean-100 selection:text-ocean-900">
        {/* Sticky Header Navigation */}
        <Navbar />

        <main className="flex-grow">
          {/* 1. Cover page */}
          <Hero />

          {/* 2. About */}
          <About />

          {/* 3. Ibu Tia story */}
          <HamaraStory />

          {/* 4. Exclusive villa facilities */}
          <Facilities />

          {/* 5. Tariffs and promos */}
          <PricingCalculator />

          {/* 6. Extras */}
          <ExtrasDashboard />

          {/* 7. Policies */}
          <BookingPolicies />

          {/* 8. Service ethics */}
          <ServiceEthics />

          {/* 9. Community */}
          <Community />

          {/* 10. Things to do */}
          <ThingsToDo />

          {/* 11. Gallery */}
          <GallerySection />

          {/* Testimonials */}
          <Testimonials />
        </main>

        {/* Footer with Contacts, Maps and Instagram */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}


