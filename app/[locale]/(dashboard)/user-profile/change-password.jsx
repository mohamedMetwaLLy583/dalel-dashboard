"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useToken } from "@/provider/auth.provider";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [currentPasswordType, setCurrentPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const t = useTranslations();
  const router = useRouter();
  const token = useToken();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm();

  const newPassword = watch("newPassword") || "";

  const passwordCriteria = {
    length: newPassword.length >= 8,
    lowercase: /[a-z]/.test(newPassword),
    specialChar: /[\d\W\s]/.test(newPassword),
  };

  const onSubmit = async (data) => {
    clearErrors();

    try {
      const response = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            current_password: data.currentPassword,
            password: data.newPassword,
            password_confirmation: data.confirmPassword,
          }),
        }
      );

      if (response.ok) {
        toast.success(t("userSettings.changePass.success"), {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (response.status === 400) {
        const result = await response.json();
        if (result.message === "wrong password") {
          setError("currentPassword", {
            type: "manual",
            message: t("userSettings.changePass.validation.incorrectPassword"),
          });
          toast.error(
            t("userSettings.changePass.validation.incorrectPassword"),
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        }
      }
    } catch (error) {
    }
  };

  const collectErrors = () => {
    let allErrors = [];
    if (errors.currentPassword) {
      allErrors.push(errors.currentPassword.message);
    }
    if (errors.newPassword) {
      allErrors.push(errors.newPassword.message);
    }
    if (errors.confirmPassword) {
      allErrors.push(errors.confirmPassword.message);
    }
    return allErrors;
  };

  return (
    <Card className="rounded-t-none pt-6">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
            <div className="col-span-12 md:col-span-6">
              <Label
                htmlFor="currentPassword"
                className="mb-2 text-default-800"
              >
                {t("userSettings.changePass.currentPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={currentPasswordType}
                  {...register("currentPassword", {
                    required: t(
                      "userSettings.changePass.validation.curentRequired"
                    ),
                  })}
                  className={`${cn(
                    errors.currentPassword && "border-red-500"
                  )} px-[35px]`}
                />
                <Eye
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer",
                    currentPasswordType === "text" && "hidden"
                  )}
                  onClick={() => setCurrentPasswordType("text")}
                />
                <EyeOff
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer",
                    currentPasswordType === "password" && "hidden"
                  )}
                  onClick={() => setCurrentPasswordType("password")}
                />
              </div>
            </div>

            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="newPassword" className="mb-2 text-default-800">
                {t("userSettings.changePass.newPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={newPasswordType}
                  {...register("newPassword", {
                    required: t(
                      "userSettings.changePass.validation.newPassRequired"
                    ),
                    validate: {
                      length: (value) =>
                        value.length >= 8 ||
                        t("userSettings.changePass.validation.minimum"),
                      lowercase: (value) =>
                        /[a-z]/.test(value) ||
                        t("userSettings.changePass.validation.lowercase"),
                      specialChar: (value) =>
                        /[\d\W\s]/.test(value) ||
                        t("userSettings.changePass.validation.symbol"),
                    },
                  })}
                  className={`${cn(
                    errors.newPassword && "border-red-500"
                  )} px-[35px]`}
                />
                <Eye
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer",
                    newPasswordType === "text" && "hidden"
                  )}
                  onClick={() => setNewPasswordType("text")}
                />
                <EyeOff
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer",
                    newPasswordType === "password" && "hidden"
                  )}
                  onClick={() => setNewPasswordType("password")}
                />
              </div>
            </div>

            <div className="col-span-12 md:col-span-6">
              <Label
                htmlFor="confirmPassword"
                className="mb-2 text-default-800"
              >
                {t("userSettings.changePass.confirmPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={confirmPasswordType}
                  {...register("confirmPassword", {
                    required: t(
                      "userSettings.changePass.validation.confirmPassRequired"
                    ),
                    validate: (value) =>
                      value === newPassword ||
                      t("userSettings.changePass.validation.matchPass"),
                  })}
                  className={`${cn(
                    errors.confirmPassword && "border-red-500"
                  )} px-[35px]`}
                />
                <Eye
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer",
                    confirmPasswordType === "text" && "hidden"
                  )}
                  onClick={() => setConfirmPasswordType("text")}
                />
                <EyeOff
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 text-default-500 w-4 h-4 cursor-pointer",
                    confirmPasswordType === "password" && "hidden"
                  )}
                  onClick={() => setConfirmPasswordType("password")}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 text-sm font-medium text-default-800">
            {t("userSettings.changePass.passwordRequirements")}:
          </div>
          <div className="mt-3 space-y-1.5">
            {[
              t("userSettings.changePass.validation.minimum"),
              t("userSettings.changePass.validation.lowercase"),
              t("userSettings.changePass.validation.symbol"),
            ].map((item, index) => (
              <div
                className="flex items-center gap-1.5"
                key={`requirement-${index}`}
              >
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    passwordCriteria[
                      index === 0
                        ? "length"
                        : index === 1
                        ? "lowercase"
                        : "specialChar"
                    ]
                      ? "bg-green-500"
                      : "bg-red-500"
                  )}
                ></div>
                <div
                  className={cn(
                    "text-xs",
                    passwordCriteria[
                      index === 0
                        ? "length"
                        : index === 1
                        ? "lowercase"
                        : "specialChar"
                    ]
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>

          {collectErrors().length > 0 && (
            <div className="mt-5 text-xs text-red-600 space-y-1">
              {collectErrors().map((error, index) => (
                <p key={index}>• {error}</p>
              ))}
            </div>
          )}

          <div className="mt-6 flex gap-5 justify-end">
            <Button
              type="button"
              color="secondary"
              onClick={() => router.push(`/${t("locale")}`)}
            >
              {t("userSettings.changePass.cancel")}
            </Button>
            <Button type="submit">
              {t("userSettings.changePass.changePassword")}
            </Button>
          </div>
        </form>
      </CardContent>
      <ToastContainer />
    </Card>
  );
};

export default ChangePassword;
