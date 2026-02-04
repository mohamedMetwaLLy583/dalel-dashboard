"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@/components/ui/progress";

import ChooseUsTable from "./ChooseUsTable";
import { useChooseUsHook } from "../hooks/useChooseUsHook";

export default function ShowChooseUs() {
  const t = useTranslations();
  const { loading } = useChooseUsHook();

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("ChooseUs.title")}
      </div>
      <ChooseUsTable />
    </section>
  );
}
