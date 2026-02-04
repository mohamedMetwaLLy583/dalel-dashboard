"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Modal from "react-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { useReviewsHook } from "../hooks/useReviewsHook";

export default function ShowReviews() {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations();

  const { data, deleteData, loading, toggleApproval } = useReviewsHook();

  const openModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReview(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const appElement = document.getElementById("__next");
      if (appElement) {
        Modal.setAppElement(appElement);
      }
    }
  }, []);

  return (
    <div className="p-6">
      <div className="title flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">{t("Reviews.title")}</h1>
      </div>

      {loading ? (
        <p className="min-h-[100vh]">{t("Reviews.loading-reviews")}...</p>
      ) : data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {data.map((req) => (
            <Card key={req.id}>
              <CardContent className="p-0 flex flex-col justify-between h-full">
                <div className="p-4">
                  <div className="card_title flex items-center justify-between mb-5">
                    <p className=" text-2xl text-default-700 font-semibold">
                      {req?.name_en || req?.name}
                    </p>
                    {req?.image && (
                      <img
                        src={req?.image}
                        alt="Client Image"
                        className="rounded-full w-[48px] h-[48px]"
                      />
                    )}
                  </div>

                  <p className="mb-4 text-muted-foreground text-[18px]">
                    <span className="font-medium text-default-700">
                      {t("Reviews.review")} :
                    </span>{" "}
                    {req?.review}
                  </p>

                  <Rating
                    style={{ maxWidth: 125 }}
                    className="space-x-1.5"
                    value={req?.rating}
                    readOnly
                  />
                </div>

                <div className="p-4 flex justify-between gap-2">
                  {/* DELETE BUTTON */}
                  <Button
                    className="w-[50%]"
                    color="destructive"
                    onClick={() => openModal(req)}
                    disabled={loading}
                  >
                    {t("Reviews.delete")}
                  </Button>

                  {/* STATUS TOGGLE BUTTON */}
                  <Button
                    className={`w-[50%] ${
                      req.status === "active" ? "bg-gray-500" : "bg-green-500"
                    }`}
                    onClick={() => toggleApproval(req.id)}
                    disabled={loading}
                  >
                    {req.status === "active"
                      ? t("Reviews.disapprove")
                      : t("Reviews.approve")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>{t("Reviews.no-contacts-available")}.</p>
      )}

      {/* MODAL FOR DELETE CONFIRMATION */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      >
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{t("Reviews.modal.title")}</h2>
          <p>{t("Reviews.modal.message")}</p>
          <div className="flex justify-center mt-4">
            <Button
              onClick={closeModal}
              className="mr-4 w-[50%]"
              variant="outline"
            >
              {t("Reviews.modal.no")}
            </Button>
            <Button
              onClick={() => {
                deleteData(selectedReview.id);
                closeModal();
              }}
              variant="destructive"
              className="w-[50%]"
            >
              {t("Reviews.modal.yes")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
