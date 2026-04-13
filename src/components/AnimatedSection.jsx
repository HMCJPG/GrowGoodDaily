import { useEffect, useRef, useState } from 'react';

/**
 * Hook to animate elements when they enter the viewport.
 * Returns a ref and a boolean indicating if the element is visible.
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

/**
 * Animated section wrapper that fades in on scroll.
 */
export function AnimatedSection({ children, className = '', animation = 'fade-up', delay = 0 }) {
  const [ref, isInView] = useInView();

  const animationClass = {
    'fade-up': 'animate-fade-up',
    'fade-in': 'animate-fade-in',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'scale': 'animate-scale',
  }[animation] || 'animate-fade-up';

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? animationClass : ''}`}
      style={{
        opacity: isInView ? undefined : 0,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
