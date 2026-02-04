"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useRealEstateCategoryHook } from "../hooks/useRealEstateCategoryHook";

export default function StoreRealEstateCategory() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const t = useTranslations();
  const { storeData, loading } = useRealEstateCategoryHook();

  const onSubmit = (values) => {
    storeData(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols- gap-6">
        {/* Titles */}
        <div className="col-span-2 flex flex-col gap-2">
          <Label htmlFor="name_en">
            {t("RealEstateCategory.StoreRealEstateCategory.titleEn")}
          </Label>
          <Input
            type="text"
            placeholder={t(
              "RealEstateCategory.StoreRealEstateCategory.placeholders.titleEn"
            )}
            id="name_en"
            {...register("name_en", { minLength: 3 })}
          />
          {errors["name_en"]?.type === "minLength" && (
            <Label htmlFor="name_en" className="text-red-600 mt-2">
              {t(
                "RealEstateCategory.StoreRealEstateCategory.formErrors.titleMinL"
              )}
            </Label>
          )}
        </div>

        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="name_ar"
            className={`${
              errors["name_ar"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("RealEstateCategory.StoreRealEstateCategory.titleAr")}{" "}
            {errors["name_ar"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t(
              "RealEstateCategory.StoreRealEstateCategory.placeholders.titleAr"
            )}
            id="name_ar"
            {...register("name_ar", { required: true, minLength: 3 })}
          />
          {errors["name_ar"]?.type === "minLength" && (
            <Label htmlFor="name_ar" className="text-red-600 mt-2">
              {t(
                "RealEstateCategory.StoreRealEstateCategory.formErrors.titleMinL"
              )}
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
              t("RealEstateCategory.StoreRealEstateCategory.title")
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
