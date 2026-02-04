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
import { useAdminsHook } from "../../hooks/useAdminsHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

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

export default function EditAdminForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm();
  const t = useTranslations();
  const { id } = useParams();

  const { EditData, loading, currentData, getCurrentData, roles } =
    useAdminsHook();

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

  // Getting Current admin Data
  useEffect(() => {
    getCurrentData(id);
  }, []);

  // Setting Current Data to the inputs
  useEffect(() => {
    reset({
      name: currentData?.name,
      email: currentData?.email,
      phone: currentData?.phone,
      roles: currentData?.roles?.map((role) => ({
        value: role.id,
        label: role.display_name,
      })),
    });
    // console.log(currentData);
    setImagePreview(currentData?.image);
  }, [currentData]);

  const onSubmit = (values) => {
    EditData(id, values);
    // console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols- gap-6">
        {/* Name */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="name"
            className={`${
              errors["name"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Admins.StoreAdmins.name")}{" "}
            {errors["name"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t("Admins.StoreAdmins.placeholders.name")}
            id="name"
            {...register("name", { required: true, minLength: 3 })}
          />
          {errors["name"]?.type === "minLength" && (
            <Label htmlFor="name" className="text-red-600 mt-2">
              {t("Admins.StoreAdmins.formErrors.nameMinL")}
            </Label>
          )}
        </div>
        {/* Email */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="email"
            className={`${
              errors["email"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Admins.StoreAdmins.email")}{" "}
            {errors["email"]?.type === "required" && "*"}
          </Label>
          <Input
            type="email"
            placeholder={t("Admins.StoreAdmins.placeholders.email")}
            id="email"
            {...register("email", { required: true })}
          />
          {errors["email"]?.type === "minLength" && (
            <Label htmlFor="email" className="text-red-600 mt-2">
              {t("Admins.StoreAdmins.formErrors.email")}
            </Label>
          )}
        </div>
        {/* Phone */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="phone"
            className={`${
              errors["phone"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Admins.StoreAdmins.phone")}{" "}
            {errors["phone"]?.type === "required" && "*"}
          </Label>
          <Input
            type="text"
            placeholder={t("Admins.StoreAdmins.placeholders.phone")}
            id="phone"
            {...register("phone", { required: true, minLength: 10 })}
          />
          {errors["phone"]?.type === "minLength" && (
            <Label htmlFor="phone" className="text-red-600 mt-2">
              {t("Admins.StoreAdmins.formErrors.phoneMinL")}
            </Label>
          )}
        </div>

        {/* Roles */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label
            htmlFor="roles"
            className={`${
              errors["roles"]?.type === "required" && "text-red-600"
            }`}
          >
            {t("Admins.StoreAdmins.roles")}{" "}
            {errors["roles"]?.type === "required" && "*"}
          </Label>

          <Controller
            control={control}
            name="roles"
            id="roles"
            rules={{ required: true }}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                inputRef={ref}
                isClearable={true}
                styles={styles}
                isMulti
                value={
                  value && value.length > 0
                    ? value
                    : currentData?.roles?.map((permission) => ({
                        value: permission.id,
                        label: permission.name,
                      })) || []
                }
                name="colors"
                options={roles}
                className="react-select"
                classNamePrefix="select"
                onChange={(val) => onChange(val)}
              />
            )}
          />
        </div>

        {/* Main Image */}
        <div className="col-span-2  flex flex-col gap-2">
          <Label>{t("Admins.StoreAdmins.avatar")} </Label>
          <Input type="file" variant="flat" {...register("image")} />
        </div>
        {imagePreview && (
          <div className="col-span-2  flex flex-col gap-2">
            <img
              src={imagePreview}
              width={100}
              height={100}
              className="rounded-md"
              alt="current_image"
            />
          </div>
        )}
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
              t("Admins.EditAdmins.title")
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
