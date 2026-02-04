"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@/components/ui/progress";

import MarketingStepsTable from "./MarketingStepsTable";
import { useMarketingStepsHook } from "../hooks/useMarketingStepsHook";

export default function ShowChooseUs() {
  const t = useTranslations();
  const { loading } = useMarketingStepsHook();

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("MarketingSteps.title")}
      </div>
      <MarketingStepsTable />
    </section>
  );
}
