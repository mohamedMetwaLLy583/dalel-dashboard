import { useTranslations } from "next-intl";
import React from "react";
import EditAboutSeoForm from "./EditAboutSeoForm";

export default function SEOAbout() {
  const t = useTranslations();

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("SEO.About.title")}
      </div>
      <div className="form_container w-[90%] md:w-[50%] mx-auto min-h-[50vh]">
        <EditAboutSeoForm />
      </div>
    </section>
  );
}
