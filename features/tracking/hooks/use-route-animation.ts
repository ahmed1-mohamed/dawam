"use client";

import type { RefObject } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useLazyAnimation } from "@/hooks/use-lazy-animation";
import { MAP_HEIGHT, MAP_WIDTH, ROUTE_POINTS, TOTAL_VISITS } from "../constants";
import { createRoute, createSliceProjection } from "../lib/route-geometry";
import type { TrackingPinView } from "../types";

interface Options {
  scope: RefObject<HTMLDivElement | null>;
  pins: TrackingPinView[];
  onTheWay: string;
  toward: (place: string) => string;
}

const route = createRoute(ROUTE_POINTS);

/**
 * Drives the "rep's day" demo: the route draws itself, the rep marker moves
 * between pins, and the "now" card updates. Plays only while the map is in view.
 *
 * Performance: geometry is pure maths, pins are positioned only on resize,
 * and each frame only writes the route dash offset and the marker transform.
 */
export function useRouteAnimation({ scope, pins, onTheWay, toward }: Options) {
  useLazyAnimation(
    ({ gsap, ScrollTrigger }) => {
      const map = scope.current;
      const canvas = map?.querySelector<HTMLElement>("[data-canvas]");
      const routeEl = map?.querySelector<SVGPathElement>("[data-route]");
      const rep = map?.querySelector<HTMLElement>("[data-rep]");
      const nowCard = map?.querySelector<HTMLElement>(".now");
      const nowName = map?.querySelector<HTMLElement>("[data-now-name]");
      const nowMeta = map?.querySelector<HTMLElement>("[data-now-meta]");
      const nowCount = map?.querySelector<HTMLElement>("[data-now-count]");
      if (!map || !canvas || !routeEl || !rep || !nowCard || !nowName || !nowMeta || !nowCount) return;

      const pinEls = Array.from(canvas.querySelectorAll<HTMLElement>("[data-pin]"));
      const labels = pinEls.map((el) => el.querySelector(".lbl"));
      const rings = pinEls.map((el) => el.querySelector(".ring"));
      const at = pins.map((p) => route.progressOf(p.x, p.y));

      const len = route.length;
      routeEl.style.strokeDasharray = `${len}`;

      let project = createSliceProjection(canvas.clientWidth, canvas.clientHeight, MAP_WIDTH, MAP_HEIGHT);
      const setRep = gsap.quickSetter(rep, "css") as (v: { x: number; y: number }) => void;
      const prog = { p: 0 };
      let onCount = -1;

      const place = (p: number) => {
        routeEl.style.strokeDashoffset = `${len * (1 - p)}`;
        const [x, y] = route.pointAt(p);
        setRep(project(x, y));
        // Only touch pin classes when the number of reached pins changes
        const reached = at.filter((a) => p >= a - 0.001).length;
        if (reached !== onCount) {
          onCount = reached;
          pinEls.forEach((el, i) => el.classList.toggle("on", i < reached));
        }
      };

      const EDGE = 6;
      const layoutPins = () => {
        const w = canvas.clientWidth;
        project = createSliceProjection(w, canvas.clientHeight, MAP_WIDTH, MAP_HEIGHT);
        pinEls.forEach((el, i) => {
          const q = project(pins[i].x, pins[i].y);
          el.style.transform = `translate(${q.x}px, ${q.y}px)`;
          // Keep the (centered) label inside the canvas near the edges.
          // margin-left is used because GSAP owns the label's transform.
          const lbl = labels[i] as HTMLElement | null;
          if (lbl) {
            const half = lbl.offsetWidth / 2;
            const shift = Math.max(EDGE + half - q.x, Math.min(0, w - EDGE - half - q.x));
            lbl.style.marginLeft = `${Math.round(shift)}px`;
          }
        });
        place(prog.p);
      };

      const setNow = (i: number) => {
        const pin = pins[i];
        nowName.textContent = pin.name;
        nowMeta.textContent = pin.time + (pin.duration ? ` · ${pin.duration}` : "");
        nowCount.textContent = `${Math.max(0, Math.min(TOTAL_VISITS, i))}/${TOTAL_VISITS}`;
        gsap.fromTo(nowCard, { y: 6, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
      };

      layoutPins();
      const ro = new ResizeObserver(layoutPins);
      ro.observe(canvas);
      const cleanup = () => ro.disconnect();

      // Reduced motion: show the finished route statically
      if (prefersReducedMotion()) {
        prog.p = 1;
        place(1);
        gsap.set(labels, { opacity: 1 });
        setNow(pins.length - 1);
        return cleanup;
      }

      gsap.set(labels, { opacity: 0, y: 6, scale: 0.9 });
      gsap.set(rep, { scale: 0 });

      const trip = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5, defaults: { ease: "power2.inOut" } });
      const stop = (i: number) => {
        trip
          .call(() => {
            pinEls.forEach((el, k) => el.classList.toggle("past", k < i));
            setNow(i);
          })
          .to(rings[i], { keyframes: [{ scale: 1, opacity: 0.9, duration: 0 }, { scale: 3.2, opacity: 0, duration: 0.9, ease: "power2.out" }] }, "<")
          .to(labels[i], { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2)" }, "<")
          .to(rep, { scale: 0.85, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, "<");
      };

      trip.to(rep, { scale: 1, duration: 0.45, ease: "back.out(2.2)" });
      stop(0);
      pins.slice(1).forEach((pin, i) => {
        const from = at[i];
        const to = at[i + 1];
        trip
          .call(
            () => {
              nowName.textContent = onTheWay;
              nowMeta.textContent = toward(pin.label);
            },
            undefined,
            "+=.35"
          )
          .to(prog, { p: to, duration: 0.35 + (to - from) * 2.4, onUpdate: () => place(prog.p) });
        stop(i + 1);
      });
      trip
        .to({}, { duration: 1.2 })
        .to([...labels, rep, routeEl], { opacity: 0, duration: 0.5, ease: "power1.in" })
        .call(() => {
          prog.p = 0;
          place(0);
          pinEls.forEach((el) => el.classList.remove("past"));
          nowCount.textContent = `0/${TOTAL_VISITS}`;
          gsap.set(labels, { y: 6, scale: 0.9 });
          gsap.set(routeEl, { opacity: 1 });
          gsap.set(rep, { opacity: 1, scale: 0 });
        });

      ScrollTrigger.create({
        trigger: map,
        start: "top 75%",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? trip.play() : trip.pause()),
      });

      return cleanup;
    },
    // Rebuild when texts change (language switch)
    { scope, dependencies: [pins, onTheWay] }
  );
}
