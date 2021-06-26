import React from "react"

export const useInfinitePagination = (childRef: React.RefObject<HTMLElement | null>, callback: () => any) => {
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        console.log("intersected");
        callback();
      }
    }, {
      threshold: 1
    });

    if (childRef.current) {
      observerRef.current.observe(childRef.current);
    };
    
    return () => observerRef.current?.disconnect();
  }, [childRef, callback])
}