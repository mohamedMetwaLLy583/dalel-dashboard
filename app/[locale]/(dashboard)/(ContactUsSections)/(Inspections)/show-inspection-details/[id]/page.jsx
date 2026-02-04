import React from "react";
import { useTranslations } from "next-intl";
import ShowInpsectionDetails from "./ShowInpsectionDetails";

export default function ShowInspections() {
  const t = useTranslations();
  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Inspections.EditInspections.title")}
      </div>
      <div className="">
        <ShowInpsectionDetails />
      </div>
    </section>
  );
}
