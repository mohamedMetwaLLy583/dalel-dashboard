import React from "react";
import { useTranslations } from "next-intl";
import EditRoleForm from "./EditRoleForm";

export default function EditRole() {
  const t = useTranslations();
  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Roles.EditRoles.title")}
      </div>
      <div className="form_container w-[90%] md:w-[50%] mx-auto min-h-[50vh]">
        <EditRoleForm />
      </div>
    </section>
  );
}
