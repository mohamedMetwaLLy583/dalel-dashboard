"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useAboutHook } from "./hooks/useAboutHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function About() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const t = useTranslations();

  const { data, EditData, loading } = useAboutHook();

  const [imagePreview, setImagePreview] = useState(null);
  const [secondImagePreview, setSecondImagePreview] = useState(null);

  const img = watch("image_one");
  const secondImg = watch("image_two");

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

    if (secondImg && secondImg.length > 0) {
      const file = secondImg[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSecondImagePreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, [img, secondImg]);

  const onSubmit = (values) => {
    EditData(values);
  };

  useEffect(() => {
    reset({
      description_one_ar: data?.description_one_ar,
      description_one_en: data?.description_one_en,
      description_two_en: data?.description_two_en,
      description_two_ar: data?.description_two_ar,
      description_three_ar: data?.description_three_ar,
      description_three_en: data?.description_three_en,
    });
    setImagePreview(data?.image_one);
    setSecondImagePreview(data?.image_two);
  }, [data]);

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("About.title")}
      </div>
      <div className="form_container w-[90%] md:w-[50%] mx-auto min-h-[50vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols- gap-6">
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="description_one_ar"
                className={`${
                  errors["description_one_ar"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("About.form.description_one_ar")}{" "}
                {errors["description_one_ar"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("About.form.placeholders.description_one_ar")}
                id="description_one_ar"
                rows="3"
                {...register("description_one_ar", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["description_one_ar"]?.type === "minLength" && (
                <Label
                  htmlFor="description_one_ar"
                  className="text-red-600 mt-2"
                >
                  {t("About.errors.description_one_ar")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="description_one_en"
                className={`${
                  errors["description_one_en"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("About.form.description_one_en")}{" "}
                {errors["description_one_en"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("About.form.placeholders.description_one_en")}
                id="description_one_en"
                rows="3"
                {...register("description_one_en", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["description_one_en"]?.type === "minLength" && (
                <Label
                  htmlFor="description_one_en"
                  className="text-red-600 mt-2"
                >
                  {t("About.errors.description_one_en")}
                </Label>
              )}
            </div>
            {/* Description Two */}
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="description_two_ar"
                className={`${
                  errors["description_two_ar"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("About.form.description_two_ar")}{" "}
                {errors["description_two_ar"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("About.form.placeholders.description_two_ar")}
                id="description_two_ar"
                rows="3"
                {...register("description_two_ar", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["description_two_ar"]?.type === "minLength" && (
                <Label
                  htmlFor="description_two_ar"
                  className="text-red-600 mt-2"
                >
                  {t("About.errors.description_two_ar")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="description_two_en"
                className={`${
                  errors["description_two_en"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("About.form.description_two_en")}{" "}
                {errors["description_two_en"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("About.form.placeholders.description_two_en")}
                id="description_two_en"
                rows="3"
                {...register("description_two_en", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["description_two_en"]?.type === "minLength" && (
                <Label
                  htmlFor="description_two_en"
                  className="text-red-600 mt-2"
                >
                  {t("About.errors.description_two_en")}
                </Label>
              )}
            </div>

            {/* Description Three */}
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="description_three_ar"
                className={`${
                  errors["description_three_ar"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("About.form.description_three_ar")}{" "}
                {errors["description_three_ar"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("About.form.placeholders.description_three_ar")}
                id="description_three_ar"
                rows="3"
                {...register("description_three_ar", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["description_three_ar"]?.type === "minLength" && (
                <Label
                  htmlFor="description_three_ar"
                  className="text-red-600 mt-2"
                >
                  {t("About.errors.description_three_ar")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="description_three_en"
                className={`${
                  errors["description_three_en"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("About.form.description_three_en")}{" "}
                {errors["description_three_en"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("About.form.placeholders.description_three_en")}
                id="description_three_en"
                rows="3"
                {...register("description_three_en", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["description_three_en"]?.type === "minLength" && (
                <Label
                  htmlFor="description_three_en"
                  className="text-red-600 mt-2"
                >
                  {t("About.errors.description_three_en")}
                </Label>
              )}
            </div>

            {/* Main Image */}
            <div className="col-span-2  flex flex-col gap-2">
              <Label>{t("Sliders.StoreSliders.firstImage")} </Label>
              <Input type="file" variant="flat" {...register("image_one")} />
            </div>
            {imagePreview && (
              <div className="col-span-2  flex flex-col gap-2">
                <img
                  src={imagePreview}
                  width={100}
                  height={100}
                  className="rounded-md"
                  alt="current_image_one"
                />
              </div>
            )}

            {/* Second Image */}
            <div className="col-span-2 flex flex-col gap-2">
              <Label>{t("Sliders.StoreSliders.secondImage")}</Label>
              <Input type="file" variant="flat" {...register("image_two")} />
            </div>
            {secondImagePreview && (
              <div className="col-span-2 flex flex-col gap-2">
                <img
                  src={secondImagePreview}
                  width={100}
                  height={100}
                  className="rounded-md"
                  alt="current_image_two"
                />
              </div>
            )}

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
                  t("About.update.title")
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
