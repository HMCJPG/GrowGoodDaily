import { useState, useEffect, useCallback } from 'react';
import SEOHead from '../components/SEOHead';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import './AdminPage.css';

const API_BASE = '/api/posts';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ========================================
// Toast component
// ========================================
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`admin__toast admin__toast--${type}`} role="alert">
      {message}
    </div>
  );
}

// ========================================
// Confirm Dialog
// ========================================
function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="admin__confirm-overlay" onClick={onCancel}>
      <div className="admin__confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="admin__confirm-actions">
          <button className="admin__btn admin__btn--secondary" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="admin__btn admin__btn--danger" onClick={onConfirm} type="button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Login View
// ========================================
function LoginView({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}?all=true`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        sessionStorage.setItem('adminToken', password);
        onLogin(password);
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin__login" id="admin-login">
      <div className="admin__login-card">
        <div className="admin__login-icon" role="img" aria-label="Lock">🔒</div>
        <h2 className="admin__login-title">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin__field">
            <label className="admin__label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              className="admin__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          {error && <p className="admin__error" id="admin-login-error">{error}</p>}
          <button
            className="admin__btn admin__btn--primary admin__btn--full"
            type="submit"
            disabled={loading}
            id="admin-login-btn"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ========================================
// Dashboard View
// ========================================
function DashboardView({ token, onEdit, onNew, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmSlug, setConfirmSlug] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}?all=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleDelete(slug) {
    try {
      const res = await fetch(`${API_BASE}/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setToast({ message: 'Post deleted successfully', type: 'success' });
        fetchPosts();
      } else {
        setToast({ message: 'Failed to delete post', type: 'error' });
      }
    } catch {
      setToast({ message: 'Connection error', type: 'error' });
    }
    setConfirmSlug(null);
  }

  return (
    <div className="admin__dashboard" id="admin-dashboard">
      <div className="admin__dashboard-header">
        <h1 className="admin__dashboard-title">Blog Admin</h1>
        <div className="admin__dashboard-actions">
          <button className="admin__btn admin__btn--primary" onClick={onNew} type="button" id="admin-new-post-btn">
            + New Post
          </button>
          <button className="admin__btn admin__btn--secondary" onClick={onLogout} type="button" id="admin-logout-btn">
            Log Out
          </button>
        </div>
      </div>

      {loading && (
        <div className="admin__empty">
          <p>Loading posts…</p>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="admin__empty" id="admin-empty">
          <span className="admin__empty-emoji" role="img" aria-label="Empty">✍️</span>
          <h3>No posts yet</h3>
          <p>Create your first post to get started!</p>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="admin__table-wrapper">
          <table className="admin__table" id="admin-posts-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug || post._id}>
                  <td data-label="Title">
                    <span className="admin__table-title">{post.title}</span>
                  </td>
                  <td data-label="Status">
                    <span
                      className={`admin__status-badge ${
                        post.published ? 'admin__status-badge--published' : 'admin__status-badge--draft'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td data-label="Date">{formatDate(post.publishedDate)}</td>
                  <td data-label="Actions">
                    <div className="admin__actions">
                      <button
                        className="admin__btn admin__btn--secondary admin__btn--sm"
                        onClick={() => onEdit(post)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="admin__btn admin__btn--danger"
                        onClick={() => setConfirmSlug(post.slug)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmSlug && (
        <ConfirmDialog
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
          onConfirm={() => handleDelete(confirmSlug)}
          onCancel={() => setConfirmSlug(null)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ========================================
// Editor View
// ========================================
function EditorView({ token, existingPost, onSaved, onCancel }) {
  const isEditing = !!existingPost;

  const [title, setTitle] = useState(existingPost?.title || '');
  const [slug, setSlug] = useState(existingPost?.slug || '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || '');
  const [coverImage, setCoverImage] = useState(existingPost?.coverImage || '');
  const [tagsInput, setTagsInput] = useState((existingPost?.tags || []).join(', '));
  const [published, setPublished] = useState(existingPost?.published ?? false);
  const [content, setContent] = useState(existingPost?.content || '');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-generate slug from title (only for new posts)
  function handleTitleChange(value) {
    setTitle(value);
    if (!isEditing) {
      setSlug(slugify(value));
    }
  }

  const parsedTags = tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  async function handleSave(e) {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      setToast({ message: 'Title and slug are required', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      const body = {
        title,
        slug,
        excerpt,
        coverImage,
        tags: parsedTags,
        published,
        content,
      };

      const url = isEditing ? `${API_BASE}/${existingPost.slug}` : API_BASE;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setToast({ message: isEditing ? 'Post updated!' : 'Post created!', type: 'success' });
        setTimeout(() => onSaved(), 1200);
      } else {
        const errData = await res.json().catch(() => ({}));
        setToast({ message: errData.error || 'Failed to save post', type: 'error' });
      }
    } catch {
      setToast({ message: 'Connection error. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div id="admin-editor">
      <div className="admin__editor-header">
        <button className="admin__editor-back" onClick={onCancel} type="button">
          ← Back to Dashboard
        </button>
      </div>

      <form className="admin__editor" onSubmit={handleSave}>
        {/* Form Panel */}
        <div className="admin__editor-form">
          <div className="admin__field">
            <label className="admin__label" htmlFor="editor-title">Title</label>
            <input
              id="editor-title"
              className="admin__input"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
            />
          </div>

          <div className="admin__field">
            <label className="admin__label" htmlFor="editor-slug">Slug</label>
            <div className="admin__slug-group">
              <span className="admin__slug-prefix">/blog/</span>
              <input
                id="editor-slug"
                className="admin__input"
                type="text"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="post-url-slug"
              />
            </div>
          </div>

          <div className="admin__field">
            <label className="admin__label" htmlFor="editor-excerpt">Excerpt</label>
            <textarea
              id="editor-excerpt"
              className="admin__textarea"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the post…"
            />
          </div>

          <div className="admin__field">
            <label className="admin__label" htmlFor="editor-cover">Cover Image URL</label>
            <input
              id="editor-cover"
              className="admin__input"
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {coverImage && (
              <div className="admin__image-preview">
                <img src={coverImage} alt="Cover preview" onError={(e) => (e.target.style.display = 'none')} />
              </div>
            )}
          </div>

          <div className="admin__field">
            <label className="admin__label" htmlFor="editor-tags">Tags</label>
            <input
              id="editor-tags"
              className="admin__input"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="parenting, financial literacy, habits"
            />
            {parsedTags.length > 0 && (
              <div className="admin__tag-pills">
                {parsedTags.map((tag) => (
                  <span key={tag} className="admin__tag-pill">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="admin__field">
            <label className="admin__label">Published</label>
            <div className="admin__toggle-wrapper">
              <label className="admin__toggle">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  id="editor-published"
                />
                <span className="admin__toggle-slider" />
              </label>
              <span className="admin__toggle-label">
                {published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>

          <div className="admin__field">
            <label className="admin__label" htmlFor="editor-content">Content (Markdown)</label>
            <textarea
              id="editor-content"
              className="admin__textarea admin__content-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post in Markdown…"
            />
          </div>

          <div className="admin__editor-actions">
            <button
              className="admin__btn admin__btn--primary"
              type="submit"
              disabled={saving}
              id="editor-save-btn"
            >
              {saving ? 'Saving…' : 'Save Post'}
            </button>
            <button
              className="admin__btn admin__btn--secondary"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="admin__editor-preview">
          <div className="admin__editor-preview-title">Preview</div>
          {content ? (
            <MarkdownRenderer content={content} />
          ) : (
            <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              Start typing to see a live preview…
            </p>
          )}
        </div>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ========================================
// Main Admin Page
// ========================================
export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'editor'
  const [editingPost, setEditingPost] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    async function checkAuth() {
      const stored = sessionStorage.getItem('adminToken');
      if (stored) {
        try {
          const res = await fetch(`${API_BASE}?all=true`, {
            headers: { Authorization: `Bearer ${stored}` },
          });
          if (res.ok) {
            setToken(stored);
          } else {
            sessionStorage.removeItem('adminToken');
          }
        } catch {
          sessionStorage.removeItem('adminToken');
        }
      }
      setAuthChecked(true);
    }
    checkAuth();
  }, []);

  function handleLogin(pwd) {
    setToken(pwd);
    setView('dashboard');
  }

  function handleLogout() {
    sessionStorage.removeItem('adminToken');
    setToken(null);
    setView('dashboard');
    setEditingPost(null);
  }

  function handleEdit(post) {
    setEditingPost(post);
    setView('editor');
  }

  function handleNew() {
    setEditingPost(null);
    setView('editor');
  }

  function handleSaved() {
    setEditingPost(null);
    setView('dashboard');
  }

  function handleCancelEdit() {
    setEditingPost(null);
    setView('dashboard');
  }

  // Wait until auth check completes
  if (!authChecked) {
    return (
      <main className="admin" id="admin-page">
        <SEOHead title="Admin" description="Blog admin dashboard" noIndex />
      </main>
    );
  }

  // Not authenticated — show login
  if (!token) {
    return (
      <main className="admin" id="admin-page">
        <SEOHead title="Admin Login" description="Log in to manage blog posts" noIndex />
        <LoginView onLogin={handleLogin} />
      </main>
    );
  }

  // Authenticated
  return (
    <main className="admin" id="admin-page">
      <SEOHead title="Admin Dashboard" description="Manage blog posts" noIndex />

      {view === 'dashboard' && (
        <DashboardView token={token} onEdit={handleEdit} onNew={handleNew} onLogout={handleLogout} />
      )}

      {view === 'editor' && (
        <EditorView
          token={token}
          existingPost={editingPost}
          onSaved={handleSaved}
          onCancel={handleCancelEdit}
        />
      )}
    </main>
  );
}
