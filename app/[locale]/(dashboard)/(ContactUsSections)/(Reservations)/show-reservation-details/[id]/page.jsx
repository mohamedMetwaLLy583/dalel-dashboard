import React from "react";
import { useTranslations } from "next-intl";
import ShowReservationDetails from "./ShowReservationDetails";

export default function ShowReservations({ params }) {
  const t = useTranslations();
  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Reservations.EditReservations.title")}
      </div>
      <div className="">
        <ShowReservationDetails locale={params.locale} />
      </div>
    </section>
  );
}
