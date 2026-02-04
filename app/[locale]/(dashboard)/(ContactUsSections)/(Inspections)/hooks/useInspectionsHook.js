import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useInspectionsHook = () => {
  const [data, setData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const t = useTranslations();
  const locale = t("locale");
  const router = useRouter();

  //  Get All Inspection Requests
  async function getData(locale) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/inspection-request`,
        {
          next: { revalidate: 0 },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": locale,
          },
        }
      );

      if (!res.ok) {
        toast.error(t("Inspections.toast.fetchError"));
      }

      const json = await res.json();
      setData(json.data || []);
    } catch (error) {
      console.error(error);
      toast.error(t("Inspections.toast.fetchError"), {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  //  Get All History Data
  async function gethistoryData(locale) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/inspection-request/history`,
        {
          next: { revalidate: 0 },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": locale,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const json = await res.json();
      setHistoryData(json.data || []);
    } catch (error) {
      console.error(error);
      toast.error(t("Inspections.toast.fetchError"), {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  //   Get Current Data
  async function getCurrentData(id, locale) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/inspection-request/${id}`,
        {
          next: { revalidate: 0 },
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": locale,
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

  //  Delete Inspection Request
  async function deleteData(id) {
    setDeletingId(id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/inspection-request/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Deletion failed");
      }

      // Remove from the 'data' array
      setData((prev) => (prev ? prev.filter((item) => item.id !== id) : []));

      // Remove from the 'historyData' array
      setHistoryData((prev) =>
        prev ? prev.filter((item) => item.id !== id) : []
      );

      toast.success(t("Inspections.toast.delete"), {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Deletion failed:", error);
      toast.error(t("Inspections.toast.deleteError"), {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setDeletingId(null);
    }
  }

  //  Mark as Completed
  async function markCompleted(id) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/inspection-request/${id}/completed`,
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

      toast.success(t("Inspections.toast.completed"), {
        position: "top-right",
        autoClose: 3000,
      });

      //  Refresh data
      await getData(locale);
    } catch (error) {
      console.error(error);
      toast.error(t("Inspections.toast.error"), {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  //  Cancel Inspection
  async function cancelInspection(id) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/inspection-request/${id}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to cancel");
      }

      toast.success(t("Inspections.toast.cancel"), {
        position: "top-right",
        autoClose: 3000,
      });

      // Optional: Refresh data
      await getData(locale);
    } catch (error) {
      console.error(error);
      toast.error(t("Inspections.toast.error"), {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  // Automatically fetch data whenever locale changes, or just once on mount
  useEffect(() => {
    getData(locale);
    gethistoryData(locale);
  }, [locale]);

  return {
    data,
    historyData,
    currentData,
    deletingId,
    loading,
    getCurrentData,
    deleteData,
    getCurrentData,
    markCompleted,
    cancelInspection,
  };
};
