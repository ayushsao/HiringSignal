import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-triggered animations
 * @param {Object} options - Animation configuration
 * @param {Object} options.animation - GSAP animation properties
 * @param {Object} options.scrollTrigger - ScrollTrigger configuration
 * @returns {Object} - Ref to attach to the element
 */
export function useGsapScroll(options = {}) {
    const elementRef = useRef(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const {
            animation = { opacity: 1, y: 0 },
            scrollTrigger = {},
        } = options;

        // Create the animation
        const ctx = gsap.context(() => {
            gsap.from(elementRef.current, {
                ...animation,
                scrollTrigger: {
                    trigger: elementRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                    ...scrollTrigger,
                },
            });
        });

        // Cleanup
        return () => ctx.revert();
    }, [options]);

    return elementRef;
}

/**
 * Hook for stagger animations on child elements
 * @param {Object} options - Stagger configuration
 * @returns {Object} - Ref to attach to the parent element
 */
export function useGsapStagger(options = {}) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const {
            selector = '.stagger-item',
            animation = { opacity: 1, y: 0 },
            stagger = 0.1,
            scrollTrigger = {},
        } = options;

        const ctx = gsap.context(() => {
            gsap.from(selector, {
                opacity: 0,
                y: 30,
                ...animation,
                stagger,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    ...scrollTrigger,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [options]);

    return containerRef;
}
