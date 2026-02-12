import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Custom hook for animating number counters with GSAP
 * @param {number} target - The target number to count to
 * @param {number} duration - Animation duration in seconds (default: 1.5)
 * @param {string} ease - GSAP easing function (default: "power2.out")
 * @returns {number} - The current animated value
 */
export function useGsapCounter(target, duration = 1.5, ease = "power2.out") {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    // Reset to 0 when target changes
    countRef.current.value = 0;
    setCount(0);

    // Animate to target
    gsap.to(countRef.current, {
      value: target,
      duration,
      ease,
      onUpdate: () => {
        setCount(Math.round(countRef.current.value));
      },
    });
  }, [target, duration, ease]);

  return count;
}
