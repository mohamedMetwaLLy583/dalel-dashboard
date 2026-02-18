import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useToken } from "@/provider/auth.provider";

export const useAdminsHook = () => {
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [roles, setRoles] = useState(null);
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
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/admin`,
        {
          next: { revalidate: 0 },
          headers: {
            "Accept-Language": t("locale"),
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        toast.error(t("Admins.toast.error"), {
          position: "top-right",
          autoClose: 3000,
        });
      }

      const data = await res.json();

      setData(data.data);
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
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/admin/${id}`,
        {
          next: { revalidate: 0 },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        toast.error(t("Admins.toast.error"), {
          position: "top-right",
          autoClose: 3000,
        });
      }

      const data = await res.json();

      setCurrentData(data.data);
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  // Get Roles
  async function getRoles() {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/roles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Accept-Language": t("locale"),
          },
        }
      );

      if (!res.ok) {
        toast.error(t("Admins.toast.error"), {
          position: "top-right",
          autoClose: 3000,
        });
      }

      const data = await res.json();

      const formatedRoles = data.map((role) => {
        return { value: role.id, label: role.translate_display_name_ar };
      });
      setRoles(formatedRoles);
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
    formData.append("email", values["email"] ?? "");
    formData.append("phone", values["phone"] ?? "");
    formData.append("password", values["password"] ?? "");

    values.roles?.map((role) => {
      formData.append("roles[]", role.value ?? "");
    });
    formData.append("image", values["image"][0] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/admin`,
        {
          body: formData,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        toast.error(t("Admins.toast.error"), {
          position: "top-right",
          autoClose: 3000,
        });
      }
      const data = await res.json();
      router.push(`show-admins`);
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
    formData.append("email", values["email"] ?? "");
    formData.append("phone", values["phone"] ?? "");

    values.roles?.map((role) => {
      formData.append("roles[]", role.value ?? "");
    });
    formData.append("image", values["image"][0] ?? "");

    try {
      setLoading(true);
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/admin/${id}`,
        {
          body: formData,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          next: { revalidate: 0 },
        }
      );
      if (!res.ok) {
        toast.error(t("Admins.toast.error"), {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.success(t("Admins.toast.update"), {
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
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/admin/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setData((prev) => prev.filter((data) => data.id !== id));
        toast.success(t("Admins.toast.delete"), {
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
    getRoles();
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
    roles,
  };
};
