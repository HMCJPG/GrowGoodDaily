import './Pagination.css';

function getPageNumbers(currentPage, totalPages) {
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  // Adjust window to always show maxVisible pages
  if (currentPage <= 3) {
    end = maxVisible;
  } else if (currentPage >= totalPages - 2) {
    start = totalPages - maxVisible + 1;
  }

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('ellipsis-start');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('ellipsis-end');
    pages.push(totalPages);
  }

  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav className="pagination" id="pagination" aria-label="Blog pagination">
      <button
        className={`pagination__btn ${isFirst ? 'pagination__btn--disabled' : ''}`}
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
        disabled={isFirst}
        aria-label="Previous page"
        id="pagination-prev"
      >
        ← Prev
      </button>

      {pages.map((page) => {
        if (typeof page === 'string') {
          return (
            <span className="pagination__ellipsis" key={page} aria-hidden="true">
              …
            </span>
          );
        }

        return (
          <button
            key={page}
            className={`pagination__btn ${page === currentPage ? 'pagination__btn--active' : ''}`}
            onClick={() => page !== currentPage && onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            id={`pagination-page-${page}`}
          >
            {page}
          </button>
        );
      })}

      <button
        className={`pagination__btn ${isLast ? 'pagination__btn--disabled' : ''}`}
        onClick={() => !isLast && onPageChange(currentPage + 1)}
        disabled={isLast}
        aria-label="Next page"
        id="pagination-next"
      >
        Next →
      </button>
    </nav>
  );
}
