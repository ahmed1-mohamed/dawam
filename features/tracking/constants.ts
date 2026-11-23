import type { TrackingPin } from "./types";

export const MAP_VIEWBOX = "0 0 700 520";

export const ROUTE_PATH =
  "M120 440 L120 300 L220 300 L220 200 L330 200 L330 120 L440 120 L440 300 L540 300 L540 440 L630 440 L630 200";

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
