import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const useAboutHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const t = useTranslations();

  //   Get Data
  async function getData() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/about_us`,
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
    formData.append("description_one_ar", values["description_one_ar"] ?? "");
    formData.append("description_one_en", values["description_one_en"] ?? "");
    formData.append("description_two_ar", values["description_two_ar"] ?? "");
    formData.append("description_two_en", values["description_two_en"] ?? "");
    formData.append(
      "description_three_en",
      values["description_three_en"] ?? ""
    );
    formData.append(
      "description_three_ar",
      values["description_three_ar"] ?? ""
    );
    formData.append("image_one", values["image_one"][0] ?? "");
    formData.append("image_two", values["image_two"][0] ?? "");
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/about_us`,
        {
          body: formData,
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
          next: { revalidate: 0 },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          console.log("Unauthenticated");
        }
        throw new Error("Failed to fetch data");
      } else {
        toast.success(t("About.toast.update"), {
          position: "top-right",
          autoClose: 3000,
        });
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
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
