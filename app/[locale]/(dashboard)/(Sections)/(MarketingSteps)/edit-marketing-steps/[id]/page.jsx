import React from "react";
import { useTranslations } from "next-intl";
import EditMarketingStepsForm from "./EditMarketingStepsForm";

export default function EditSlider() {
  const t = useTranslations();
  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("MarketingSteps.EditMarketingSteps.title")}
      </div>
      <div className="form_container w-[90%] md:w-[50%] mx-auto min-h-[50vh]">
        <EditMarketingStepsForm />
      </div>
    </section>
  );
}
