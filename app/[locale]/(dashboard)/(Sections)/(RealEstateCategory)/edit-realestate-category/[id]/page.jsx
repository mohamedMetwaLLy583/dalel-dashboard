import React from "react";
import { useTranslations } from "next-intl";
import EditRealEstateCategoryForm from "./EditRealEstateCategoryForm";

export default function EditSlider() {
  const t = useTranslations();
  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("RealEstateCategory.EditRealEstateCategory.title")}
      </div>
      <div className="form_container w-[90%] md:w-[50%] mx-auto min-h-[50vh]">
        <EditRealEstateCategoryForm />
      </div>
    </section>
  );
}
