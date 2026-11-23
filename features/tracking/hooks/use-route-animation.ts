"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { TOTAL_VISITS } from "../constants";
import type { TrackingPinView } from "../types";

interface Options {
  scope: RefObject<HTMLDivElement | null>;
  pins: TrackingPinView[];
  onTheWay: string;
  toward: (place: string) => string;
}

/**
 * Drives the "rep's day" demo: the route draws itself, the rep marker moves
 * between pins, and the "now" card updates. Plays only while the map is in view.
 */
export function useRouteAnimation({ scope, pins, onTheWay, toward }: Options) {
  useGSAP(
    () => {
      const map = scope.current;
      if (!map) return;
      const svg = map.querySelector<SVGSVGElement>("svg.streets");
      const route = map.querySelector<SVGPathElement>("[data-route]");
      const rep = map.querySelector<HTMLElement>("[data-rep]");
      const nowName = map.querySelector<HTMLElement>("[data-now-name]");
      const nowMeta = map.querySelector<HTMLElement>("[data-now-meta]");
      const nowCount = map.querySelector<HTMLElement>("[data-now-count]");
      const pinEls = Array.from(map.querySelectorAll<HTMLElement>("[data-pin]"));
      if (!svg || !route || !rep || !nowName || !nowMeta || !nowCount) return;

      const len = route.getTotalLength();
      route.style.strokeDasharray = `${len}`;
      route.style.strokeDashoffset = `${len}`;

      const toMap = (x: number, y: number) => {
        const m = svg.getScreenCTM();
        const r = map.getBoundingClientRect();
        if (!m) return { x: 0, y: 0 };
        const sp = new DOMPoint(x, y).matrixTransform(m);
        return { x: sp.x - r.left, y: sp.y - r.top };
      };

      // Fraction of the route length closest to each pin
      const atOf = (x: number, y: number) => {
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i <= 400; i++) {
          const q = route.getPointAtLength((len * i) / 400);
          const d = (q.x - x) ** 2 + (q.y - y) ** 2;
          if (d < bestDist) {
            bestDist = d;
            best = i / 400;
          }
        }
        return best;
      };
      const at = pins.map((p) => atOf(p.x, p.y));

      const prog = { p: 0 };
      const place = (p: number) => {
        route.style.strokeDashoffset = `${len * (1 - p)}`;
        const pt = route.getPointAtLength(len * p);
        if (svg.getScreenCTM()) {
          gsap.set(rep, toMap(pt.x, pt.y));
          pinEls.forEach((el, i) => {
            const q = toMap(pins[i].x, pins[i].y);
            el.style.left = `${q.x}px`;
            el.style.top = `${q.y}px`;
          });
        }
        pinEls.forEach((el, i) => el.classList.toggle("on", p >= at[i] - 0.001));
      };

      const setNow = (i: number) => {
        const pin = pins[i];
        nowName.textContent = pin.name;
        nowMeta.textContent = pin.time + (pin.duration ? ` · ${pin.duration}` : "");
        nowCount.textContent = `${Math.max(0, Math.min(TOTAL_VISITS, i))}/${TOTAL_VISITS}`;
        gsap.fromTo(map.querySelector(".now"), { y: 6, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
      };

      place(0);
      const onResize = () => place(prog.p);
      const ro = new ResizeObserver(onResize);
      ro.observe(map);
      ScrollTrigger.addEventListener("refresh", onResize);

      const labels = pinEls.map((el) => el.querySelector(".lbl"));
      const rings = pinEls.map((el) => el.querySelector(".ring"));

      // Reduced motion: show the finished route statically
      if (prefersReducedMotion()) {
        prog.p = 1;
        place(1);
        gsap.set(labels, { opacity: 1 });
        setNow(pins.length - 1);
        return () => {
          ro.disconnect();
          ScrollTrigger.removeEventListener("refresh", onResize);
        };
      }

      gsap.set(labels, { opacity: 0, y: 6, scale: 0.9 });
      gsap.set(rep, { scale: 0 });

      const trip = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.5, defaults: { ease: "power2.inOut" } });
      const stop = (i: number) => {
        trip
          .call(() => {
            pinEls.forEach((el, k) => el.classList.toggle("past", k < i));
            pinEls[i].classList.add("on");
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
        .to([...labels, rep, route], { opacity: 0, duration: 0.5, ease: "power1.in" })
        .call(() => {
          prog.p = 0;
          place(0);
          pinEls.forEach((el) => el.classList.remove("on", "past"));
          nowCount.textContent = `0/${TOTAL_VISITS}`;
          gsap.set(labels, { y: 6, scale: 0.9 });
          gsap.set(route, { opacity: 1 });
          gsap.set(rep, { opacity: 1, scale: 0 });
        });

      ScrollTrigger.create({
        trigger: map,
        start: "top 75%",
        end: "bottom top",
        onEnter: () => trip.play(),
        onEnterBack: () => trip.play(),
        onLeave: () => trip.pause(),
        onLeaveBack: () => trip.pause(),
      });

      return () => {
        ro.disconnect();
        ScrollTrigger.removeEventListener("refresh", onResize);
      };
    },
    // Rebuild when texts change (language switch)
    { scope, dependencies: [pins, onTheWay], revertOnUpdate: true }
  );
}
