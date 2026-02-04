"use client";
import React from "react";
import { useTranslations } from "next-intl";
import AdminsTable from "./AdminsTable";
import { useAdminsHook } from "../hooks/useAdminsHook";

export default function ShowAdmins() {
  const t = useTranslations();
  const { loading } = useAdminsHook();

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Admins.title")}
      </div>
      <AdminsTable />
    </section>
  );
}
