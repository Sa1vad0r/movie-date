"use client";
import { useRef, useState, useEffect } from "react";

export function LockSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const THUMB_WIDTH = 64;
  const TRACK_PADDING = 4;

  const getBounds = () => {
    if (!trackRef.current) return { minX: 0, maxX: 0 };
    const width = trackRef.current.getBoundingClientRect().width;
    return {
      minX: TRACK_PADDING,
      maxX: width - THUMB_WIDTH - TRACK_PADDING,
    };
  };

  // Initialize thumb to RIGHT (unlocked)
  useEffect(() => {
    const { maxX } = getBounds();
    setDragX(maxX);
  }, []);

  const handleThumbDown = () => {
    if (locked) {
      // UNLOCK on click
      const { maxX } = getBounds();
      setLocked(false);
      setDragX(maxX);
      return;
    }
    setDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!dragging || locked || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const { minX, maxX } = getBounds();

    let x = clientX - rect.left - THUMB_WIDTH / 2;
    x = Math.max(minX, Math.min(maxX, x));

    setDragX(x);
  };

  const handleEnd = () => {
    if (!dragging) return;

    const { minX, maxX } = getBounds();

    if (dragX <= minX + 5) {
      // LOCK
      setLocked(true);
      setDragX(minX);
    } else {
      // SNAP BACK
      setDragX(maxX);
    }

    setDragging(false);
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full h-12 rounded-full bg-gray-300 select-none"
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {/* Thumb */}
      <div
        onMouseDown={handleThumbDown}
        onTouchStart={handleThumbDown}
        className={`
          absolute top-1/2 -translate-y-1/2
          h-10 w-16
          rounded-full
          bg-gray-900
          flex items-center justify-center
          text-white text-xl
          cursor-pointer
          transition-transform duration-300 ease-out
          hover:bg-gray-700
          ${dragging ? "transition-none" : ""}
        `}
        style={{ transform: `translateX(${dragX}px)` }}
      >
        {locked ? "🔒" : "🔓"}
      </div>

      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className={`text-gray-600 font-medium text-lg`}>
          {locked ? "Locked" : "Slide to lock"}
        </span>
      </div>
    </div>
  );
}
