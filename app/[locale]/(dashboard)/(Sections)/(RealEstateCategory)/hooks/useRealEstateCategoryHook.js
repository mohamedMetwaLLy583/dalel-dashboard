import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useToken } from "@/provider/auth.provider";

export const useRealEstateCategoryHook = () => {
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const token = useToken();

  const t = useTranslations();
  const locale = t("locale");
  const router = useRouter();

  //   Get Data
  async function getData(locale) {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/type`,
        {
          next: { revalidate: 0 },
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${token}`,
            "Accept-Language": locale,
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

  //   Store Data
  const storeData = async (values) => {
    const formData = new FormData();
    formData.append("name_en", values["name_en"] ?? "");
    formData.append("name_ar", values["name_ar"] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/type`,
        {
          body: formData,
          method: "POST",
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      } else {
      }

      const data = await res.json();
      router.push(`show-realestate-categories`);
      return data;
    } catch (error) {
    } finally {
      getData(locale);
      setLoading(false);
    }
  };

  // Delete Data
  async function deleteData(id) {
    setDeletingId(id);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/type/${id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setData((prev) => prev.filter((data) => data.id !== id));
        toast.success(t("RealEstateCategory.toast.delete"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    getData(locale);
  }, [locale]);

  return {
    data,
    deletingId,
    loading,
    storeData,
    deleteData,
  };
};
