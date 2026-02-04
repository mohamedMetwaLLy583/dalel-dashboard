"use client";
import React from "react";
import { useTranslations } from "next-intl";
import PaginationSection from "./PaginationSection";
import RealEstateTable from "./RealEstateTable";
import { useRealEstateHook } from "../hooks/useRealEstateHook";

export default function ShowRealEstate() {
  const t = useTranslations();
  const { pagination } = useRealEstateHook();

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Property.title")}
      </div>
      <RealEstateTable />
      <div className="pagination my-4">
        <PaginationSection pagination={pagination} />
      </div>
    </section>
  );
}
