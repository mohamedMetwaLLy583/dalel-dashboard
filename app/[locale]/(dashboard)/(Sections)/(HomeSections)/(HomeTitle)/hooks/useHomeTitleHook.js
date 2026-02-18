import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useToken } from "@/provider/auth.provider";

export const useHomeTitleHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useToken();

  const t = useTranslations();

  //   Get Data
  async function getData() {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/banner/home`,
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
    formData.append("title_ar", values["title_ar"] ?? "");
    formData.append("title_en", values["title_en"] ?? "");
    formData.append("description_ar", values["description_ar"] ?? "");
    formData.append("description_en", values["description_en"] ?? "");
    try {
      setLoading(true);
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/banner/home`,
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
        toast.success(t("HomeTitle.toast.update"), {
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
