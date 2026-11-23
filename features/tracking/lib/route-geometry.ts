import type { RoutePoint } from "../types";

/**
 * Pure polyline maths for the route animation, so the hot path never calls
 * SVG DOM APIs (getPointAtLength / getScreenCTM) on every frame.
 */
export function createRoute(points: readonly RoutePoint[]) {
  const cumulative = [0];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    cumulative.push(cumulative[i - 1] + Math.hypot(x1 - x0, y1 - y0));
  }
  const length = cumulative[cumulative.length - 1];

  /** Point at progress `p` (0..1) along the route. */
  const pointAt = (p: number): RoutePoint => {
    const d = Math.min(Math.max(p, 0), 1) * length;
    let i = 1;
    while (i < cumulative.length - 1 && cumulative[i] < d) i++;
    const segLen = cumulative[i] - cumulative[i - 1] || 1;
    const t = (d - cumulative[i - 1]) / segLen;
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t];
  };

  /** Progress (0..1) of the route point closest to (x, y). */
  const progressOf = (x: number, y: number) => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const dx = x1 - x0;
      const dy = y1 - y0;
      const segSq = dx * dx + dy * dy || 1;
      const t = Math.min(Math.max(((x - x0) * dx + (y - y0) * dy) / segSq, 0), 1);
      const px = x0 + dx * t;
      const py = y0 + dy * t;
      const dist = (px - x) ** 2 + (py - y) ** 2;
      if (dist < bestDist) {
        bestDist = dist;
        best = (cumulative[i - 1] + Math.sqrt(segSq) * t) / length;
      }
    }
    return best;
  };

  return { length, pointAt, progressOf };
}

/**
 * Maps viewBox coordinates to pixels inside a box rendered with
 * `preserveAspectRatio="xMidYMid slice"`.
 */
export function createSliceProjection(boxW: number, boxH: number, viewW: number, viewH: number) {
  const scale = Math.max(boxW / viewW, boxH / viewH);
  const offsetX = (boxW - viewW * scale) / 2;
  const offsetY = (boxH - viewH * scale) / 2;
  return (x: number, y: number) => ({ x: offsetX + x * scale, y: offsetY + y * scale });
}
