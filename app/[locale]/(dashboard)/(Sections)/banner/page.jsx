"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBannerHook } from "./hooks/useBannerHook";

export default function About() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const t = useTranslations();

  const { data, EditData, loading } = useBannerHook();

  const [logoPreview, setLogoPreview] = useState(null);

  const logo = watch("logo");

  useEffect(() => {
    if (logo && logo.length > 0) {
      const file = logo[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, [logo]);

  const onSubmit = (values) => {
    EditData(values);
  };

  useEffect(() => {
    reset({
      about_us_title_ar: data?.about_us_title_ar,
      about_us_title_en: data?.about_us_title_en,
      about_us_desc_ar: data?.about_us_desc_ar,
      about_us_desc_en: data?.about_us_desc_en,

      contact_us_title_ar: data?.contact_us_title_ar,
      contact_us_title_en: data?.contact_us_title_en,
      contact_us_desc_ar: data?.contact_us_desc_ar,
      contact_us_desc_en: data?.contact_us_desc_en,
    });
  }, [data]);

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Banner.title")}
      </div>
      <div className="form_container w-[90%] md:w-[50%] mx-auto min-h-[50vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols- gap-6">
            {/* About Us */}
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="about_us_title_en"
                className={`${
                  errors["about_us_title_en"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Banner.StoreBanner.about_us_title_en")}{" "}
                {errors["about_us_title_en"]?.type === "required" && "*"}
              </Label>
              <Input
                type="text"
                placeholder={t(
                  "Banner.StoreBanner.placeholders.about_us_title_en"
                )}
                id="about_us_title_en"
                {...register("about_us_title_en", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["about_us_title_en"]?.type === "minLength" && (
                <Label
                  htmlFor="about_us_title_en"
                  className="text-red-600 mt-2"
                >
                  {t("Banner.StoreBanner.formErrors.titleMinL")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="about_us_title_ar"
                className={`${
                  errors["about_us_title_ar"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Banner.StoreBanner.about_us_title_ar")}{" "}
                {errors["about_us_title_ar"]?.type === "required" && "*"}
              </Label>
              <Input
                type="text"
                placeholder={t(
                  "Banner.StoreBanner.placeholders.about_us_title_ar"
                )}
                id="about_us_title_ar"
                {...register("about_us_title_ar", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["about_us_title_ar"]?.type === "minLength" && (
                <Label
                  htmlFor="about_us_title_ar"
                  className="text-red-600 mt-2"
                >
                  {t("Banner.StoreBanner.formErrors.titleMinL")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="about_us_desc_ar"
                className={`${
                  errors["about_us_desc_ar"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Banner.form.about_us_desc_ar")}{" "}
                {errors["about_us_desc_ar"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("Banner.form.placeholders.about_us_desc_ar")}
                id="about_us_desc_ar"
                rows="3"
                {...register("about_us_desc_ar", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["about_us_desc_ar"]?.type === "minLength" && (
                <Label htmlFor="about_us_desc_ar" className="text-red-600 mt-2">
                  {t("Banner.errors.about_us_desc_ar")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="about_us_desc_en"
                className={`${
                  errors["about_us_desc_en"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Banner.form.about_us_desc_en")}{" "}
                {errors["about_us_desc_en"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("Banner.form.placeholders.about_us_desc_en")}
                id="about_us_desc_en"
                rows="3"
                {...register("about_us_desc_en", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["about_us_desc_en"]?.type === "minLength" && (
                <Label htmlFor="about_us_desc_en" className="text-red-600 mt-2">
                  {t("Banner.errors.about_us_desc_en")}
                </Label>
              )}
            </div>

            {/* contact us */}

            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="contact_us_title_en"
                className={`${
                  errors["contact_us_title_en"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Banner.StoreBanner.contact_us_title_en")}{" "}
                {errors["contact_us_title_en"]?.type === "required" && "*"}
              </Label>
              <Input
                type="text"
                placeholder={t(
                  "Banner.StoreBanner.placeholders.contact_us_title_en"
                )}
                id="contact_us_title_en"
                {...register("contact_us_title_en", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["contact_us_title_en"]?.type === "minLength" && (
                <Label
                  htmlFor="contact_us_title_en"
                  className="text-red-600 mt-2"
                >
                  {t("Banner.StoreBanner.formErrors.titleMinL")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="contact_us_title_ar"
                className={`${
                  errors["contact_us_title_ar"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Banner.StoreBanner.contact_us_title_ar")}{" "}
                {errors["contact_us_title_ar"]?.type === "required" && "*"}
              </Label>
              <Input
                type="text"
                placeholder={t(
                  "Banner.StoreBanner.placeholders.contact_us_title_ar"
                )}
                id="contact_us_title_ar"
                {...register("contact_us_title_ar", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["contact_us_title_ar"]?.type === "minLength" && (
                <Label
                  htmlFor="contact_us_title_ar"
                  className="text-red-600 mt-2"
                >
                  {t("Banner.StoreBanner.formErrors.titleMinL")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="contact_us_desc_ar"
                className={`${
                  errors["contact_us_desc_ar"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Banner.form.contact_us_desc_ar")}{" "}
                {errors["contact_us_desc_ar"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("Banner.form.placeholders.contact_us_desc_ar")}
                id="contact_us_desc_ar"
                rows="3"
                {...register("contact_us_desc_ar", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["contact_us_desc_ar"]?.type === "minLength" && (
                <Label
                  htmlFor="contact_us_desc_ar"
                  className="text-red-600 mt-2"
                >
                  {t("Banner.errors.contact_us_desc_ar")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="contact_us_desc_en"
                className={`${
                  errors["contact_us_desc_en"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Banner.form.contact_us_desc_en")}{" "}
                {errors["contact_us_desc_en"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("Banner.form.placeholders.contact_us_desc_en")}
                id="contact_us_desc_en"
                rows="3"
                {...register("contact_us_desc_en", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["contact_us_desc_en"]?.type === "minLength" && (
                <Label
                  htmlFor="contact_us_desc_en"
                  className="text-red-600 mt-2"
                >
                  {t("Banner.errors.contact_us_desc_en")}
                </Label>
              )}
            </div>

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
                  t("Banner.update.title")
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
