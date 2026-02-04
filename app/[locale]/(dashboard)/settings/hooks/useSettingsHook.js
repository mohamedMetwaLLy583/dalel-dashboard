import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const useSettingsHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const t = useTranslations();

  //   Get Data
  async function getData() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/setting`,
        {
          next: { revalidate: 0 },
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setData(data.data);
      // console.log("This is get data", data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Edit Data
  const EditData = async (values) => {
    const formData = new FormData();
    formData.append("primary_phone", values["primary_phone"] ?? "");
    formData.append("secondary_phone", values["secondary_phone"] ?? "");
    formData.append("email", values["email"] ?? "");
    formData.append("facebook", values["facebook"] ?? "");
    formData.append("instagram", values["instagram"] ?? "");
    formData.append("linkedin", values["linkedin"] ?? "");
    formData.append("whatsapp", values["whatsapp"] ?? "");
    formData.append("x", values["x"] ?? "");

    formData.append("dark_logo", values["dark_logo"][0] ?? "");
    formData.append("light_logo", values["light_logo"][0] ?? "");
    formData.append(
      "footer_description_en",
      values["footer_description_en"] ?? ""
    );
    formData.append(
      "footer_description_ar",
      values["footer_description_ar"] ?? ""
    );
    formData.append("address_en", values["address_en"] ?? "");
    formData.append("address_ar", values["address_ar"] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/setting`,
        {
          body: formData,
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
          next: { revalidate: 0 },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          console.log("Unauthenticated");
        }
        throw new Error("Failed to fetch data");
      } else {
        toast.success(t("Settings.toast.update"), {
          position: "top-right",
          autoClose: 3000,
        });
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      getData();
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    EditData,
  };
};
