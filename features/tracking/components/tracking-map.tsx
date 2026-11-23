"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouteAnimation } from "../hooks/use-route-animation";
import { MAJOR_STREETS, MAP_VIEWBOX, MINOR_STREETS, ROUTE_PATH, TOTAL_VISITS, TRACKING_PINS } from "../constants";
import type { TrackingPinView } from "../types";

export function TrackingMap() {
  const t = useTranslations("landing.tracking");
  const locale = useLocale();
  const scope = React.useRef<HTMLDivElement>(null);

  const pins = React.useMemo<TrackingPinView[]>(
    () =>
      TRACKING_PINS.map((pin) => ({
        ...pin,
        label: t(`pins.${pin.key}.label`),
        name: t(`pins.${pin.key}.name`),
        time: t(`pins.${pin.key}.time`),
        duration: t(`pins.${pin.key}.duration`),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  useRouteAnimation({
    scope,
    pins,
    onTheWay: t("onTheWay"),
    toward: (place) => t("toward", { place }),
  });

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="map" ref={scope}>
      <div className="map-canvas" data-canvas="">
        <svg className="streets" viewBox={MAP_VIEWBOX} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="rgba(255,255,255,.06)" strokeWidth="10" fill="none" strokeLinecap="round">
            {MAJOR_STREETS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <g stroke="rgba(255,255,255,.035)" strokeWidth="3" fill="none">
            {MINOR_STREETS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <path d="M560 360 Q610 330 640 280" stroke="rgba(47,191,99,.08)" strokeWidth="40" fill="none" strokeLinecap="round" />
          <path d={ROUTE_PATH} stroke="rgba(255,255,255,.12)" strokeWidth="4" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
          <path data-route="" d={ROUTE_PATH} stroke="var(--accent)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="map-top" dir={dir}>
          <span className="chip">
            <span className="live" />
            {t("repName")}
          </span>
        </div>

        {pins.map((pin) => (
          <div key={pin.key} className="pin" data-pin="">
            <div className="lbl" dir={dir}>
              <b>{pin.label}</b>
              <span>{pin.clock}</span>
            </div>
            <div className="dot" />
            <span className="ring" />
          </div>
        ))}

        <div className="rep" data-rep="" />
      </div>

      <div className="now" dir={dir} aria-live="polite">
        <span className="now-k">{t("now")}</span>
        <b className="now-name" data-now-name="">
          —
        </b>
        <span className="now-meta" data-now-meta="">
          —
        </span>
        <div className="now-c">
          <span>{t("visits")}</span>
          <b data-now-count="">0/{TOTAL_VISITS}</b>
        </div>
      </div>
    </div>
  );
}
