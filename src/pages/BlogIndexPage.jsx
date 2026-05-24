import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/blog/BlogCard';
import Pagination from '../components/blog/Pagination';
import './BlogIndexPage.css';

const POSTS_PER_PAGE = 6;

export default function BlogIndexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const activeTag = searchParams.get('tag') || '';

  // Fetch all tags once on mount
  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch('/api/posts?limit=100');
        if (!res.ok) throw new Error('Failed to load tags');
        const data = await res.json();
        const tagSet = new Set();
        (data.posts || []).forEach((post) => {
          (post.tags || []).forEach((tag) => tagSet.add(tag));
        });
        setAllTags(Array.from(tagSet).sort());
      } catch {
        // Tags are optional — fail silently
      }
    }
    fetchTags();
  }, []);

  // Fetch posts whenever page or tag changes
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        let url = `/api/posts?page=${currentPage}&limit=${POSTS_PER_PAGE}`;
        if (activeTag) url += `&tag=${encodeURIComponent(activeTag)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to load posts');
        const data = await res.json();
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [currentPage, activeTag]);

  function handleTagChange(tag) {
    const params = new URLSearchParams(searchParams);
    if (tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    params.set('page', '1');
    setSearchParams(params);
  }

  function handlePageChange(page) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRetry() {
    setError(null);
    setLoading(true);
    // Re-trigger fetch by toggling a state
    const params = new URLSearchParams(searchParams);
    setSearchParams(params);
  }

  // Skeleton cards
  const skeletonCards = useMemo(
    () =>
      Array.from({ length: POSTS_PER_PAGE }, (_, i) => (
        <div className="blog-index__skeleton-card" key={i}>
          <div className="blog-index__skeleton-image" />
          <div className="blog-index__skeleton-body">
            <div className="blog-index__skeleton-line blog-index__skeleton-line--tag" />
            <div className="blog-index__skeleton-line blog-index__skeleton-line--title" />
            <div className="blog-index__skeleton-line" />
            <div className="blog-index__skeleton-line blog-index__skeleton-line--short" />
          </div>
        </div>
      )),
    []
  );

  return (
    <main className="blog-index-page" id="blog-index-page">
      <SEOHead
        title="Blog"
        description="Thoughts on financial literacy, parenting, community building, and growing good habits — one day at a time. Insights and stories from Grow Good Daily."
        canonical="https://growgooddaily.com/blog"
      />

      {/* Hero */}
      <section className="blog-index__hero" id="blog-hero">
        <div className="container text-center">
          <AnimatedSection animation="fade-up">
            <span className="section__label">OUR BLOG</span>
            <h1 className="section__title">Insights &amp; Stories</h1>
            <p className="section__subtitle">
              Thoughts on financial literacy, parenting, community building, and growing good habits — one day at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <nav className="blog-index__filters" id="blog-filters" aria-label="Filter posts by tag">
          <div className="blog-index__filters-inner">
            <button
              className={`blog-index__filter-btn ${!activeTag ? 'blog-index__filter-btn--active' : ''}`}
              onClick={() => handleTagChange('')}
              type="button"
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-index__filter-btn ${activeTag === tag ? 'blog-index__filter-btn--active' : ''}`}
                onClick={() => handleTagChange(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Post Grid / Loading / Empty / Error */}
      <section className="blog-index__grid" id="blog-grid">
        <div className="container">
          {loading && (
            <div className="blog-index__skeleton" id="blog-skeleton">
              {skeletonCards}
            </div>
          )}

          {!loading && error && (
            <div className="blog-index__error" id="blog-error">
              <span className="blog-index__error-emoji" role="img" aria-label="Error">
                😕
              </span>
              <h3>Something went wrong</h3>
              <p>{error}</p>
              <button className="btn btn--primary" onClick={handleRetry} type="button">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="blog-index__empty" id="blog-empty">
              <span className="blog-index__empty-emoji" role="img" aria-label="No posts">
                📝
              </span>
              <h3>No posts yet</h3>
              <p>Check back soon — great things are on the way!</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid--3">
              {posts.map((post, index) => (
                <AnimatedSection key={post.slug || post._id || index} animation="fade-up" delay={index * 0.08}>
                  <BlogCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="blog-index__pagination container" id="blog-pagination">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </main>
  );
}
