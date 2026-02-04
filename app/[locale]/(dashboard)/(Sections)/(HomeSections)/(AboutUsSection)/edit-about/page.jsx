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
import { useAboutSectionHook } from "../hooks/useAboutSectionHook";

export default function About() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const t = useTranslations();

  const { data, EditData, loading } = useAboutSectionHook();

  const onSubmit = (values) => {
    // console.log(values);
    EditData(values);
  };

  useEffect(() => {
    reset({
      description_en: data?.description_en,
      description_ar: data?.description_ar,
      title_en: data?.title_en,
      title_ar: data?.title_ar,
    });
  }, [data]);

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("About.title")}
      </div>
      <div className="form_container w-[90%] md:w-[50%] mx-auto min-h-[50vh]">
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
                {t("About.StoreAbout.title_en")}{" "}
                {errors["title_en"]?.type === "required" && "*"}
              </Label>
              <Input
                type="text"
                placeholder={t("About.StoreAbout.placeholders.title_en")}
                id="title_en"
                {...register("title_en", { required: true, minLength: 3 })}
              />
              {errors["title_en"]?.type === "minLength" && (
                <Label htmlFor="title_en" className="text-red-600 mt-2">
                  {t("About.StoreAbout.formErrors.titleMinL")}
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
                {t("About.StoreAbout.title_ar")}{" "}
                {errors["title_ar"]?.type === "required" && "*"}
              </Label>
              <Input
                type="text"
                placeholder={t("About.StoreAbout.placeholders.title_ar")}
                id="title_ar"
                {...register("title_ar", { required: true, minLength: 3 })}
              />
              {errors["title_ar"]?.type === "minLength" && (
                <Label htmlFor="title_ar" className="text-red-600 mt-2">
                  {t("About.StoreAbout.formErrors.titleMinL")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="description_en"
                className={`${
                  errors["description_en"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("About.form.description_en")}{" "}
                {errors["description_en"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("About.form.placeholders.description_en")}
                id="description_en"
                rows="3"
                {...register("description_en", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["description_en"]?.type === "minLength" && (
                <Label htmlFor="description_en" className="text-red-600 mt-2">
                  {t("About.errors.description_en")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="description_ar"
                className={`${
                  errors["description_ar"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("About.form.description_ar")}{" "}
                {errors["description_ar"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t("About.form.placeholders.description_ar")}
                id="description_ar"
                rows="3"
                {...register("description_ar", {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors["description_ar"]?.type === "minLength" && (
                <Label htmlFor="description_ar" className="text-red-600 mt-2">
                  {t("About.errors.description_ar")}
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
