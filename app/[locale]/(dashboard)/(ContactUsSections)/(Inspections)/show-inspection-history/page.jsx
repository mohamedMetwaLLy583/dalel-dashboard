"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@/components/ui/progress";
import InspectionHistoryTable from "./InspectionHistoryTable";

export default function ShowInspectionRequests() {
  const t = useTranslations();

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Inspections.history")}
      </div>
      <InspectionHistoryTable />
    </section>
  );
}
