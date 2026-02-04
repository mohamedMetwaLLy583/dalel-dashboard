import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const useStatisticsHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const t = useTranslations();
  const locale = t("locale");

  //   Get Data
  async function getData(locale) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/statistics`,
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
      console.log(error);
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
    formData.append("happy_clients", values["happy_clients"] ?? "");
    formData.append("sold_homes", values["sold_homes"] ?? "");
    formData.append("rented_homes", values["rented_homes"] ?? "");
    formData.append("reviews", values["reviews"] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/statistics`,
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
        toast.success(t("Statistics.toast.update"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      getData(locale);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(locale);
  }, [locale]);

  return {
    data,
    loading,
    EditData,
  };
};
