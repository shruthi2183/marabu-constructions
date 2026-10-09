"use client";

import { useEffect, useRef } from "react";

// Decorative background for the contact hero: a pencil-sketch engineer
// answering the phone (public/videos/contact-background.mp4, 1366×768,
// ~6s loop, no audio). Nothing is downloaded until playback starts
// (preload="none"); the poster — the clip's last frame — shows meanwhile,
// if autoplay is blocked, and permanently with reduced motion. Playback
// pauses while the hero is off screen.
//
// Below lg the video is a full-width band under the hero copy; from lg it
// fills the hero to the right of the copy, faded into the paper on its left
// (framed tighter at lg so the engineer clears the copy column).
export default function ContactHeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true; // React sets `muted` as a property; make sure before play().
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {}); // Blocked: poster stays.
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative order-2 aspect-square w-full overflow-hidden bg-champagne sm:aspect-[4/3] md:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[45%] lg:order-none lg:aspect-auto lg:w-auto xl:left-[36%]"
    >
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster="/images/contact/contact-video-poster.webp"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        className="absolute inset-0 size-full object-cover object-[60%_50%] lg:object-[45%_50%]"
      >
        <source src="/videos/contact-background.mp4" type="video/mp4" />
      </video>
      {/* Paper fades: top (into the copy / under the header) and bottom on
          every size. From lg the left edge stays near-solid paper until just
          past the copy column (keeps the lede at ≥4.5:1 over the scene's
          darker chair and desk), then clears before the engineer. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-cream)_0%,transparent_22%,transparent_86%,var(--color-cream)_100%)] lg:bg-[linear-gradient(to_bottom,var(--color-cream)_0%,transparent_14%,transparent_88%,var(--color-cream)_100%)]" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--color-cream)_0%,rgb(247_241_227/0.92)_12%,transparent_22%)] lg:block xl:bg-[linear-gradient(90deg,var(--color-cream)_0%,rgb(247_241_227/0.92)_19%,transparent_30%)]" />
    </div>
  );
}
