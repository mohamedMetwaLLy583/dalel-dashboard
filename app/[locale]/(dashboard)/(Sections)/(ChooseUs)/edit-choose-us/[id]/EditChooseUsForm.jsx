"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChooseUsHook } from "../../hooks/useChooseUsHook";

export default function EditChooseUsForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const t = useTranslations();
  const { id } = useParams();

  const { EditData, loading, currentData, getCurrentData } = useChooseUsHook();

  const [imagePreview, setImagePreview] = useState(null);

  const img = watch("image");

  // Handling Image Preview
  useEffect(() => {
    if (img && img.length > 0) {
      const file = img[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, [img]);

  // Getting Current Choose Us Data
  useEffect(() => {
    getCurrentData(id);
  }, []);

  // Setting Current Data to the inputs
  useEffect(() => {
    reset({
      title_en: currentData?.title_en,
      title_ar: currentData?.title_ar,
      description_en: currentData?.description_en,
      description_ar: currentData?.description_ar,
    });
    setImagePreview(currentData?.image);
  }, [currentData]);

  const onSubmit = (values) => {
    EditData(id, values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols- gap-6">
        {/* Titles */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="title_en"
            className={`${
              errors["title_en"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("ChooseUs.StoreChooseUs.titleEn")}{" "}
            {errors["title_en"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t("ChooseUs.StoreChooseUs.placeholders.titleEn")}
            id="title_en"
            {...register("title_en", { required: true, minLength: 3 })}
          />
          {errors["title_en"]?.type === "minLength" && (
            <Label htmlFor="title_en" className="text-red-600 mt-2">
              {t("ChooseUs.StoreChooseUs.formErrors.titleMinL")}
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
            {t("ChooseUs.StoreChooseUs.titleAr")}{" "}
            {errors["title_ar"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t("ChooseUs.StoreChooseUs.placeholders.titleAr")}
            id="title_ar"
            {...register("title_ar", { required: true, minLength: 3 })}
          />
          {errors["title_ar"]?.type === "minLength" && (
            <Label htmlFor="title_ar" className="text-red-600 mt-2">
              {t("ChooseUs.StoreChooseUs.formErrors.titleMinL")}
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
            {t("ChooseUs.StoreChooseUs.descEn")}{" "}
            {errors["description_en"]?.type === "required" && "*"}
          </Label>
          <Textarea
            placeholder={t("ChooseUs.StoreChooseUs.placeholders.descEn")}
            id="description_en"
            rows="3"
            {...register("description_en", { required: true, minLength: 3 })}
          />
          {errors["description_en"]?.type === "minLength" && (
            <Label htmlFor="description_en" className="text-red-600 mt-2">
              {t("ChooseUs.StoreChooseUs.formErrors.descMinL")}
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
            {t("ChooseUs.StoreChooseUs.descAr")}{" "}
            {errors["description_ar"]?.type === "required" && "*"}
          </Label>

          <Textarea
            placeholder={t("ChooseUs.StoreChooseUs.placeholders.descAr")}
            id="description_ar"
            rows="3"
            {...register("description_ar", { required: true, minLength: 3 })}
          />
          {errors["description_ar"]?.type === "minLength" && (
            <Label htmlFor="description_ar" className="text-red-600 mt-2">
              {t("ChooseUs.StoreChooseUs.formErrors.descMinL")}
            </Label>
          )}
        </div>

        {/* Main Image */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label>{t("ChooseUs.StoreChooseUs.image")} </Label>
          <Input type="file" variant="flat" {...register("image")} />
        </div>
        {imagePreview && (
          <div className="col-span-2  flex flex-col gap-2">
            <img
              src={imagePreview}
              width={100}
              height={100}
              className="rounded-md"
              alt="current_image"
            />
          </div>
        )}
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
              t("ChooseUs.EditChooseUs.title")
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
