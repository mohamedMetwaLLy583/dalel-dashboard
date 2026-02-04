"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const PersonalDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(true);
  const t = useTranslations();

  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "skip-browser-warning",
            },
          }
        );
        const data = await response.json();
        reset({
          name: data.data.name,
          phone: data.data.phone,
          email: data.data.email,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [reset]);

  const onSubmit = async (values) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/change-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        toast.success(t("userSettings.userPersonalDetails.success"), {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(t("userSettings.userPersonalDetails.failed"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="rounded-t-none pt-6">
        <CardContent>
          <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="firstName" className="mb-2">
                {t("userSettings.userPersonalDetails.name")}
              </Label>
              <Input
                id="firstName"
                {...register("name", {
                  required: t(
                    "userSettings.userPersonalDetails.validation.nameReq"
                  ),
                  minLength: {
                    value: 3,
                    message: t(
                      "userSettings.userPersonalDetails.validation.nameMin"
                    ),
                  },
                })}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-red-600 text-[12px]">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="phoneNumber" className="mb-2">
                {t("userSettings.userPersonalDetails.phone")}
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                {...register("phone", {
                  required: t(
                    "userSettings.userPersonalDetails.validation.phoneReq"
                  ),
                  pattern: {
                    value: /^[0-9]{10,}$/,
                    message: t(
                      "userSettings.userPersonalDetails.validation.phoneMin"
                    ),
                  },
                })}
                disabled={loading}
              />
              {errors.phone && (
                <p className="text-red-600 text-[12px]">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="email" className="mb-2">
                {t("userSettings.userPersonalDetails.mail")}
              </Label>
              <Input
                id="email"
                {...register("email", {
                  required: t(
                    "userSettings.userPersonalDetails.validation.mailReq"
                  ),
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: t(
                      "userSettings.userPersonalDetails.validation.mailValid"
                    ),
                  },
                })}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-600 text-[12px]">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                router.push(`/${t("locale")}`);
              }}
              disabled={loading}
            >
              {t("userSettings.userPersonalDetails.cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {t("userSettings.userPersonalDetails.save")}
            </Button>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </form>
  );
};

export default PersonalDetails;
