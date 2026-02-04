"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@/components/ui/progress";
import RealEstateCategoryTable from "./RealEstateCategoryTable";

export default function ShowRealEstateCategory() {
  const t = useTranslations();

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("RealEstateCategory.title")}
      </div>
      <RealEstateCategoryTable />
    </section>
  );
}
