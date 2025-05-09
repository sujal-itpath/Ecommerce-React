import React, { useEffect, useRef } from 'react';

const PaginationLoader = ({ loading, hasMore, onLoadMore }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore(); // Load next batch
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <div ref={observerRef} className="flex justify-center mt-8 mb-6 h-10">
      {loading && (
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default PaginationLoader;
