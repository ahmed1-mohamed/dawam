import { useTranslations } from "next-intl";
import { STEP_KEYS } from "../constants";

/** Server Component. The connecting line is scrubbed by useLandingAnimations ([data-steps]). */
export function StepsSection() {
  const t = useTranslations("landing.steps");

  return (
    <section className="sheet s-steps" id="how">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">{t("eyebrow")}</div>
            <h2 className="h2 reveal">{t("title")}</h2>
          </div>
        </div>
        <div className="u-grid u-steps" data-steps="">
          <span className="u-line" aria-hidden="true">
            <i />
          </span>
          {STEP_KEYS.map((key, i) => (
            <article key={key} className="u-card reveal">
              <span className="u-k" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{t(`items.${key}.title`)}</h3>
              <p>{t(`items.${key}.body`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
