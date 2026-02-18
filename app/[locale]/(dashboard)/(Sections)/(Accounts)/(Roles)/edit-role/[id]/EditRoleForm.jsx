"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRolesHook } from "../../hooks/useRolesHook";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

import "react-toastify/dist/ReactToastify.css";

const styles = {
  multiValue: (base, state) => {
    return {
      ...base,
      opacity: state.data.isFixed ? "0.5" : "1",
      backgroundColor: "#f1f1f1", // Adjust the background if needed
      maxWidth: "100px", // Limit the width of each selected item
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  },
  multiValueLabel: (base, state) => {
    return {
      ...base,
      color: state.data.isFixed ? "#626262" : base.color,
      paddingRight: state.data.isFixed ? 6 : base.paddingRight,
    };
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
  control: (base) => ({
    ...base,
    minHeight: "40px", // Adjust the height of the select input
    maxHeight: "120px", // Limit the height when multiple items are selected
    overflowY: "auto", // Add scroll when there are too many selected options
  }),
};

export default function EditRoleForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm();
  const t = useTranslations();
  const { id } = useParams();

  const { EditData, loading, currentData, permissions, getCurrentData } =
    useRolesHook();

  useEffect(() => {
    getCurrentData(id);
  }, []);
  // Setting Current Data to the inputs
  useEffect(() => {
    reset({
      name: currentData?.name,
      translate_display_name_en: currentData?.translate_display_name_en,
      translate_display_name_ar: currentData?.translate_display_name_ar,
      permissions: currentData?.permissions?.map((permission) => ({
        value: permission.id,
        label: permission.display_name_en,
      })),
    });
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
            htmlFor="name"
            className={`${
              errors["name"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Roles.StoreRoles.titleEn")}{" "}
            {errors["name"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t("Roles.StoreRoles.placeholders.titleEn")}
            id="name"
            {...register("name", { required: true, minLength: 3 })}
          />
          {errors["name"]?.type === "minLength" && (
            <Label htmlFor="name" className="text-red-600 mt-2">
              {t("Roles.StoreRoles.formErrors.titleMinL")}
            </Label>
          )}
        </div>
        {/* Display Name */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="translate_display_name_en"
            className={`${
              errors["translate_display_name_en"]?.type === "required" &&
              "text-red-600"
            }`}
          >
            {t("Roles.StoreRoles.d_name")}{" "}
            {errors["translate_display_name_en"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t("Roles.StoreRoles.placeholders.d_name")}
            id="translate_display_name_en"
            {...register("translate_display_name_en", {
              required: true,
              minLength: 3,
            })}
          />
          {errors["translate_display_name_en"]?.type === "minLength" && (
            <Label
              htmlFor="translate_display_name_en"
              className="text-red-600 mt-2"
            >
              {t("Roles.StoreRoles.formErrors.titleMinL")}
            </Label>
          )}
        </div>
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="translate_display_name_ar"
            className={`${
              errors["translate_display_name_ar"]?.type === "required" &&
              "text-red-600"
            }`}
          >
            {t("Roles.StoreRoles.d_name_ar")}{" "}
            {errors["translate_display_name_ar"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t("Roles.StoreRoles.placeholders.d_name_ar")}
            id="translate_display_name_ar"
            {...register("translate_display_name_ar", {
              required: true,
              minLength: 3,
            })}
          />
          {errors["translate_display_name_ar"]?.type === "minLength" && (
            <Label
              htmlFor="translate_display_name_ar"
              className="text-red-600 mt-2"
            >
              {t("Roles.StoreRoles.formErrors.d_name_ar")}
            </Label>
          )}
        </div>

        {/* Permissions */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="permissions"
            className={`${
              errors["permissions"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Roles.StoreRoles.permissions")}{" "}
            {errors["permissions"]?.type === "required" && "*"}
          </Label>

          <Controller
            control={control}
            name="permissions"
            id="permissions"
            rules={{ required: true }}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                inputRef={ref}
                isClearable={true}
                styles={styles}
                value={
                  value && value.length > 0
                    ? value
                    : currentData?.permissions?.map((permission) => ({
                        value: permission.id,
                        label: permission.name,
                      })) || []
                }
                isMulti
                name="permissions"
                options={permissions}
                className="react-select"
                classNamePrefix="select"
                onChange={(val) => onChange(val)}
              />
            )}
          />
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
              t("Roles.EditRoles.title")
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
