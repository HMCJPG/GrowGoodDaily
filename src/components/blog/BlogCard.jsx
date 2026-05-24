import { Link } from 'react-router-dom';
import './BlogCard.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogCard({ post }) {
  const { slug, title, excerpt, coverImage, tags, publishedDate } = post;

  return (
    <article className="blog-card" id={`blog-card-${slug}`}>
      <Link to={`/blog/${slug}`} className="blog-card__link">
        <div className="blog-card__image-wrap">
          {coverImage ? (
            <img
              className="blog-card__image"
              src={coverImage}
              alt={title}
              loading="lazy"
            />
          ) : (
            <div className="blog-card__placeholder">
              <span className="blog-card__placeholder-icon" aria-hidden="true">🌱</span>
            </div>
          )}
        </div>

        <div className="blog-card__body">
          <time className="blog-card__date" dateTime={publishedDate}>
            {formatDate(publishedDate)}
          </time>

          <h3 className="blog-card__title">{title}</h3>

          <p className="blog-card__excerpt">{excerpt}</p>

          {tags && tags.length > 0 && (
            <div className="blog-card__tags">
              {tags.map((tag) => (
                <span className="blog-card__tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
