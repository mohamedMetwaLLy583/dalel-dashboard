import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const useRolesHook = () => {
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [permissions, setPermissions] = useState(null);
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
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/roles`,
        {
          next: { revalidate: 0 },
          headers: {
            "Accept-Language": t("locale"),
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setData(data);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  //   Get Current Data For Edit
  async function getCurrentData(id) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/roles/${id}`,
        {
          next: { revalidate: 0 },
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Accept: "application/json",
            "Accept-Language": t("locale"),
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setCurrentData(data);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  // Get Persmissions
  async function getPermissions(id) {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/permissions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Accept: "application/json",
            "Accept-Language": t("locale"),
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      const formatedPermissions = data.data.map((permission) => {
        return { value: permission.id, label: permission.display_name_ar };
      });

      setPermissions(formatedPermissions);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  //   Store Data
  const storeData = async (values) => {
    const formData = new FormData();
    formData.append("name", values["name"] ?? "");
    formData.append(
      "display_name_en",
      values["translate_display_name_en"] ?? ""
    );
    formData.append(
      "display_name_ar",
      values["translate_display_name_ar"] ?? ""
    );
    values.permissions?.map((permission) => {
      formData.append("permissions[]", permission ?? "");
    });

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/roles`,
        {
          body: formData,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "skip-browser-warning",
          },
        }
      );
      if (!res.status === 422) {
        toast.error(res.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        const data = await res.json();
        router.push(`show-roles`);
      }

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

  // Edit Data
  const EditData = async (id, values) => {
    const formData = new FormData();
    formData.append("name", values["name"] ?? "");
    formData.append(
      "display_name_en",
      values["translate_display_name_en"] ?? ""
    );
    formData.append(
      "display_name_ar",
      values["translate_display_name_ar"] ?? ""
    );
    values.permissions?.map((permission) => {
      formData.append("permissions[]", permission.value ?? "");
    });

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/roles/${id}`,
        {
          body: formData,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "skip-browser-warning",
          },
          next: { revalidate: 0 },
        }
      );
      if (!res.ok) {
        toast.error(t("Roles.toast.error"), {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.success(t("Roles.toast.update"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
      const data = await res.json();
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

  // Delete Data
  async function deleteData(id) {
    setDeletingId(id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/roles/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "skip-browser-warning",
          },
        }
      );

      if (res.ok) {
        setData((prev) => prev.filter((data) => data.id !== id));
        toast.success(t("Roles.toast.delete"), {
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

  // Pagination
  //   const getNextPage = async () => {
  //     setCurrentPage((prev) => prev + 1);
  //   };
  //   const getPrevPage = async () => {
  //     setCurrentPage((prev) => prev - 1);
  //   };

  //   const getPageByNumber = async (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };

  useEffect(() => {
    getData(locale);
    getPermissions();
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
    permissions,
  };
};
