import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useToken } from "@/provider/auth.provider";

export const useBannerHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useToken();

  const t = useTranslations();

  //   Get Data
  async function getData() {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/banner/pages`,
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
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  // Edit Data
  const EditData = async (values) => {
    const formData = new FormData();

    formData.append("about_us_title_ar", values["about_us_title_ar"] ?? "");
    formData.append("about_us_title_en", values["about_us_title_en"] ?? "");
    formData.append("about_us_desc_ar", values["about_us_desc_ar"] ?? "");
    formData.append("about_us_desc_en", values["about_us_desc_en"] ?? "");

    formData.append("contact_us_title_ar", values["contact_us_title_ar"] ?? "");
    formData.append("contact_us_title_en", values["contact_us_title_en"] ?? "");
    formData.append("contact_us_desc_ar", values["contact_us_desc_ar"] ?? "");
    formData.append("contact_us_desc_en", values["contact_us_desc_en"] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/banner/pages`,
        {
          body: formData,
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
          next: { revalidate: 0 },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
        }
        throw new Error("Failed to fetch data");
      } else {
        toast.success(t("Banner.toast.update"), {
          position: "top-right",
          autoClose: 3000,
        });
      }

      const data = await res.json();
      return data;
    } catch (error) {
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
