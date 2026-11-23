"use client";

import { useTranslations } from "next-intl";
import {
  EMPLOYEE_CARDS,
  EMPLOYEE_TASKS,
  HR_KPIS,
  HR_ROWS,
  MANAGER_KPIS,
  MANAGER_ROWS,
} from "../constants";
import type { Kpi, PersonKey } from "../types";

function Kpis({ items, ns }: { items: Kpi[]; ns: "manager" | "hr" }) {
  const t = useTranslations(`landing.dashboard.${ns}.kpis`);
  return (
    <div className="d-kpis">
      {items.map((kpi) => (
        <div key={kpi.key}>
          <span>{t(kpi.key)}</span>
          <b className={kpi.tone} data-kpi={kpi.value}>
            {kpi.value}
          </b>
        </div>
      ))}
    </div>
  );
}

function Person({ person }: { person: PersonKey }) {
  const t = useTranslations("landing.dashboard.people");
  return (
    <span className="who-c">
      <span className="av">{t(`${person}.initials`)}</span>
      {t(`${person}.name`)}
    </span>
  );
}

export function ManagerPane() {
  const t = useTranslations("landing.dashboard.manager");
  const tPlaces = useTranslations("landing.dashboard.places");
  return (
    <div className="d-pane">
      <Kpis items={MANAGER_KPIS} ns="manager" />
      <div className="d-table">
        <div className="d-row">
          <span>{t("cols.employee")}</span>
          <span>{t("cols.checkIn")}</span>
          <span>{t("cols.lastLocation")}</span>
          <span>{t("cols.status")}</span>
        </div>
        {MANAGER_ROWS.map((row) => (
          <div key={row.person} className="d-row">
            <Person person={row.person} />
            <span className="mono">{row.checkIn ?? "—"}</span>
            <span>{row.place ? tPlaces(row.place) : "—"}</span>
            <span className={`tag ${row.tone}`}>{t(`status.${row.status}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HrPane() {
  const t = useTranslations("landing.dashboard.hr");
  const lateness = (h: number, m: number) =>
    h > 0 ? t("durationHM", { h, m: String(m).padStart(2, "0") }) : t("durationM", { m });

  return (
    <div className="d-pane">
      <Kpis items={HR_KPIS} ns="hr" />
      <div className="d-table">
        <div className="d-row">
          <span>{t("cols.employee")}</span>
          <span>{t("cols.daysPresent")}</span>
          <span>{t("cols.lateness")}</span>
          <span>{t("cols.absences")}</span>
        </div>
        {HR_ROWS.map((row) => (
          <div key={row.person} className="d-row">
            <Person person={row.person} />
            <span className="mono">{row.daysPresent}</span>
            <span className="mono">{lateness(row.lateHours, row.lateMinutes)}</span>
            <span className={`tag ${row.tone}`}>{row.absences}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmployeePane() {
  const t = useTranslations("landing.dashboard.employee");
  return (
    <div className="d-pane">
      <div className="phone-list">
        {EMPLOYEE_CARDS.map((card) => (
          <div key={card.key}>
            <span className={`tag ${card.tone}`}>{t(`cards.${card.key}.tag`)}</span>
            <b>{t(`cards.${card.key}.title`)}</b>
            <span>{t(`cards.${card.key}.body`)}</span>
          </div>
        ))}
      </div>
      <div className="d-table">
        <div className="d-row">
          <span>{t("cols.task")}</span>
          <span>{t("cols.due")}</span>
          <span>{t("cols.priority")}</span>
          <span>{t("cols.status")}</span>
        </div>
        {EMPLOYEE_TASKS.map((task) => (
          <div key={task.key} className="d-row">
            <span>{t(`tasks.${task.key}`)}</span>
            <span className="mono">{t(`due.${task.due}`)}</span>
            <span className={`tag ${task.priority.tone}`}>{t(`priority.${task.priority.key}`)}</span>
            <span className={`tag ${task.status.tone}`}>{t(`status.${task.status.key}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
