import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Mouse move handler
        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });

            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        // Hover effects for interactive elements
        const handleMouseEnter = () => {
            gsap.to(cursor, {
                scale: 0.5,
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(follower, {
                scale: 1.5,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(follower, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        // Add event listeners
        document.addEventListener("mousemove", moveCursor);

        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll(
            "a, button, input, textarea, select, [role='button']"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Cleanup
        return () => {
            document.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className="custom-cursor fixed top-0 left-0 w-3 h-3 bg-brand-500 rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Follower circle */}
            <div
                ref={followerRef}
                className="custom-cursor-follower fixed top-0 left-0 w-10 h-10 border-2 border-brand-500/50 rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    transform: "translate(-50%, -50%)",
                }}
            />
        </>
    );
}
