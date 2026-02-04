"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const page = () => {
  const t = useTranslations();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/profile`,
        {
          next: { revalidate: 0 },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await req.json();
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="text-2xl font-semibold h-[90vh] w-full flex justify-center items-center">
      {userData && (
        <div className="hover-text-container">
          <h1 className="text-6xl ">
            {" "}
            <span className="font-bold capitalize">
              {t("welcome")} {userData?.name} 👋
            </span>
          </h1>
          <h1 className="text-6xl hover-text animate-nameHover">
            {" "}
            <span className="font-bold capitalize">
              {t("welcome")} {userData?.name} 👋
            </span>
          </h1>{" "}
        </div>
      )}
    </div>
  );
};

export default page;
