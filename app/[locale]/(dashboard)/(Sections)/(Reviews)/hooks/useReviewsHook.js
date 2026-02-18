import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useToken } from "@/provider/auth.provider";

export const useReviewsHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const token = useToken();

  const t = useTranslations();
  const locale = t("locale");
  const router = useRouter();
  const page = useSearchParams().get("page");

  //   Get Data
  async function getData() {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/review`,
        {
          next: { revalidate: 0 },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        toast.error(t("Reviews.toast.error"), {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        setLoading(false);
      }

      const data = await res.json();
      setData(data.data);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
    }
  }

  //   Store Data
  const storeData = async (values) => {
    const formData = new FormData();
    formData.append("name_en", values["name_en"] ?? "");
    formData.append("name_ar", values["name_ar"] ?? "");
    formData.append("review", values["review"] ?? "");
    formData.append("rating", values["rating"] ?? "");
    formData.append("image", values["image"][0] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/review`,
        {
          body: formData,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        toast.error(t("Reviews.toast.error"), {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      const data = await res.json();
      router.push(`show-reviews`);
      return data;
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      getData(locale);
      setLoading(false);
    }
  };

  // toggle
  const toggleApproval = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/review/${id}/toggle`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (res.ok) {
        await getData();
        toast.success(t("Reviews.toast.approved-or-disapproved"), {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(t("Reviews.toast.error"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(t("Reviews.toast.error"), {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Data
  async function deleteData(id) {
    setDeletingId(id);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/review/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setData((prev) => prev.filter((data) => data.id !== id));
        toast.success(t("Reviews.toast.delete"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    getData(locale);
  }, [locale, page]);

  return {
    data,
    deletingId,
    loading,
    storeData,
    deleteData,
    toggleApproval,
  };
};
