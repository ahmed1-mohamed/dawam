export type TrackingPinKey = "checkIn" | "nourhan" | "sami" | "salam" | "fouad" | "shifa" | "checkOut";

/** Static pin definition: position on the 700×520 map viewBox. */
export interface TrackingPin {
  key: TrackingPinKey;
  x: number;
  y: number;
  /** Short time shown on the pin label (locale-neutral). */
  clock: string;
}

/** Pin with its translated texts, ready for rendering / animation. */
export interface TrackingPinView extends TrackingPin {
  label: string;
  name: string;
  time: string;
  duration: string;
}
