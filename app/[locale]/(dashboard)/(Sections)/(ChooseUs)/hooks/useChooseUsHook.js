import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const useChooseUsHook = () => {
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const token = localStorage.getItem("token");

  const t = useTranslations();
  const locale = t("locale");
  const router = useRouter();

  //   Get Data
  async function getData(locale) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/choose-us`,
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

  //   Get Current Data For Edit
  async function getCurrentData(id) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/choose-us/${id}`,
        {
          next: { revalidate: 0 },
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setCurrentData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //   Store Data
  const storeData = async (values) => {
    const formData = new FormData();
    formData.append("title_en", values["title_en"] ?? "");
    formData.append("title_ar", values["title_ar"] ?? "");
    formData.append("description_en", values["description_en"] ?? "");
    formData.append("description_ar", values["description_ar"] ?? "");
    formData.append("image", values["image"][0] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/choose-us`,
        {
          body: formData,
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      } else {
      }

      const data = await res.json();
      router.push(`show-choose-us`);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      getData(locale);
      setLoading(false);
    }
  };

  // Edit Data
  const EditData = async (id, values) => {
    const formData = new FormData();
    formData.append("title_en", values["title_en"] ?? "");
    formData.append("title_ar", values["title_ar"] ?? "");
    formData.append("description_en", values["description_en"] ?? "");
    formData.append("description_ar", values["description_ar"] ?? "");
    formData.append("image", values["image"][0] ?? "");
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/choose-us/${id}`,
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
        toast.success(t("ChooseUs.toast.update"), {
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

  // Delete Data
  async function deleteData(id) {
    setDeletingId(id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/choose-us/${id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setData((prev) => prev.filter((data) => data.id !== id));
        toast.success(t("ChooseUs.toast.delete"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Deletion failed:", error);
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
    EditData,
    deleteData,
    currentData,
    getCurrentData,
  };
};
