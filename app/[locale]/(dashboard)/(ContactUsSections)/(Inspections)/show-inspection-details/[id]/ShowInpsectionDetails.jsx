"use client";
import React, { useEffect } from "react";
import { useInspectionsHook } from "../../hooks/useInspectionsHook";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgress } from "@/components/ui/progress";
import { useParams } from "next/navigation";

const ShowInpsectionDetails = () => {
  const { id } = useParams();

  const t = useTranslations();
  const { getCurrentData, currentData, loading } = useInspectionsHook();

  useEffect(() => {
    getCurrentData(id);
  }, []);

  // Show a loading spinner while data is fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <CircularProgress value={50} color="primary" loading size="xs" />
      </div>
    );
  }

  // Handle if no data is found or not yet loaded
  if (!currentData) {
    return <div className="mt-6">No data found</div>;
  }

  // Define your tabs: one for details, one for images
  const tabs = [
    { value: "details", label: t("Inspections.tabs.details") },
    { value: "images", label: t("Inspections.tabs.images") },
  ];

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-6 max-w-screen-2xl">
      <div className="grid grid-cols-12 gap-6">
        {/* Make content bigger and centered on larger screens */}
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          {/* Title / Name */}
          <h1 className="text-2xl font-semibold mb-4">{currentData.name}</h1>

          {/* Tabs */}
          <Tabs defaultValue="details" className="p-0 px-1">
            {/* Tabs List */}
            <TabsList
              className="
                bg-card flex-1 overflow-x-auto md:overflow-hidden
                w-full px-5 pt-6 pb-2.5 h-fit border-b border-default-200
                rounded-none justify-start gap-12 rounded-t-md
              "
            >
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={`tab-${index}`}
                  value={tab.value}
                  className="
                    capitalize px-0
                    data-[state=active]:shadow-none
                    data-[state=active]:bg-transparent
                    data-[state=active]:text-primary
                    transition duration-150
                    before:transition-all before:duration-150
                    relative before:absolute before:left-1/2 before:-bottom-[11px]
                    before:h-[2px] before:-translate-x-1/2 before:w-0
                    data-[state=active]:before:bg-primary
                    data-[state=active]:before:w-full
                  "
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* =========== DETAILS TAB =========== */}
            <TabsContent value="details" className="mt-0">
              <div className="p-4">
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <strong>{t("Inspections.phone")}:</strong>{" "}
                    {currentData.phone}
                  </div>
                  <div>
                    <strong>{t("Inspections.address")}:</strong>{" "}
                    {currentData.address}
                  </div>
                  <div>
                    <strong>{t("Inspections.offer_type")}:</strong>{" "}
                    {currentData.offer_type}
                  </div>
                  <div>
                    <strong>{t("Inspections.date")}:</strong> {currentData.date}
                  </div>
                  <div>
                    <strong>{t("Inspections.time")}:</strong> {currentData.time}
                  </div>
                  <div>
                    <strong>{t("Inspections.description")}:</strong>{" "}
                    {currentData.description}
                  </div>
                  <div>
                    <strong>{t("Inspections.requester_type")}:</strong>{" "}
                    {currentData.requester_type}
                  </div>
                  <div>
                    <strong>{t("Inspections.status")}:</strong>{" "}
                    {t(`Status.${currentData.status}`)}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* =========== IMAGES TAB =========== */}
            <TabsContent value="images" className="mt-0">
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentData.images && currentData.images.length > 0 ? (
                  currentData.images.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="
                        w-full h-48 overflow-hidden
                        rounded-md bg-gray-100 flex
                        items-center justify-center
                      "
                    >
                      <img
                        src={imgUrl}
                        alt={`Inspection image ${idx}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))
                ) : (
                  <p>{t("Inspections.noImagesFound")}</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShowInpsectionDetails;
