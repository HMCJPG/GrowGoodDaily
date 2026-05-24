import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VisionPage from './pages/VisionPage';
import WhyItMattersPage from './pages/WhyItMattersPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FoundingPartnersPage from './pages/FoundingPartnersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FiveYearPlanPage from './pages/FiveYearPlanPage';
import YouthStrategyPage from './pages/YouthStrategyPage';
import './App.css';

/* Lazy-loaded pages — these pull in heavy deps (react-markdown, highlight.js)
   and are split into separate chunks to keep the initial bundle lean. */
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function App() {
  return (
    <Router>
      <div className="app" id="app-root">
        <Header />
        <Suspense fallback={<div className="section text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading…</p></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vision" element={<VisionPage />} />
            <Route path="/why-it-matters" element={<WhyItMattersPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/founding-partners" element={<FoundingPartnersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/5-year-plan" element={<FiveYearPlanPage />} />
            <Route path="/youth-strategy" element={<YouthStrategyPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

