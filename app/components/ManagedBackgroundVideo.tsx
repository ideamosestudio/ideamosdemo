"use client";

import { useEffect, useRef } from "react";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
};

type ManagedBackgroundVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  eager?: boolean;
  width?: number;
  height?: number;
};

const MANAGED_VIDEO_SELECTOR = "video[data-managed-background='true']";
let activeManagedVideo: HTMLVideoElement | null = null;

export function pauseManagedBackgroundVideos(
  except?: HTMLVideoElement | null,
) {
  document
    .querySelectorAll<HTMLVideoElement>(MANAGED_VIDEO_SELECTOR)
    .forEach((video) => {
      if (video !== except && !video.paused) {
        video.pause();
      }
    });

  activeManagedVideo = except ?? null;
}

function shouldUsePosterOnly() {
  const navigatorWithConnection = navigator as NavigatorWithConnection;
  const connection =
    navigatorWithConnection.connection ??
    navigatorWithConnection.mozConnection ??
    navigatorWithConnection.webkitConnection;
  const effectiveType = connection?.effectiveType?.toLowerCase();
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const verySlowConnection =
    effectiveType === "slow-2g" || effectiveType === "2g";
  const constrainedMobileConnection =
    window.matchMedia("(max-width: 767px)").matches &&
    effectiveType === "3g";
  const mobileViewport = window.matchMedia("(max-width: 767px)").matches;

  return Boolean(
    reducedMotion ||
      connection?.saveData ||
      verySlowConnection ||
      constrainedMobileConnection ||
      mobileViewport,
  );
}

export default function ManagedBackgroundVideo({
  src,
  poster,
  className,
  eager = false,
  width,
  height,
}: ManagedBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceType = src.toLowerCase().split("?")[0].endsWith(".webm")
    ? "video/webm"
    : "video/mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const posterOnly = shouldUsePosterOnly();
    const source = video.querySelector<HTMLSourceElement>("source[data-src]");
    let preloadObserver: IntersectionObserver | null = null;

    const loadPosterOnce = () => {
      if (poster && video.poster !== poster) video.poster = poster;
    };

    const loadVideoOnce = () => {
      const deferredSrc = source?.dataset.src;
      if (
        posterOnly ||
        video.dataset.loaded === "true" ||
        !source ||
        !deferredSrc
      ) {
        return;
      }

      source.src = deferredSrc;
      video.dataset.loaded = "true";
      video.load();
    };

    const pauseVideo = () => {
      video.pause();
      if (activeManagedVideo === video) {
        activeManagedVideo = null;
      }
    };

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        const shouldPlay =
          !posterOnly &&
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.4;

        if (!shouldPlay) {
          pauseVideo();
          return;
        }

        loadVideoOnce();
        pauseManagedBackgroundVideos(video);
        void video.play().then(() => {
          if (activeManagedVideo !== video) {
            video.pause();
          }
        }).catch(() => {});
      },
      { threshold: [0, 0.4, 1] },
    );

    if (eager) {
      loadPosterOnce();
      loadVideoOnce();
    } else {
      preloadObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          loadPosterOnce();
          loadVideoOnce();
          preloadObserver?.disconnect();
        },
        { rootMargin: "500px 0px", threshold: 0 },
      );
      preloadObserver.observe(video);
    }

    const pauseWhenPageIsHidden = () => {
      if (document.hidden) pauseVideo();
    };

    playbackObserver.observe(video);
    document.addEventListener("visibilitychange", pauseWhenPageIsHidden);
    window.addEventListener("pagehide", pauseVideo);

    return () => {
      preloadObserver?.disconnect();
      playbackObserver.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenPageIsHidden);
      window.removeEventListener("pagehide", pauseVideo);
      pauseVideo();
    };
  }, [eager, poster, src]);

  return (
    <video
      ref={videoRef}
      className={className}
      width={width}
      height={height}
      style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
      muted
      loop
      playsInline
      poster={eager ? poster : undefined}
      preload={eager ? "metadata" : "none"}
      data-managed-background="true"
      aria-hidden="true"
    >
      <source data-src={src} type={sourceType} />
    </video>
  );
}
