"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useAboutSeoHook } from "./hooks/useAboutSeoHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

export default function EditAboutSeoForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const t = useTranslations();

  const { data, loading, EditData } = useAboutSeoHook();

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

  // Setting Current Data to the inputs
  useEffect(() => {
    reset({
      "title:en": data?.data.en.title,
      "title:ar": data?.data.ar.title,
      "description:en": data?.data.en.description,
      "description:ar": data?.data.ar.description,
      "keyword:en": data?.data.en.keyword,
      "keyword:ar": data?.data.ar.keyword,
    });
  }, [data]);

  const onSubmit = (values) => {
    EditData(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols- gap-6">
        {/* Titles */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="title:en"
            className={`${
              errors["title:en"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("SEO.Home.form.titleEn")}{" "}
            {errors["title:en"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t("SEO.Home.form.placeholders.titleEn")}
            id="title:en"
            {...register("title:en", { required: true, minLength: 3 })}
          />
          {errors["title:en"]?.type === "minLength" && (
            <Label htmlFor="title:en" className="text-red-600 mt-2">
              {t("SEO.Home.form.formErrors.titleMinL")}
            </Label>
          )}
        </div>
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="title:ar"
            className={`${
              errors["title:ar"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("SEO.Home.form.titleAr")}{" "}
            {errors["title:ar"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t("SEO.Home.form.placeholders.titleAr")}
            id="title:ar"
            {...register("title:ar", { required: true, minLength: 3 })}
          />
          {errors["title:ar"]?.type === "minLength" && (
            <Label htmlFor="title:ar" className="text-red-600 mt-2">
              {t("SEO.Home.form.formErrors.titleMinL")}
            </Label>
          )}
        </div>
        {/* Descriptions */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="description:en"
            className={`${
              errors["description:en"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("SEO.Home.form.descEn")}{" "}
            {errors["description:en"]?.type === "required" && "*"}
          </Label>
          <Textarea
            placeholder={t("SEO.Home.form.placeholders.descEn")}
            id="description:en"
            rows="3"
            {...register("description:en", { required: true, minLength: 3 })}
          />
          {errors["description:en"]?.type === "minLength" && (
            <Label htmlFor="description:en" className="text-red-600 mt-2">
              {t("SEO.Home.form.formErrors.descMinL")}
            </Label>
          )}
        </div>
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="description:ar"
            className={`${
              errors["description:ar"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("SEO.Home.form.descAr")}{" "}
            {errors["description:ar"]?.type === "required" && "*"}
          </Label>

          <Textarea
            placeholder={t("SEO.Home.form.placeholders.descAr")}
            id="description:ar"
            rows="3"
            {...register("description:ar", { required: true, minLength: 3 })}
          />
          {errors["description:ar"]?.type === "minLength" && (
            <Label htmlFor="description:ar" className="text-red-600 mt-2">
              {t("SEO.Home.form.formErrors.descMinL")}
            </Label>
          )}
        </div>
        {/* Keywords */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="keyword:en"
            className={`${
              errors["keyword:en"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("SEO.Home.form.keywordsEn")}{" "}
            {errors["keyword:en"]?.type === "required" && "*"}
          </Label>
          <Textarea
            placeholder={t("SEO.Home.form.placeholders.keywordsEn")}
            id="keyword:en"
            rows="3"
            {...register("keyword:en", { required: true, minLength: 3 })}
          />
          {errors["keyword:en"]?.type === "minLength" && (
            <Label htmlFor="keyword:en" className="text-red-600 mt-2">
              {t("SEO.Home.form.formErrors.keywordsMinL")}
            </Label>
          )}
        </div>
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="keyword:ar"
            className={`${
              errors["keyword:ar"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("SEO.Home.form.keywordsAr")}{" "}
            {errors["keyword:ar"]?.type === "required" && "*"}
          </Label>

          <Textarea
            placeholder={t("SEO.Home.form.placeholders.keywordsAr")}
            id="keyword:ar"
            rows="3"
            {...register("keyword:ar", { required: true, minLength: 3 })}
          />
          <Label htmlFor="warning" className="text-default-600 my-2">
            {t("SEO.Home.form.warning")}{" "}
          </Label>
          {errors["keyword:ar"]?.type === "minLength" && (
            <Label htmlFor="keyword:ar" className="text-red-600 mt-2">
              {t("SEO.Home.form.formErrors.keywordsMinL")}
            </Label>
          )}
        </div>

        {/* Open Graph Image */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label>{t("SEO.Home.form.image")} </Label>
          <Input type="file" variant="flat" {...register("image")} />
        </div>
        {
          <div className="col-span-2  flex flex-col gap-2">
            <img
              src={imagePreview || data?.image || "/images/placeholder.jpg"}
              width={100}
              height={100}
              className="rounded-md"
              alt="current_image"
            />
          </div>
        }

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
              t("SEO.Home.form.SEOEdit")
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
