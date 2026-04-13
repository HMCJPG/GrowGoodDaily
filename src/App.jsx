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
import './App.css';

function App() {
  return (
    <Router>
      <div className="app" id="app-root">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/why-it-matters" element={<WhyItMattersPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/founding-partners" element={<FoundingPartnersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
