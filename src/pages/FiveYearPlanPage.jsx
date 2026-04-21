import { AnimatedSection } from '../components/AnimatedSection';
import './HomePage.css';

export default function FiveYearPlanPage() {
  return (
    <main className="fiveyr-page" id="fiveyr-page">
      {/* Page Hero */}
      <section className="page-hero" id="fiveyr-hero">
        <div className="page-hero__bg">
          <div className="page-hero__gradient" style={{ background: 'linear-gradient(135deg, #1A2E1C 0%, #2D8A4E 50%, #1A2E1C 100%)' }}></div>
        </div>
        <div className="container page-hero__content">
          <span className="hero__badge animate-fade-up">The Roadmap</span>
          <h1 className="page-hero__title animate-fade-up delay-1">
            Grow Good Daily &ndash; 5-Year Plan
          </h1>
          <p className="page-hero__subtitle animate-fade-up delay-2">
            Redesigning the starting line for economic opportunity &nbsp;&middot;&nbsp; Total vision: <strong>$5,000,000</strong>
          </p>
        </div>
      </section>

      {/* 5-Year Plan Timeline */}
      <section className="section section--dark fiveyr" id="fiveyr-section">
        <AnimatedSection delay={0.15}>
          <div className="fiveyr__track-wrapper">
            <div className="fiveyr__track" id="fiveyr-track">
              {/* Year 1 */}
              <div className="fiveyr__card fiveyr__card--y1">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 1</span>
                  <span className="fiveyr__theme-badge">Foundation</span>
                </div>
                <h3 className="fiveyr__subtitle">Nonprofit formation &amp; operational readiness</h3>
                <ul className="fiveyr__list">
                  <li>Complete nonprofit formation and legal structure</li>
                  <li>Establish operating infrastructure and leadership</li>
                  <li>Deploy proven Sammy Rabbit content and brand assets</li>
                  <li>Develop Year 2 launch strategy for book giveaway and youth network</li>
                  <li>Begin funder outreach and founding partner cultivation</li>
                  <li>Launch initial awareness and social presence</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$250,000</span>
                </div>
              </div>

              {/* Year 2 */}
              <div className="fiveyr__card fiveyr__card--y2">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 2</span>
                  <span className="fiveyr__theme-badge fiveyr__theme-badge--launch">Launch</span>
                </div>
                <h3 className="fiveyr__subtitle">National book giveaway &amp; youth workforce launch</h3>
                <ul className="fiveyr__list">
                  <li>Launch 100,000-book and curriculum giveaway to low-to-moderate-income families</li>
                  <li>Activate youth workforce pipeline: paid internships, part-time roles, ambassador program</li>
                  <li>Onboard first cohort of school and community partners</li>
                  <li>Deploy digital learning tools and platforms</li>
                  <li>Begin community pilot programs in target markets</li>
                  <li>Measure and report early reach and engagement data</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$750,000</span>
                </div>
              </div>

              {/* Year 3 */}
              <div className="fiveyr__card fiveyr__card--y3">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 3</span>
                  <span className="fiveyr__theme-badge fiveyr__theme-badge--scale">Scale</span>
                </div>
                <h3 className="fiveyr__subtitle">Training, evaluation &amp; community expansion</h3>
                <ul className="fiveyr__list">
                  <li>Expand to 10,000+ classrooms, afterschool programs, and youth orgs</li>
                  <li>Launch educator and adult facilitator training programs</li>
                  <li>Introduce formal program evaluation and impact reporting</li>
                  <li>Deepen youth network with structured roles and mentorship tracks</li>
                  <li>Broaden awareness campaigns reaching millions through media and partnerships</li>
                  <li>Begin building toward revenue-generating strategies</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$1,000,000</span>
                </div>
              </div>

              {/* Year 4 */}
              <div className="fiveyr__card fiveyr__card--y4">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 4</span>
                  <span className="fiveyr__theme-badge fiveyr__theme-badge--deepen">Deepen</span>
                </div>
                <h3 className="fiveyr__subtitle">Technology, equity reach &amp; sustainability</h3>
                <ul className="fiveyr__list">
                  <li>Scale digital platform to reach hundreds of thousands online</li>
                  <li>Expand into underserved communities with targeted equity focus</li>
                  <li>Strengthen mission-aligned revenue streams to reduce philanthropy dependence</li>
                  <li>Grow paid youth internship and job pathways - target 100+ students</li>
                  <li>Deepen family engagement tools and parent confidence resources</li>
                  <li>Publish multi-year impact report and third-party evaluation findings</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$1,250,000</span>
                </div>
              </div>

              {/* Year 5 */}
              <div className="fiveyr__card fiveyr__card--y5">
                <div className="fiveyr__card-top">
                  <span className="fiveyr__year">Year 5</span>
                  <span className="fiveyr__theme-badge fiveyr__theme-badge--movement">Movement</span>
                </div>
                <h3 className="fiveyr__subtitle">National movement &amp; long-term self-sufficiency</h3>
                <ul className="fiveyr__list">
                  <li>Achieve millions reached directly and indirectly with early financial literacy messaging</li>
                  <li>Operate a self-sustaining national youth network and ambassador program</li>
                  <li>Secure long-term institutional partnerships with school districts and nonprofits</li>
                  <li>Normalize early money conversations as a mainstream cultural expectation</li>
                  <li>Transition toward majority earned revenue and reduced grant dependence</li>
                  <li>Establish Grow Good Daily as the leading national early financial education movement</li>
                </ul>
                <div className="fiveyr__budget">
                  <span className="fiveyr__budget-label">Annual budget</span>
                  <span className="fiveyr__budget-amount">$1,750,000</span>
                </div>
              </div>

              {/* Total Card */}
              <div className="fiveyr__card fiveyr__card--total">
                <div className="fiveyr__total-inner">
                  <span className="fiveyr__total-label">5-year total investment goal</span>
                  <span className="fiveyr__total-amount">$5,000,000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="fiveyr__scroll-hint container text-center">
            <span>&larr; Scroll to explore the full roadmap &rarr;</span>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
