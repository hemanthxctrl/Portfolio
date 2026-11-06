'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('.interactive') ||
        e.target.closest('.project-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    let frameId;
    const animateFollower = () => {
      setFollowerPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      frameId = requestAnimationFrame(animateFollower);
    };
    frameId = requestAnimationFrame(animateFollower);
    return () => cancelAnimationFrame(frameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`custom-cursor-follower ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${followerPosition.x}px`, top: `${followerPosition.y}px` }}
      />
    </>
  );
}
