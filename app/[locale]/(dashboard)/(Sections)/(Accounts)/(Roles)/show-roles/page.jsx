"use client";
import React from "react";
import { useTranslations } from "next-intl";
import RolesTable from "./RolesTable";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default function ShowRoles() {
  const t = useTranslations();
  // const session = await getServerSession(authOptions);
  // if (!session?.user?.email) {
  //   redirect(`/${locale}/auth/login`);
  // }

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Roles.title")}
      </div>
      <RolesTable />
    </section>
  );
}
