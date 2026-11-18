/**
 * Scroll-reveal runtime, inlined in <head> by the root layout (see <Reveal>).
 *
 * It runs before the page is parsed, so it neither waits for nor depends on React: it flags <html>
 * with `data-reveal-js` (which arms the hidden state in globals.css) and, once the DOM is ready,
 * marks `[data-reveal]` elements and `[data-reveal-group]` children as `data-revealed` when they
 * scroll into view, which plays a CSS animation. Elements already scrolled past are revealed too
 * (e.g. after a restored scroll position). A MutationObserver picks up elements added later by
 * client-side navigation or interactive sections.
 *
 * Without JavaScript, with reduced motion, or without IntersectionObserver nothing is hidden, and
 * if setting up fails the flag is removed so content can never stay invisible.
 *
 * Keep it plain ES5 with no `//` comments: it is collapsed onto one line.
 */
const runtime = `(function () {
  var d = document, root = d.documentElement;
  if (!("IntersectionObserver" in window) || !("WeakSet" in window) || !window.matchMedia || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.setAttribute("data-reveal-js", "");

  var seen = new WeakSet();
  var SELECTOR = "[data-reveal]:not([data-revealed]),[data-reveal-group]:not([data-revealed])";

  function mark(el, delay) {
    if (delay > 0) el.style.animationDelay = delay + "s";
    var duration = el.getAttribute("data-reveal-duration");
    if (duration) el.style.animationDuration = duration + "s";
    el.setAttribute("data-revealed", "");
  }

  function show(el) {
    var delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
    if (!el.hasAttribute("data-reveal-group")) return mark(el, delay);
    var stagger = parseFloat(el.getAttribute("data-reveal-stagger") || "0.08");
    var items = el.querySelectorAll("[data-reveal-item]"), n = 0;
    for (var i = 0; i < items.length; i++) {
      if (items[i].closest("[data-reveal-group]") === el) mark(items[i], delay + stagger * n++);
    }
    el.setAttribute("data-revealed", "");
  }

  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
        io.unobserve(e.target);
        show(e.target);
      }
    }
  }, { rootMargin: "0px 0px -10% 0px" });

  function scan() {
    var els = d.querySelectorAll(SELECTOR);
    for (var i = 0; i < els.length; i++) {
      if (!seen.has(els[i])) {
        seen.add(els[i]);
        io.observe(els[i]);
      }
    }
  }

  var queued = false;
  function queueScan() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      scan();
    });
  }

  function start() {
    try {
      scan();
      new MutationObserver(queueScan).observe(d.body, { childList: true, subtree: true });
    } catch (err) {
      root.removeAttribute("data-reveal-js");
    }
  }

  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", start);
  else start();
})();`;

/** Collapsed onto one line: the script ships inline in every page. */
export const REVEAL_SCRIPT = runtime.replace(/\n\s*/g, " ");
