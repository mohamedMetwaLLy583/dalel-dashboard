import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useBlockedNumbersHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const t = useTranslations();
  const locale = t("locale");
  const router = useRouter();

  //  Get All Numbers
  async function getData(locale) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/reservation/blocked-phones`,
        {
          next: { revalidate: 0 },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const json = await res.json();
      setData(json.data || []);
    } catch (error) {
      console.error(error);
      toast.error(t("Reservations.toast.fetchError"), {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  //  UnbloBock Number
  async function unblockNumber(id) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/reservation/unblock-phone/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to mark as completed");
      }

      toast.success(t("BlockedNumbers.toast.completed"), {
        position: "top-right",
        autoClose: 3000,
      });

      //  Refresh data
      await getData(locale);
    } catch (error) {
      console.error(error);
      toast.error(t("Reservations.toast.error"), {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  // Add number to blocked store data
  const storeData = async (values) => {
    const formData = new FormData();
    formData.append("phone", values["phone"] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/reservation/block-phone`,
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
      router.push(`show-blocked-numbers`);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      getData(locale);
      setLoading(false);
    }
  };

  // Automatically fetch data whenever locale changes, or just once on mount
  useEffect(() => {
    getData(locale);
  }, [locale]);

  return {
    data,
    loading,
    unblockNumber,
    storeData,
  };
};
