"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { prefersReducedMotion } from "@/lib/gsap";
import { useLazyAnimation } from "@/hooks/use-lazy-animation";
import { ROLES } from "../constants";
import type { RoleKey } from "../types";
import { EmployeePane, HrPane, ManagerPane } from "./dashboard-panes";

const PANES: Record<RoleKey, React.ComponentType> = {
  manager: ManagerPane,
  hr: HrPane,
  employee: EmployeePane,
};

export function DashboardPreviewSection() {
  const t = useTranslations("landing.dashboard");
  const [role, setRole] = React.useState<RoleKey>("manager");
  const scope = React.useRef<HTMLElement>(null);
  const firstRender = React.useRef(true);

  // Entrance: role pills + KPI counters + rows on first scroll into view
  useLazyAnimation(
    ({ gsap }) => {
      if (prefersReducedMotion()) return;
      gsap.from(".role", {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".roles", start: "top 85%", once: true },
      });
      gsap.from(".d-row", {
        y: 14,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dash", start: "top 80%", once: true },
      });
      gsap.utils.toArray<HTMLElement>(".d-kpis b").forEach((el) => {
        const target = Number(el.dataset.kpi ?? el.textContent);
        const counter = { n: 0 };
        gsap.to(counter, {
          n: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: ".dash", start: "top 80%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.n));
          },
        });
      });
    },
    { scope }
  );

  // Pane switch animation
  useLazyAnimation(
    ({ gsap }) => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (prefersReducedMotion()) return;
      gsap.fromTo(".seg2-desc", { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.from(".d-kpis > div, .d-row, .phone-list > div", {
        y: 14,
        opacity: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: "power3.out",
      });
    },
    { scope, dependencies: [role] }
  );

  const Pane = PANES[role];

  return (
    <section className="sheet s-dash" id="dashboard" ref={scope}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">{t("eyebrow")}</div>
            <h2 className="h2 reveal">{t("title")}</h2>
          </div>
          <p className="desc reveal">{t("desc")}</p>
        </div>

        <div className="dash-cols">
          <div className="seg2-wrap">
            <div className="roles" role="group" aria-label={t("eyebrow")}>
              {ROLES.map((key) => (
                <button
                  key={key}
                  type="button"
                  className="role"
                  aria-pressed={role === key}
                  onClick={() => setRole(key)}
                >
                  {t(`roles.${key}.label`)}
                </button>
              ))}
            </div>
            <p className="seg2-desc">{t(`roles.${role}.desc`)}</p>
          </div>

          <div className="dash">
            <div className="b-bar">
              <div className="b-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="b-url">
                <span>
                  dawam.app/<b>dashboard</b>
                </span>
              </div>
              <div className="b-sp" />
            </div>
            <div className="d-body">
              <Pane key={role} />
            </div>
            <p className="demo-note">{t("demoNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
