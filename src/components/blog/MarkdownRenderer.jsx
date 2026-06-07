import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import './MarkdownRenderer.css';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const headingComponent = (Tag) =>
  function Heading({ children }) {
    const text = typeof children === 'string' ? children : String(children);
    const id = slugify(text);
    return <Tag id={id}>{children}</Tag>;
  };

function ImageComponent({ src, alt }) {
  const caption = alt && alt !== 'image' ? alt : null;

  if (caption) {
    return (
      <figure>
        <img src={src} alt={alt} loading="lazy" />
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }

  return <img src={src} alt={alt || ''} loading="lazy" />;
}

function LinkComponent({ href, children }) {
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <a href={href}>{children}</a>;
}

function PreComponent({ children }) {
  return (
    <div className="prose__code-wrapper">
      <pre>{children}</pre>
    </div>
  );
}

const components = {
  h1: headingComponent('h1'),
  h2: headingComponent('h2'),
  h3: headingComponent('h3'),
  h4: headingComponent('h4'),
  img: ImageComponent,
  a: LinkComponent,
  pre: PreComponent,
};

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="prose" id="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
