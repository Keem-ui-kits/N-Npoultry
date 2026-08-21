"use client";

import { useEffect, useRef } from "react";

interface AutoplayVideoProps {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  startTime?: number;
}

export function AutoplayVideo({
  src,
  poster = "/farm-loop-poster.png",
  ariaLabel = "Flock video loop at N&N Poultry Palace",
  className,
  style,
  startTime = 9,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict muted & inline attributes for zero-block autoplay across mobile/desktop
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    // Seek to start time on metadata load
    const seekToStart = () => {
      try {
        if (startTime > 0 && Math.abs(video.currentTime - startTime) > 1 && video.currentTime < startTime) {
          video.currentTime = startTime;
        }
      } catch {
        // Ignored if video metadata isn't fully ready
      }
    };

    video.addEventListener("loadedmetadata", seekToStart);
    video.addEventListener("canplay", seekToStart);

    // When loop cycles or video ends, loop back to the 9th second
    const handleEnded = () => {
      video.currentTime = startTime;
      video.play().catch(() => {});
    };
    video.addEventListener("ended", handleEnded);

    const attemptPlay = () => {
      seekToStart();
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay blocked by browser policy; will retry on viewport entry or touch
        });
      }
    };

    attemptPlay();

    // IntersectionObserver to auto-play when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Global listener for first touch/click/scroll to start playback immediately
    const handleFirstInteraction = () => {
      if (video.paused) {
        attemptPlay();
      }
    };

    window.addEventListener("touchstart", handleFirstInteraction, { passive: true, once: true });
    window.addEventListener("click", handleFirstInteraction, { passive: true, once: true });
    window.addEventListener("scroll", handleFirstInteraction, { passive: true, once: true });

    return () => {
      observer.disconnect();
      video.removeEventListener("loadedmetadata", seekToStart);
      video.removeEventListener("canplay", seekToStart);
      video.removeEventListener("ended", handleEnded);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [src, startTime]);

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={style}
      role="region"
      aria-label={ariaLabel}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        aria-label={ariaLabel}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={`${src}#t=${startTime}`} type="video/mp4" />
      </video>
    </div>
  );
}
