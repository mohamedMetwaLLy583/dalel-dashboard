import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useToken } from "@/provider/auth.provider";

export const useContactSeoHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useToken();

  const t = useTranslations();
  const locale = t("locale");

  //   Get Data
  async function getData() {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/seo/contact_us`,
        {
          next: { revalidate: 0 },
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  // Edit Data
  const EditData = async (values) => {
    const formData = new FormData();
    formData.append("title_en", values["title:en"] ?? "");
    formData.append("title_ar", values["title:ar"] ?? "");
    formData.append("description_en", values["description:en"] ?? "");
    formData.append("description_ar", values["description:ar"] ?? "");
    formData.append("keyword_en", values["keyword:en"] ?? "");
    formData.append("keyword_ar", values["keyword:ar"] ?? "");
    formData.append("image", values["image"][0] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/seo/contact_us`,
        {
          body: formData,
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
          next: { revalidate: 0 },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      } else {
        toast.success(t("SEO.Home.form.toast.update"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
      const data = await res.json();
      return data;
    } catch (error) {
    } finally {
      getData(locale);
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
    getData,
  };
};
