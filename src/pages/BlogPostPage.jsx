import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import SEOHead from '../components/SEOHead';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import './BlogPostPage.css';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function calcReadingTime(content) {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(`/api/posts/${slug}`);
        if (res.status === 404) {
          setNotFound(true);
          setPost(null);
        } else if (!res.ok) {
          throw new Error('Failed to load post');
        } else {
          const data = await res.json();
          setPost(data);
        }
      } catch {
        setNotFound(true);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  // Loading skeleton
  if (loading) {
    return (
      <main className="blog-post-page" id="blog-post-page">
        <SEOHead title="Loading..." description="" noIndex />
        <div className="blog-post__skeleton-hero" />
        <div className="blog-post__skeleton-meta">
          <div className="blog-post__skeleton-meta-item" />
          <div className="blog-post__skeleton-meta-item" />
          <div className="blog-post__skeleton-meta-item" />
        </div>
        <div className="blog-post__skeleton-content">
          <div className="blog-post__skeleton-line blog-post__skeleton-line--heading" />
          <div className="blog-post__skeleton-line" />
          <div className="blog-post__skeleton-line blog-post__skeleton-line--short" />
          <div className="blog-post__skeleton-line" />
          <div className="blog-post__skeleton-line blog-post__skeleton-line--shorter" />
          <div className="blog-post__skeleton-line" />
          <div className="blog-post__skeleton-line blog-post__skeleton-line--short" />
        </div>
      </main>
    );
  }

  // 404 state
  if (notFound || !post) {
    return (
      <main className="blog-post-page" id="blog-post-page">
        <SEOHead title="Post Not Found" description="The blog post you're looking for doesn't exist." noIndex />
        <div className="blog-post__not-found" id="blog-post-not-found">
          <span className="blog-post__not-found-emoji" role="img" aria-label="Not found">
            🔍
          </span>
          <h2>Post not found</h2>
          <p>The blog post you&apos;re looking for doesn&apos;t seem to exist.</p>
          <Link to="/blog" className="btn btn--primary">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const readingTime = calcReadingTime(post.content);
  const hasCoverImage = !!post.coverImage;
  const wordCount = post.content
    ? post.content.trim().split(/\s+/).length
    : 0;
  const canonicalUrl = `https://growgooddaily.com/blog/${post.slug}`;
  const keywordList =
    post.seoKeywords?.trim() ||
    (post.tags && post.tags.length ? post.tags.join(', ') : undefined);
  const articleSection =
    post.tags && post.tags.length ? post.tags[0] : undefined;
  const authorName = post.author?.trim() || 'Sam X Renick';
  const authorUrl = post.authorUrl?.trim() || 'https://growgooddaily.com/about';
  const socialPreviewImage =
    post.socialImage?.trim() || post.coverImage || undefined;

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle?.trim() || post.title,
    description: post.seoDescription?.trim() || post.excerpt || '',
    image: post.coverImage || undefined,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate || post.publishedDate,
    wordCount: wordCount || undefined,
    inLanguage: 'en-US',
    keywords: keywordList,
    articleSection,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Grow Good Daily',
      url: 'https://growgooddaily.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://growgooddaily.com/favicon.svg',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://growgooddaily.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://growgooddaily.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  const jsonLd = [blogPostingSchema, breadcrumbSchema];

  return (
    <main className="blog-post-page" id="blog-post-page">
      <SEOHead
        title={post.seoTitle?.trim() || post.title}
        description={post.seoDescription?.trim() || post.excerpt || ''}
        keywords={post.seoKeywords?.trim() || (post.tags || []).join(', ') || undefined}
        canonical={canonicalUrl}
        ogType="article"
        ogImage={socialPreviewImage}
        jsonLd={jsonLd}
        noIndex={!!post.noIndex}
      />

      {/* Hero */}
      <header
        className={`blog-post__hero ${hasCoverImage ? '' : 'blog-post__hero--no-image'}`}
        id="blog-post-hero"
      >
        {hasCoverImage && (
          <>
            <img
              className="blog-post__hero-image"
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              loading="eager"
              fetchpriority="high"
            />
            <div className="blog-post__hero-overlay" />
          </>
        )}
        <div className="blog-post__hero-content">
          <AnimatedSection animation="fade-up">
            <h1>{post.title}</h1>
          </AnimatedSection>
        </div>
      </header>

      {/* Metadata */}
      <div className="blog-post__meta" id="blog-post-meta">
        <span className="blog-post__meta-item">
          <span className="blog-post__meta-icon" role="img" aria-hidden="true">📅</span>
          <time dateTime={post.publishedDate}>
            {formatDate(post.publishedDate)}
          </time>
        </span>
        <span className="blog-post__meta-item">
          <span className="blog-post__meta-icon" role="img" aria-hidden="true">⏱</span>
          {readingTime} min read
        </span>
        {post.tags && post.tags.length > 0 && (
          <div className="blog-post__tags">
            {post.tags.map((tag) => (
              <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="blog-post__tag">
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <article className="blog-post__content" id="blog-post-content">
        <Link to="/blog" className="blog-post__back">
          ← Back to Blog
        </Link>
        <MarkdownRenderer content={post.content} />
      </article>

      {/* Author */}
      <aside className="blog-post__author" id="blog-post-author">
        <AnimatedSection animation="fade-up">
          <div className="blog-post__author-card">
            <div className="blog-post__author-avatar" role="img" aria-label="Author">
              ✍️
            </div>
            <div className="blog-post__author-info">
              <h4>Written by {authorName}</h4>
              {authorName === 'Sam X Renick' && (
                <p>Founder of Grow Good Daily and creator of Sammy Rabbit — helping children and families build stronger financial futures for over 25 years.</p>
              )}
            </div>
          </div>
        </AnimatedSection>
      </aside>
    </main>
  );
}
