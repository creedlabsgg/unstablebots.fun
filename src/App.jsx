import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TransitionProvider } from './contexts/TransitionContext';
import QuarkAmbientBackground from './components/QuarkAmbientBackground';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InviteModal from './components/InviteModal';
import LandingPage from './pages/LandingPage';
import BotsPage from './pages/BotsPage';
import PlaygroundPage from './pages/PlaygroundPage';
import CommunityPage from './pages/CommunityPage';
import CommandsPage from './pages/CommandsPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import LegalPage from './pages/LegalPage';

export default function App() {
  return (
    <TransitionProvider>
      <div className="min-h-screen flex flex-col bg-[#000000] text-white font-outfit relative selection:bg-[#FF1744] selection:text-white">
        <QuarkAmbientBackground />
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/bots" element={<BotsPage />} />
            <Route path="/arena" element={<PlaygroundPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
        <InviteModal />
      </div>
    </TransitionProvider>
  );
}
