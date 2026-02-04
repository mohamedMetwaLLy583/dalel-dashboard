import { useTranslations } from "next-intl";
import React from "react";
import EditHomeSeoForm from "./EditHomeSeoForm";

export default function SEOHome() {
  const t = useTranslations();

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("SEO.Home.title")}
      </div>
      <div className="form_container w-[90%] md:w-[50%] mx-auto min-h-[50vh]">
        <EditHomeSeoForm />
      </div>
    </section>
  );
}
