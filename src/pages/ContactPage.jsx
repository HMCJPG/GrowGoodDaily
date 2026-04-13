import { useState } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import './ContactPage.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interest: 'updates',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check URL params for pre-selected interest
  useState(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get('interest');
    if (interest) {
      setFormData(prev => ({ ...prev, interest }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to a backend/API
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <main className="contact-page" id="contact-page">
      {/* Page Hero */}
      <section className="page-hero" id="contact-hero">
        <div className="page-hero__bg">
          <div className="page-hero__gradient" style={{ background: 'linear-gradient(135deg, #1A2E1C 0%, #2D8A4E 50%, #F9A825 100%)' }}></div>
        </div>
        <div className="container page-hero__content">
          <span className="hero__badge animate-fade-up">Get Involved</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            Join the Movement
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            Whether you want to fund, partner, advise, or simply stay connected, we want to hear from you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section" id="contact-form-section">
        <div className="container">
          <div className="contact-layout">
            <AnimatedSection className="contact-form-wrapper">
              {!isSubmitted ? (
                <>
                  <span className="section__label">Connect With Us</span>
                  <h2 className="section__title">Start a Conversation</h2>
                  <p className="contact-form__intro">
                    Fill out the form below and we will be in touch. Whether you're interested in funding, partnerships, advising, or just want to receive updates, we'd love to connect.
                  </p>
                  
                  <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                    <div className="contact-form__group">
                      <label htmlFor="contact-name">Full Name *</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="contact-form__group">
                      <label htmlFor="contact-email">Email Address *</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="contact-form__group">
                      <label htmlFor="contact-organization">Organization (Optional)</label>
                      <input
                        type="text"
                        id="contact-organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Your organization or company"
                      />
                    </div>

                    <div className="contact-form__group">
                      <label htmlFor="contact-interest">I'm Interested In *</label>
                      <select
                        id="contact-interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        required
                      >
                        <option value="funding">Funding / Financial Support</option>
                        <option value="partnership">Partnership / Collaboration</option>
                        <option value="advisory">Advisory / Expertise</option>
                        <option value="updates">Receiving Updates</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="contact-form__group contact-form__group--full">
                      <label htmlFor="contact-message">Message (Optional)</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Tell us more about how you'd like to be involved..."
                      />
                    </div>

                    <button type="submit" className="btn btn--primary btn--lg contact-form__submit" id="contact-submit-btn">
                      Send Message →
                    </button>
                  </form>
                </>
              ) : (
                <div className="contact-success" id="contact-success">
                  <div className="contact-success__icon">✅</div>
                  <h2>Thank You!</h2>
                  <p>Your message has been received. We will be in touch soon.</p>
                  <p>In the meantime, feel free to explore our vision and share it with others.</p>
                </div>
              )}
            </AnimatedSection>

            <AnimatedSection className="contact-sidebar" delay={0.2}>
              <div className="contact-sidebar__card">
                <h3>Quick Ways to Connect</h3>
                <div className="contact-sidebar__options">
                  <div className="contact-sidebar__option">
                    <span className="contact-sidebar__option-icon">💰</span>
                    <div>
                      <strong>I want to fund</strong>
                      <p>Help launch and sustain early programming</p>
                    </div>
                  </div>
                  <div className="contact-sidebar__option">
                    <span className="contact-sidebar__option-icon">🤝</span>
                    <div>
                      <strong>I want to partner</strong>
                      <p>Bring programming to your community</p>
                    </div>
                  </div>
                  <div className="contact-sidebar__option">
                    <span className="contact-sidebar__option-icon">💡</span>
                    <div>
                      <strong>I want to advise</strong>
                      <p>Share your expertise and insights</p>
                    </div>
                  </div>
                  <div className="contact-sidebar__option">
                    <span className="contact-sidebar__option-icon">📩</span>
                    <div>
                      <strong>I want updates</strong>
                      <p>Stay informed as we grow</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-sidebar__card contact-sidebar__card--note">
                <h3>Where We Are</h3>
                <p>
                  Grow Good Daily is in its formative stage. We are sharing the vision, building early relationships, and inviting founding supporters to help shape and launch the work.
                </p>
                <p>
                  Your interest matters. Every conversation helps us grow.
                </p>
              </div>

              <div className="contact-sidebar__card">
                <h3>Other Resources</h3>
                <div className="contact-sidebar__links">
                  <a href="https://sammyrabbit.com" target="_blank" rel="noopener noreferrer" className="contact-sidebar__link" id="contact-sammy-link">
                    <span>🐰</span> SammyRabbit.com
                  </a>
                  <a href="https://bedtimemoneyhabits.com" target="_blank" rel="noopener noreferrer" className="contact-sidebar__link" id="contact-bedtime-link">
                    <span>📚</span> BedtimeMoneyHabits.com
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
