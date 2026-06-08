import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [coverImageAlt, setCoverImageAlt] = useState(existingPost?.coverImageAlt || '');
  const [tagsInput, setTagsInput] = useState((existingPost?.tags || []).join(', '));
  const [published, setPublished] = useState(existingPost?.published ?? false);
  const [content, setContent] = useState(existingPost?.content || '');
  const [seoTitle, setSeoTitle] = useState(existingPost?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(existingPost?.seoDescription || '');
  const [seoKeywords, setSeoKeywords] = useState(existingPost?.seoKeywords || '');
  const [noIndex, setNoIndex] = useState(existingPost?.noIndex ?? false);
  const [socialImage, setSocialImage] = useState(existingPost?.socialImage || '');
  const [author, setAuthor] = useState(existingPost?.author || '');
  const [authorUrl, setAuthorUrl] = useState(existingPost?.authorUrl || '');
  const [publishedDate, setPublishedDate] = useState(
    existingPost?.publishedDate
      ? existingPost.publishedDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );
  const [saving, setSaving] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEditing);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [insertingImage, setInsertingImage] = useState(false);
  const [toast, setToast] = useState(null);
  const contentRef = useRef(null);
  const inlineImageInputRef = useRef(null);

  // When editing, the list endpoint strips `content` for performance, so the
  // existingPost prop is missing it. Fetch the full record once on mount so
  // the textarea isn't initialized to empty (which used to silently wipe
  // content on save).
  useEffect(() => {
    if (!isEditing) return;
    let cancelled = false;

    async function fetchFullPost() {
      try {
        const res = await fetch(`${API_BASE}/${existingPost.slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('fetch failed');
        const full = await res.json();
        if (cancelled) return;

        // Only backfill fields that the list view didn't supply. We never
        // overwrite something Sam is actively typing — just fill in what's
        // still at its initial empty value.
        setContent((cur) => cur || full.content || '');
        setExcerpt((cur) => cur || full.excerpt || '');
        setCoverImage((cur) => cur || full.coverImage || '');
        setCoverImageAlt((cur) => cur || full.coverImageAlt || '');
        setSocialImage((cur) => cur || full.socialImage || '');
        setSeoTitle((cur) => cur || full.seoTitle || '');
        setSeoDescription((cur) => cur || full.seoDescription || '');
        setSeoKeywords((cur) => cur || full.seoKeywords || '');
        setAuthor((cur) => cur || full.author || '');
        setAuthorUrl((cur) => cur || full.authorUrl || '');
      } catch {
        if (!cancelled) {
          setToast({
            message: 'Could not load full post — be careful saving.',
            type: 'error',
          });
        }
      } finally {
        if (!cancelled) setLoadingPost(false);
      }
    }

    fetchFullPost();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCoverImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Cap at 3MB so the base64-encoded JSON body stays under Vercel's
    // 4.5MB request limit (base64 inflates payload by ~33%).
    const MAX_BYTES = 3 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      setToast({
        message: 'Image too large. Please use a file under 3 MB.',
        type: 'error',
      });
      e.target.value = '';
      return;
    }

    setUploadingImage(true);
    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          const comma = result.indexOf(',');
          resolve(comma >= 0 ? result.slice(comma + 1) : result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filename: file.name,
          mimeType: file.type,
          contentBase64: base64,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCoverImage(data.url);
        setToast({ message: 'Image uploaded!', type: 'success' });
      } else {
        const errData = await res.json().catch(() => ({}));
        setToast({
          message: errData.error || 'Upload failed',
          type: 'error',
        });
      }
    } catch {
      setToast({ message: 'Upload failed. Please try again.', type: 'error' });
    } finally {
      setUploadingImage(false);
      e.target.value = ''; // reset so the same file can be re-picked
    }
  }

  // ─── Formatting toolbar helpers ───────────────────────────────────────────

  // Read a File as a base64 string with the data-URL prefix stripped.
  function readAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const comma = result.indexOf(',');
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Wrap whatever is currently selected in the content textarea with `left`
  // and `right`. If nothing is selected, insert `placeholder` so the user
  // can see the formatting marker and replace the text.
  function wrapSelection(left, right, placeholder) {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);
    const inner = selected || placeholder;
    const newContent =
      content.slice(0, start) + left + inner + right + content.slice(end);
    setContent(newContent);
    // Re-focus the textarea and put the cursor at the end of the wrapped text.
    requestAnimationFrame(() => {
      ta.focus();
      const pos = start + left.length + inner.length;
      ta.setSelectionRange(pos, pos);
    });
  }

  const handleBold = () => wrapSelection('**', '**', 'bold text');
  // Use <em> instead of *…* — markdown asterisks fail mid-word and conflict
  // with bold's ** runs, so we emit HTML to make italic always reliable.
  const handleItalic = () => wrapSelection('<em>', '</em>', 'italic text');
  const handleUnderline = () => wrapSelection('<u>', '</u>', 'underlined text');

  function handleLink() {
    const url = window.prompt('Enter the URL (e.g., https://example.com):');
    if (!url) return;
    const trimmed = url.trim();
    if (!trimmed) return;
    wrapSelection('[', `](${trimmed})`, 'link text');
  }

  function handleFontChange(font) {
    if (!font) return;
    wrapSelection(`<span style="font-family: ${font}">`, '</span>', 'styled text');
  }

  function handleSizeChange(size) {
    if (!size) return;
    wrapSelection(`<span style="font-size: ${size}">`, '</span>', 'sized text');
  }

  function handleHeading(level) {
    if (!level) return;
    const hashes = '#'.repeat(Number(level));
    // Surround with blank lines so the heading renders as its own block,
    // regardless of whether the cursor was mid-paragraph.
    wrapSelection(`\n\n${hashes} `, '\n\n', `Heading ${level}`);
  }

  // Soft line break — like Shift+Enter in a word processor. Single <br>.
  function handleLineBreak() {
    wrapSelection('<br>\n', '', '');
  }

  // Explicit vertical gap that survives markdown's blank-line collapsing.
  function handleSpacer() {
    wrapSelection(
      '\n\n<div style="height: 2rem"></div>\n\n',
      '',
      '',
    );
  }

  async function handleInlineImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_BYTES = 3 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      setToast({ message: 'Image too large (3 MB max).', type: 'error' });
      e.target.value = '';
      return;
    }

    setInsertingImage(true);
    try {
      const base64 = await readAsBase64(file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          filename: file.name,
          mimeType: file.type,
          contentBase64: base64,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await res.json();
      // Derive a friendly alt from the filename (strip extension + clean up).
      const altGuess = file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .trim();
      const markdown = `\n\n![${altGuess}](${data.url})\n\n`;

      // Insert the markdown at the cursor position in the content textarea.
      const ta = contentRef.current;
      if (ta) {
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newContent =
          content.slice(0, start) + markdown + content.slice(end);
        setContent(newContent);
        requestAnimationFrame(() => {
          ta.focus();
          const pos = start + markdown.length;
          ta.setSelectionRange(pos, pos);
        });
      } else {
        setContent(content + markdown);
      }

      setToast({ message: 'Image inserted!', type: 'success' });
    } catch (err) {
      setToast({
        message: err.message || 'Upload failed',
        type: 'error',
      });
    } finally {
      setInsertingImage(false);
      e.target.value = '';
    }
  }

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
    // Don't let Sam save before the full post has loaded — otherwise we'd
    // PUT an empty `content` field and wipe the saved version on disk.
    if (loadingPost) {
      setToast({
        message: 'Still loading the post — please wait a moment.',
        type: 'error',
      });
      return;
    }

    setSaving(true);
    try {
      const body = {
        title,
        slug,
        excerpt,
        coverImage,
        coverImageAlt,
        socialImage,
        tags: parsedTags,
        published,
        content,
        seoTitle,
        seoDescription,
        seoKeywords,
        noIndex,
        author,
        authorUrl,
        // Convert the YYYY-MM-DD date input back to a full ISO timestamp,
        // anchored at noon local time so the date displays the same in
        // most timezones.
        publishedDate: publishedDate
          ? new Date(`${publishedDate}T12:00:00`).toISOString()
          : undefined,
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
            <label className="admin__label" htmlFor="editor-cover-file">Cover Image</label>
            <div className="admin__upload-row">
              <input
                id="editor-cover-file"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                onChange={handleCoverImageUpload}
                disabled={uploadingImage}
                className="admin__upload-input"
              />
              {uploadingImage && (
                <span className="admin__upload-status">Uploading…</span>
              )}
            </div>
            <input
              id="editor-cover"
              className="admin__input"
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="…or paste an image URL"
            />
            {coverImage && (
              <div className="admin__image-preview">
                <img src={coverImage} alt="Cover preview" onError={(e) => (e.target.style.display = 'none')} />
              </div>
            )}
          </div>

          <div className="admin__field">
            <label className="admin__label" htmlFor="editor-cover-alt">
              Cover Image Alt Text
            </label>
            <input
              id="editor-cover-alt"
              className="admin__input"
              type="text"
              value={coverImageAlt}
              onChange={(e) => setCoverImageAlt(e.target.value)}
              placeholder="Describe the image for screen readers and Google Images"
            />
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
            <label className="admin__label" htmlFor="editor-author">
              Author
            </label>
            <input
              id="editor-author"
              className="admin__input"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Sam X Renick (leave blank to use default)"
            />
          </div>

          <div className="admin__field">
            <label className="admin__label" htmlFor="editor-author-url">
              Author URL (optional)
            </label>
            <input
              id="editor-author-url"
              className="admin__input"
              type="text"
              value={authorUrl}
              onChange={(e) => setAuthorUrl(e.target.value)}
              placeholder="https://example.com/about-the-author"
            />
          </div>

          <div className="admin__seo-box" id="editor-seo">
            <div className="admin__seo-header">
              <h3 className="admin__seo-title">SEO</h3>
              <p className="admin__seo-help">
                All fields optional — left blank, they fall back to the post title, excerpt, and tags.
              </p>
            </div>

            <div className="admin__field">
              <label className="admin__label" htmlFor="editor-seo-title">
                SEO Title
              </label>
              <input
                id="editor-seo-title"
                className="admin__input"
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Shown in search results. ~50–60 chars recommended."
                maxLength={80}
              />
            </div>

            <div className="admin__field">
              <label className="admin__label" htmlFor="editor-seo-description">
                Meta Description
              </label>
              <textarea
                id="editor-seo-description"
                className="admin__textarea"
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Snippet shown under the title in search results. ~150–160 chars recommended."
                maxLength={300}
              />
            </div>

            <div className="admin__field">
              <label className="admin__label" htmlFor="editor-seo-keywords">
                Keywords
              </label>
              <input
                id="editor-seo-keywords"
                className="admin__input"
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="comma, separated, keywords"
              />
            </div>

            <div className="admin__field">
              <label className="admin__label" htmlFor="editor-social-image">
                Social Preview Image URL
              </label>
              <input
                id="editor-social-image"
                className="admin__input"
                type="text"
                value={socialImage}
                onChange={(e) => setSocialImage(e.target.value)}
                placeholder="Override og:image / Twitter card image (defaults to cover image)"
              />
              {socialImage && (
                <div className="admin__image-preview">
                  <img
                    src={socialImage}
                    alt="Social preview"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div className="admin__field">
              <label className="admin__checkbox-label" htmlFor="editor-noindex">
                <input
                  id="editor-noindex"
                  type="checkbox"
                  checked={noIndex}
                  onChange={(e) => setNoIndex(e.target.checked)}
                />
                <span>
                  <strong>Hide from search engines</strong>
                  <span className="admin__seo-help admin__seo-help--inline">
                    Adds <code>noindex, nofollow</code> meta tag. Use for stale, archived,
                    or low-quality posts you don't want appearing in Google.
                  </span>
                </span>
              </label>
            </div>
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
            <label className="admin__label" htmlFor="editor-publish-date">
              Publish Date
            </label>
            <input
              id="editor-publish-date"
              className="admin__input"
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
            />
            <p className="admin__field-help">
              Override the publication date shown on the post (and used in
              SEO/structured data). Defaults to today.
            </p>
          </div>

          <div className="admin__field">
            <label className="admin__label" htmlFor="editor-content">Content</label>
            <div
              className="admin__editor-toolbar"
              role="toolbar"
              aria-label="Formatting"
            >
              <select
                className="admin__toolbar-select"
                aria-label="Heading level"
                defaultValue=""
                onChange={(e) => {
                  handleHeading(e.target.value);
                  e.target.selectedIndex = 0;
                }}
              >
                <option value="">Heading…</option>
                <option value="2">H2 — Section</option>
                <option value="3">H3 — Subsection</option>
                <option value="4">H4 — Minor</option>
              </select>

              <span className="admin__toolbar-sep" aria-hidden="true" />

              <button
                type="button"
                className="admin__toolbar-btn"
                onClick={handleBold}
                title="Bold (wraps selection in **)"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                className="admin__toolbar-btn"
                onClick={handleItalic}
                title="Italic (wraps selection in *)"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                className="admin__toolbar-btn"
                onClick={handleUnderline}
                title="Underline (wraps selection in <u>)"
              >
                <u>U</u>
              </button>
              <button
                type="button"
                className="admin__toolbar-btn"
                onClick={handleLink}
                title="Insert link — wraps selection in [text](url)"
              >
                🔗 Link
              </button>

              <span className="admin__toolbar-sep" aria-hidden="true" />

              <select
                className="admin__toolbar-select"
                aria-label="Font family"
                defaultValue=""
                onChange={(e) => {
                  handleFontChange(e.target.value);
                  e.target.selectedIndex = 0;
                }}
              >
                <option value="">Font…</option>
                <option value="Inter, sans-serif">Sans-serif (Inter)</option>
                <option value="Outfit, sans-serif">Display (Outfit)</option>
                <option value="Georgia, serif">Serif (Georgia)</option>
                <option value="'Courier New', monospace">Monospace</option>
              </select>

              <select
                className="admin__toolbar-select"
                aria-label="Font size"
                defaultValue=""
                onChange={(e) => {
                  handleSizeChange(e.target.value);
                  e.target.selectedIndex = 0;
                }}
              >
                <option value="">Size…</option>
                <option value="0.85rem">Small</option>
                <option value="1rem">Normal</option>
                <option value="1.25rem">Large</option>
                <option value="1.5rem">X-Large</option>
                <option value="2rem">Huge</option>
              </select>

              <span className="admin__toolbar-sep" aria-hidden="true" />

              <button
                type="button"
                className="admin__toolbar-btn"
                onClick={handleLineBreak}
                title="Soft line break — single <br>"
              >
                ↵ Br
              </button>
              <button
                type="button"
                className="admin__toolbar-btn"
                onClick={handleSpacer}
                title="Vertical spacer — markdown collapses blank lines, this doesn't"
              >
                ⇕ Gap
              </button>

              <span className="admin__toolbar-sep" aria-hidden="true" />

              <input
                ref={inlineImageInputRef}
                id="editor-inline-image"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                style={{ display: 'none' }}
                onChange={handleInlineImageUpload}
              />
              <button
                type="button"
                className="admin__toolbar-btn"
                onClick={() => inlineImageInputRef.current?.click()}
                disabled={insertingImage}
                title="Upload an image and insert it at the cursor"
              >
                {insertingImage ? 'Inserting…' : '🖼 Image'}
              </button>
            </div>
            <textarea
              id="editor-content"
              ref={contentRef}
              className="admin__textarea admin__content-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                loadingPost
                  ? 'Loading post content…'
                  : 'Write your post in Markdown. Use the toolbar above for quick formatting.'
              }
              disabled={loadingPost}
            />
          </div>

          <div className="admin__editor-actions">
            <button
              className="admin__btn admin__btn--primary"
              type="submit"
              disabled={saving || loadingPost}
              id="editor-save-btn"
            >
              {saving ? 'Saving…' : loadingPost ? 'Loading…' : 'Save Post'}
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
