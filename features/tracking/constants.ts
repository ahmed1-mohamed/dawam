import type { RoutePoint, TrackingPin } from "./types";

export const MAP_WIDTH = 700;
export const MAP_HEIGHT = 520;
export const MAP_VIEWBOX = `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`;

/** The rep's route as a polyline (map viewBox units). */
export const ROUTE_POINTS: RoutePoint[] = [
  [120, 440],
  [120, 300],
  [220, 300],
  [220, 200],
  [330, 200],
  [330, 120],
  [440, 120],
  [440, 300],
  [540, 300],
  [540, 440],
  [630, 440],
  [630, 200],
];

export const ROUTE_PATH = ROUTE_POINTS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

export const MAJOR_STREETS = [
  "M-20 120 H720",
  "M-20 300 H720",
  "M-20 440 H720",
  "M120 -20 V540",
  "M330 -20 V540",
  "M540 -20 V540",
  "M-20 520 L380 -20",
  "M420 540 L720 200",
];

export const MINOR_STREETS = [
  "M-20 60 H720",
  "M-20 200 H720",
  "M-20 370 H720",
  "M60 -20 V540",
  "M220 -20 V540",
  "M440 -20 V540",
  "M630 -20 V540",
];

export const TRACKING_PINS: TrackingPin[] = [
  { key: "checkIn", x: 120, y: 440, clock: "08:56" },
  { key: "nourhan", x: 220, y: 300, clock: "09:30" },
  { key: "sami", x: 330, y: 200, clock: "10:12" },
  { key: "salam", x: 440, y: 120, clock: "11:20" },
  { key: "fouad", x: 440, y: 300, clock: "12:45" },
  { key: "shifa", x: 540, y: 440, clock: "02:05" },
  { key: "checkOut", x: 630, y: 200, clock: "04:58" },
];

/** Number of customer visits (pins between check-in and check-out). */
export const TOTAL_VISITS = TRACKING_PINS.length - 2;
