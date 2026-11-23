"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { useFaqs } from "../hooks/use-faqs";

export function FaqSection() {
  const t = useTranslations("landing.faq");
  const items = useFaqs();
  const [openId, setOpenId] = React.useState<string | null>(null);
  // Open/close is a pure CSS transition (landing.css: .q .a grid rows), no JS animation library needed

  return (
    <section className="sheet s-faq light" id="faq">
      <div className="wrap faq-cols">
        <div>
          <div className="eyebrow reveal">{t("eyebrow")}</div>
          <h2 className="h2 reveal">{t("title")}</h2>
          <p className="desc reveal">{t("desc")}</p>
        </div>
        <div className="faq">
          {items.map((item) => {
            const isOpen = item.id === openId;
            const panelId = `faq-panel-${item.id}`;
            return (
              <div key={item.id} className={`q${isOpen ? " open" : ""}`} data-id={item.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  {item.question}
                  <i>
                    <Plus />
                  </i>
                </button>
                <div className="a" id={panelId} role="region" aria-hidden={!isOpen}>
                  <div className="a-in">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
