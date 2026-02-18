"use client";

import { useEffect, useState } from "react";
import { Settings } from "@/components/svg";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useToken } from "@/provider/auth.provider";
const FooterMenu = () => {
  const t = useTranslations();
  const token = useToken();
  const [img, setImg] = useState("/images/avatar/avatar-77.jpg");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setImg(data?.data?.image);
        }
      } catch (error) {
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="space-y-5 flex flex-col items-center justify-center pb-6">
      <Link
        href={`/${t("locale")}/settings`}
        className="w-11 h-11  mx-auto text-default-500 flex items-center justify-center  rounded-md transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
      >
        <Settings className=" h-8 w-8" />
      </Link>
      <div className="w-[36px] h-[36px] rounded-full">
        <img
          src={img}
          alt="profile avatar"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};
export default FooterMenu;
