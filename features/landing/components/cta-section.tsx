import Image from "next/image";
import { useTranslations } from "next-intl";
import { DEMO_ANCHOR_ID } from "@/features/demo-request";
import { CTA_IMAGE } from "../constants";
import { DirArrow } from "./dir-arrow";

export function CtaSection() {
  const t = useTranslations("landing.cta");

  return (
    <section className="sheet s-cta">
      <div className="wrap">
        <div className="cta reveal">
          <div>
            <h2>{t("title")}</h2>
            <p>{t("body")}</p>
            <div className="ctas">
              <a href={`#${DEMO_ANCHOR_ID}`} className="btn btn-p">
                {t("button")} <DirArrow />
              </a>
            </div>
          </div>
          <div className="cta-ico" data-float="">
            <Image src={CTA_IMAGE} alt="" fill sizes="(max-width: 600px) 160px, 220px" />
          </div>
        </div>
      </div>
    </section>
  );
}
