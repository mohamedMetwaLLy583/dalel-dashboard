"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useBlockedNumbersHook } from "../hooks/useBlockedNumbersHook";

export default function StoreBlockedNumbersForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const t = useTranslations();
  const { storeData, loading } = useBlockedNumbersHook();

  const onSubmit = (values) => {
    storeData(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols- gap-6">
        {/* Number */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="phone"
            className={`${
              errors["phone"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("BlockedNumbers.StoreBlockedNumbers.title")}{" "}
            {errors["phone"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t(
              "BlockedNumbers.StoreBlockedNumbers.placeholders.title"
            )}
            id="phone"
            {...register("phone", { required: true, minLength: 3 })}
          />
          {errors["phone"]?.type === "minLength" && (
            <Label htmlFor="phone" className="text-red-600 mt-2">
              {t("BlockedNumbers.StoreBlockedNumbers.formErrors.titleMinL")}
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
              t("BlockedNumbers.StoreBlockedNumbers.title")
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
