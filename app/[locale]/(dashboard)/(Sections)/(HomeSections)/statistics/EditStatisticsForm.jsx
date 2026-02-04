"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useStatisticsHook } from "./hooks/useStatisticsHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Textarea } from "@/components/ui/textarea";

export default function EditStatisticsForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const t = useTranslations();

  const { EditData, loading, data } = useStatisticsHook();

  // Setting Current Data to the inputs
  useEffect(() => {
    reset({
      title_en: data?.title_en,
      title_ar: data?.title_ar,
      description_en: data?.description_en,
      description_ar: data?.description_ar,
      happy_clients: parseInt(data?.happy_clients),
      sold_homes: parseInt(data?.sold_homes),
      rented_homes: parseInt(data?.rented_homes),
      reviews: parseInt(data?.reviews),
    });
  }, [data]);

  const onSubmit = (values) => {
    EditData(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols- gap-6">
        {/* Item One */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="title_en"
            className={`${
              errors["title_en"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Statistics.StoreStatistics.titleOneEn")}{" "}
            {errors["title_en"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t(
              "Statistics.StoreStatistics.placeholders.titleOneEn"
            )}
            id="title_en"
            {...register("title_en", { required: true, minLength: 3 })}
          />
          {errors["title_en"]?.type === "minLength" && (
            <Label htmlFor="title_en" className="text-red-600 mt-2">
              {t("Statistics.StoreStatistics.formErrors.titleMinL")}
            </Label>
          )}
        </div>
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="title_ar"
            className={`${
              errors["title_ar"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Statistics.StoreStatistics.titleOneAr")}{" "}
            {errors["title_ar"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t(
              "Statistics.StoreStatistics.placeholders.titleOneAr"
            )}
            id="title_ar"
            {...register("title_ar", { required: true, minLength: 3 })}
          />
          {errors["title_ar"]?.type === "minLength" && (
            <Label htmlFor="title_ar" className="text-red-600 mt-2">
              {t("Statistics.StoreStatistics.formErrors.titleMinL")}
            </Label>
          )}
        </div>
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="happy_clients"
            className={`${
              errors["happy_clients"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Statistics.StoreStatistics.counterOne")}{" "}
            {errors["happy_clients"]?.type === "required" && "*"}
          </Label>
          <Input
            type="number"
            placeholder={t(
              "Statistics.StoreStatistics.placeholders.counterOne"
            )}
            id="happy_clients"
            {...register("happy_clients", { required: true, min: 1 })}
          />
          {errors["happy_clients"]?.type === "minLength" && (
            <Label htmlFor="happy_clients" className="text-red-600 mt-2">
              {t("Statistics.StoreStatistics.formErrors.counterMinL")}
            </Label>
          )}
        </div>
        {/* Item Two */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="sold_homes"
            className={`${
              errors["sold_homes"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Statistics.StoreStatistics.counterTwo")}{" "}
            {errors["sold_homes"]?.type === "required" && "*"}
          </Label>
          <Input
            type="number"
            placeholder={t(
              "Statistics.StoreStatistics.placeholders.counterTwo"
            )}
            id="sold_homes"
            {...register("sold_homes", { required: true, min: 1 })}
          />
          {errors["sold_homes"]?.type === "minLength" && (
            <Label htmlFor="sold_homes" className="text-red-600 mt-2">
              {t("Statistics.StoreStatistics.formErrors.counterMinL")}
            </Label>
          )}
        </div>

        {/* Item Three */}

        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="rented_homes"
            className={`${
              errors["rented_homes"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Statistics.StoreStatistics.counterThree")}{" "}
            {errors["rented_homes"]?.type === "required" && "*"}
          </Label>
          <Input
            type="number"
            placeholder={t(
              "Statistics.StoreStatistics.placeholders.counterThree"
            )}
            id="rented_homes"
            {...register("rented_homes", { required: true, min: 1 })}
          />
          {errors["rented_homes"]?.type === "minLength" && (
            <Label htmlFor="rented_homes" className="text-red-600 mt-2">
              {t("Statistics.StoreStatistics.formErrors.counterMinL")}
            </Label>
          )}
        </div>

        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="reviews"
            className={`${
              errors["reviews"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Statistics.StoreStatistics.counterFour")}{" "}
            {errors["reviews"]?.type === "required" && "*"}
          </Label>
          <Input
            type="number"
            placeholder={t(
              "Statistics.StoreStatistics.placeholders.counterFour"
            )}
            id="reviews"
            {...register("reviews", { required: true, min: 1 })}
          />
          {errors["reviews"]?.type === "minLength" && (
            <Label htmlFor="reviews" className="text-red-600 mt-2">
              {t("Statistics.StoreStatistics.formErrors.counterMinL")}
            </Label>
          )}
        </div>

        {/* Descriptions */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="description_en"
            className={`${
              errors["description_en"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Statistics.StoreStatistics.description_en")}{" "}
            {errors["description_en"]?.type === "required" && "*"}
          </Label>
          <Textarea
            placeholder={t(
              "Statistics.StoreStatistics.placeholders.description_en"
            )}
            id="description_en"
            rows="3"
            {...register("description_en", { required: true, minLength: 3 })}
          />
          {errors["description_en"]?.type === "minLength" && (
            <Label htmlFor="description_en" className="text-red-600 mt-2">
              {t("Statistics.StoreStatistics.formErrors.descMinL")}
            </Label>
          )}
        </div>
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="description_ar"
            className={`${
              errors["description_ar"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Statistics.StoreStatistics.description_ar")}{" "}
            {errors["description_ar"]?.type === "required" && "*"}
          </Label>

          <Textarea
            placeholder={t(
              "Statistics.StoreStatistics.placeholders.description_ar"
            )}
            id="description_ar"
            rows="3"
            {...register("description_ar", { required: true, minLength: 3 })}
          />
          {errors["description_ar"]?.type === "minLength" && (
            <Label htmlFor="description_ar" className="text-red-600 mt-2">
              {t("Statistics.StoreStatistics.formErrors.descMinL")}
            </Label>
          )}
        </div>
        {/* Submit */}
        <div className="col-span-2">
          <Button type="submit" className="min-w-[115px]">
            {loading ? (
              <div>
                <CircularProgress
                  value="50"
                  color="dark"
                  loading
                  size="xs"
                  className="w-8 h-8"
                />
              </div>
            ) : (
              t("Statistics.EditStatistics.title")
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
