"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSettingsHook } from "./hooks/useSettingsHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const t = useTranslations();

  const { data, EditData, loading } = useSettingsHook();

  const [lightLogoPreview, setLightLogoPreview] = useState(null);
  const [darkLogoPreview, setDarkLogopreview] = useState(null);

  const light_logo = watch("light_logo");
  const dark_logo = watch("dark_logo");

  useEffect(() => {
    if (light_logo && light_logo.length > 0) {
      const file = light_logo[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setLightLogoPreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, [light_logo]);

  useEffect(() => {
    if (dark_logo && dark_logo.length > 0) {
      const file = dark_logo[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setDarkLogopreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, [dark_logo]);

  const onSubmit = (values) => {
    // console.log("This is data", values);
    EditData(values);
  };

  useEffect(() => {
    reset({
      primary_phone: data?.primary_phone,
      secondary_phone: data?.secondary_phone,
      email: data?.email,
      facebook: data?.facebook,
      instagram: data?.instagram,
      linkedin: data?.linkedin,
      whatsapp: data?.whatsapp,
      x: data?.x,
      footer_description_en: data?.footer_description_en,
      footer_description_ar: data?.footer_description_ar,
      address_en: data?.address_en,
      address_ar: data?.address_ar,
    });
  }, [data]);

  return (
    <section className="py-6">
      <div className="text-2xl font-medium text-default-800 py-8">
        {t("Settings.title")}
      </div>
      <div className="form_container w-[90%] md:w-[50%] mx-auto min-h-[50vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols- gap-6">
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="primary_phone">
                {t("Settings.form.primary_phone")}{" "}
                {errors["primary_phone"]?.type === "required" && "*"}
              </Label>
              <Input
                type="text"
                placeholder={t("Settings.form.placeholders.primary_phone")}
                id="primary_phone"
                {...register("primary_phone", {
                  validate: (value) =>
                    value === "" ||
                    value.length >= 5 ||
                    t("Settings.errors.primary_phone"),
                })}
              />
              {errors["primary_phone"]?.type === "validate" && (
                <Label htmlFor="primary_phone" className="text-red-600 mt-2">
                  {errors["primary_phone"].message}
                </Label>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="secondary_phone">
                {t("Settings.form.secondary_phone")}{" "}
                {errors["secondary_phone"]?.type === "required" && "*"}
              </Label>
              <Input
                type="text"
                placeholder={t("Settings.form.placeholders.secondary_phone")}
                id="secondary_phone"
                {...register("secondary_phone", {
                  validate: (value) =>
                    value === "" ||
                    value.length >= 5 ||
                    t("Settings.errors.secondary_phone"),
                })}
              />
              {errors["secondary_phone"]?.type === "validate" && (
                <Label htmlFor="secondary_phone" className="text-red-600 mt-2">
                  {errors["secondary_phone"].message}
                </Label>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label
                htmlFor="email"
                className={`${errors["email"] && "text-red-600"}`}
              >
                {t("Settings.form.email")}
              </Label>
              <Input
                type="email"
                placeholder={t("Settings.form.placeholders.email")}
                id="email"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    message: t("Settings.errors.email"),
                  },
                })}
              />
              {errors["email"] && (
                <Label htmlFor="email" className="text-red-600 mt-2">
                  {errors["email"].message}
                </Label>
              )}
            </div>

            <div className="col-span-2  flex flex-col gap-2">
              <Label htmlFor="address_en">{t("Settings.form.address")} </Label>
              <Input
                type="text"
                placeholder={t("Settings.form.placeholders.address")}
                id="address_en"
                {...register("address_en", {
                  minLength: 3,
                })}
              />
              {errors["address_en"]?.type === "minLength" && (
                <Label htmlFor="address_en" className="text-red-600 mt-2">
                  {t("Settings.errors.address")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="address_ar"
                className={`${
                  errors["address_ar"]?.type === "required" && "text-red-600"
                }`}
              >
                {t("Settings.form.address_ar")}{" "}
                {errors["address_ar"]?.type === "required" && "*"}
              </Label>
              <Input
                type="text"
                placeholder={t("Settings.form.placeholders.address_ar")}
                id="address_ar"
                {...register("address_ar", {
                  minLength: 3,
                })}
              />
              {errors["address_ar"]?.type === "minLength" && (
                <Label htmlFor="address_ar" className="text-red-600 mt-2">
                  {t("Settings.errors.address_ar")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label htmlFor="facebook">{t("Settings.form.facebook")} </Label>
              <Input
                type="text"
                placeholder={t("Settings.form.placeholders.facebook")}
                id="facebook"
                {...register("facebook", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[a-zA-Z0-9._~:\/?#@!$&'()*+,;=%-]*)?$/i,
                    message: t("Settings.errors.facebook"),
                  },
                })}
              />
              {errors["facebook"]?.type === "minLength" && (
                <Label htmlFor="facebook" className="text-red-600 mt-2">
                  {t("Settings.errors.facebook")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label htmlFor="instagram">{t("Settings.form.instagram")} </Label>
              <Input
                type="text"
                placeholder={t("Settings.form.placeholders.instagram")}
                id="instagram"
                {...register("instagram", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[a-zA-Z0-9._~:\/?#@!$&'()*+,;=%-]*)?$/i,
                    message: t("Settings.errors.instagram"),
                  },
                })}
              />
              {errors["instagram"]?.type === "minLength" && (
                <Label htmlFor="instagram" className="text-red-600 mt-2">
                  {t("Settings.errors.instagram")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label htmlFor="linkedin">{t("Settings.form.linkedin")} </Label>
              <Input
                type="text"
                placeholder={t("Settings.form.placeholders.linkedin")}
                id="linkedin"
                {...register("linkedin", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[a-zA-Z0-9._~:\/?#@!$&'()*+,;=%-]*)?$/i,
                    message: t("Settings.errors.linkedin"),
                  },
                })}
              />
              {errors["linkedin"]?.type === "minLength" && (
                <Label htmlFor="linkedin" className="text-red-600 mt-2">
                  {t("Settings.errors.linkedin")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label htmlFor="x">{t("Settings.form.x")} </Label>
              <Input
                type="text"
                placeholder={t("Settings.form.placeholders.x")}
                id="x"
                {...register("x", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[a-zA-Z0-9._~:\/?#@!$&'()*+,;=%-]*)?$/i,
                    message: t("Settings.errors.x"),
                  },
                })}
              />
              {errors["x"]?.type === "minLength" && (
                <Label htmlFor="x" className="text-red-600 mt-2">
                  {t("Settings.errors.x")}
                </Label>
              )}
            </div>

            <div className="col-span-2  flex flex-col gap-2">
              <Label htmlFor="whatsapp">{t("Settings.form.whatsapp")} </Label>
              <Input
                type="text"
                placeholder={t("Settings.form.placeholders.whatsapp")}
                id="whatsapp"
                {...register("whatsapp", { minLength: 5 })}
              />
              {errors["whatsapp"]?.type === "minLength" && (
                <Label htmlFor="whatsapp" className="text-red-600 mt-2">
                  {t("Settings.errors.whatsapp")}
                </Label>
              )}
            </div>

            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="footer_description_en"
                className={`${
                  errors["footer_description_en"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Settings.form.footer_description")}{" "}
              </Label>
              <Textarea
                placeholder={t("Settings.form.placeholders.footer_description")}
                id="footer_description_en"
                rows="3"
                {...register("footer_description_en", {
                  minLength: 3,
                })}
              />
              {errors["footer_description_en"]?.type === "minLength" && (
                <Label
                  htmlFor="footer_description_en"
                  className="text-red-600 mt-2"
                >
                  {t("Settings.errors.footer_description")}
                </Label>
              )}
            </div>
            <div className="col-span-2  flex flex-col gap-2">
              <Label
                htmlFor="footer_description_ar"
                className={`${
                  errors["footer_description_ar"]?.type === "required" &&
                  "text-red-600"
                }`}
              >
                {t("Settings.form.footer_description_ar")}{" "}
                {errors["footer_description_ar"]?.type === "required" && "*"}
              </Label>
              <Textarea
                placeholder={t(
                  "Settings.form.placeholders.footer_description_ar"
                )}
                id="footer_description_ar"
                rows="3"
                {...register("footer_description_ar", {
                  minLength: 3,
                })}
              />
              {errors["footer_description_ar"]?.type === "minLength" && (
                <Label
                  htmlFor="footer_description_ar"
                  className="text-red-600 mt-2"
                >
                  {t("Settings.errors.footer_description_ar")}
                </Label>
              )}
            </div>
            {/* light logo */}

            <div className="col-span-2  flex flex-col gap-2">
              <Label>{t("Settings.form.light_logo")}</Label>
              <Input type="file" variant="flat" {...register("light_logo")} />
            </div>

            {
              <div className="col-span-2  flex flex-col gap-2">
                <img
                  src={
                    lightLogoPreview ||
                    data?.light_logo ||
                    "/images/placeholder.jpg"
                  }
                  width={100}
                  height={100}
                  className="rounded-md"
                  alt="current_image"
                />
              </div>
            }
            {/* dark logo */}

            <div className="col-span-2  flex flex-col gap-2">
              <Label>{t("Settings.form.dark_logo")}</Label>
              <Input type="file" variant="flat" {...register("dark_logo")} />
            </div>

            {
              <div className="col-span-2  flex flex-col gap-2">
                <img
                  src={
                    darkLogoPreview ||
                    data?.dark_logo ||
                    "/images/placeholder.jpg"
                  }
                  width={100}
                  height={100}
                  className="rounded-md"
                  alt="current_image"
                />
              </div>
            }

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
                  t("Settings.update.title")
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
