"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Enhance existing markup without hiding content before JavaScript is ready.
const revealTargets = [
  ".pillar-launcher-intro",
  ".pillar-launcher-card",
  ".hero-copy > *",
  ".hero-visual",
  ".area-finder > *",
  ".section-heading",
  ".opportunity-card",
  ".story-card",
  ".rights-callout > *",
  ".circle-callout",
  ".page-intro",
  ".hub-intro",
  ".hub-player",
  ".structure-card",
  ".guide-card",
  ".zone-card",
  ".feature-card",
  ".product-card",
].join(",");

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};

    function start() {
      stop();
      if (preference.matches) return;

      const seen = new WeakSet<Element>();
      const animations = new Map<Element, Animation>();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target;
            observer.unobserve(element);
            // Never animate content away from the user's keyboard focus.
            if (
              element.contains(document.activeElement) ||
              !(element instanceof HTMLElement)
            )
              continue;
            const siblings = Array.from(element.parentElement?.children ?? []);
            const order = siblings
              .filter((sibling) => sibling.matches(revealTargets))
              .indexOf(element);
            const animation = element.animate(
              [
                { opacity: 0, translate: "0 18px" },
                { opacity: 1, translate: "0 0" },
              ],
              {
                duration: 560,
                delay: Math.min(Math.max(order, 0), 3) * 65,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "backwards",
              },
            );
            animations.set(element, animation);
            animation.onfinish = () => animations.delete(element);
          }
        },
        { threshold: 0, rootMargin: "0px 0px -24px 0px" },
      );

      function observe(root: Element) {
        const targets = root.matches(revealTargets) ? [root] : [];
        targets.push(...root.querySelectorAll(revealTargets));
        for (const target of targets) {
          if (seen.has(target)) continue;
          seen.add(target);
          observer.observe(target);
        }
      }

      observe(main!);
      // Include streamed route content and newly rendered discovery cards.
      const mutations = new MutationObserver((records) => {
        for (const record of records) {
          for (const node of record.addedNodes) {
            if (node instanceof Element) observe(node);
          }
          for (const node of record.removedNodes) {
            if (!(node instanceof Element)) continue;
            for (const target of [
              node,
              ...node.querySelectorAll(revealTargets),
            ]) {
              observer.unobserve(target);
              animations.get(target)?.cancel();
              animations.delete(target);
            }
          }
        }
      });
      mutations.observe(main!, { childList: true, subtree: true });

      const onFocus = (event: FocusEvent) => {
        // Pointer focus must not move a control between pointer-down and click.
        // Keyboard focus still cancels the reveal so focused content stays visible.
        if (
          !(event.target instanceof Element) ||
          !event.target.matches(":focus-visible")
        )
          return;
        for (const [element, animation] of animations) {
          if (event.target instanceof Node && element.contains(event.target)) {
            animation.cancel();
            animations.delete(element);
          }
        }
      };
      main!.addEventListener("focusin", onFocus);
      stop = () => {
        observer.disconnect();
        mutations.disconnect();
        main!.removeEventListener("focusin", onFocus);
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      };
    }

    start();
    preference.addEventListener("change", start);
    return () => {
      stop();
      preference.removeEventListener("change", start);
    };
  }, [pathname]);

  return null;
}
