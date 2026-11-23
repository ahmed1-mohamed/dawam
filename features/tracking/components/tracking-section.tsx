import { useTranslations } from "next-intl";
import { TrackingMap } from "./tracking-map";

export function TrackingSection() {
  const t = useTranslations("landing.tracking");

  return (
    <section className="sheet s-track light" id="tracking">
      <div className="wrap">
        <h2 className="h2 reveal">{t("title")}</h2>
        <p className="desc reveal">{t("desc")}</p>
        <div className="track">
          <TrackingMap />
          <p className="demo-note">{t("demoNote")}</p>
        </div>
      </div>
    </section>
  );
}
