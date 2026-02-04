"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@/components/ui/progress";
import ReservationsTable from "./ReservationsTable";

export default function ShowReservationRequests() {
  const t = useTranslations();

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Reservations.title")}
      </div>
      <ReservationsTable />
    </section>
  );
}
