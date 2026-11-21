import { useEffect } from "react";

// Global counter tracking active scroll locks
let lockCount = 0;

// Stored styles before any scroll lock was activated
let originalStyles: {
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyWidth: string;
  bodyPaddingRight: string;
  htmlOverflow: string;
  htmlScrollBehavior: string;
} | null = null;

let savedScrollY = 0;

function preventBackgroundTouchMove(e: TouchEvent) {
  // Allow touches that originate inside an element marked as scroll-lock scrollable
  // or any container that is explicitly scrollable within an active overlay.
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const scrollableParent = target.closest(
    '[data-scroll-lock-scrollable="true"], .overflow-y-auto, .overflow-auto, [role="dialog"] [class*="overflow-y-auto"]'
  ) as HTMLElement | null;

  if (!scrollableParent) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }
}

function acquireLock() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  lockCount++;
  if (lockCount === 1) {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    savedScrollY = scrollY;

    // Calculate scrollbar width to prevent desktop layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    const body = document.body;
    const docEl = document.documentElement;

    originalStyles = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
      htmlOverflow: docEl.style.overflow,
      htmlScrollBehavior: docEl.style.scrollBehavior
    };

    // Temporarily turn off smooth scrolling to avoid animation jump when locking/unlocking
    docEl.style.scrollBehavior = "auto";
    docEl.style.overflow = "hidden";

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Intercept touchmove to prevent mobile rubberbanding / overscroll-chaining onto the background
    window.addEventListener("touchmove", preventBackgroundTouchMove, { passive: false });
  }
}

function releaseLock() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  if (lockCount > 0) {
    lockCount--;
  }

  if (lockCount === 0 && originalStyles) {
    const body = document.body;
    const docEl = document.documentElement;
    const restoreY = savedScrollY;

    window.removeEventListener("touchmove", preventBackgroundTouchMove);

    body.style.overflow = originalStyles.bodyOverflow;
    body.style.position = originalStyles.bodyPosition;
    body.style.top = originalStyles.bodyTop;
    body.style.left = originalStyles.bodyLeft;
    body.style.width = originalStyles.bodyWidth;
    body.style.paddingRight = originalStyles.bodyPaddingRight;

    docEl.style.overflow = originalStyles.htmlOverflow;
    docEl.style.scrollBehavior = originalStyles.htmlScrollBehavior;

    originalStyles = null;

    // Restore exact scroll position without smooth scrolling animation jump
    window.scrollTo({
      top: restoreY,
      left: 0,
      behavior: "instant" as ScrollBehavior
    });
  }
}

/**
 * Hook to lock background scrolling while an overlay / modal is active.
 * Handles multiple concurrent overlays cleanly via reference counting.
 * Preserves scroll position and prevents layout shift across desktop and mobile.
 */
export function useScrollLock(locked: boolean = true) {
  useEffect(() => {
    if (!locked) return;

    acquireLock();

    return () => {
      releaseLock();
    };
  }, [locked]);
}
