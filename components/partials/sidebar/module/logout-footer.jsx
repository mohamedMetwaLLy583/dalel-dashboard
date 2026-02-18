"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useToken } from "@/provider/auth.provider";

const LogoutFooter = () => {
  const t = useTranslations();
  const token = useToken();
  const [profile, setProfile] = useState({ name: "", company: "" });

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
          setProfile({
            name: data.data.name || "",
            email: data.data.email || "",
          });
        }
      } catch (error) {
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-default-50 dark:bg-default-200 items-center flex gap-3 px-4 py-2 mt-5">
      <div className="flex-1">
        <div className="text-default-700 font-semibold text-sm capitalize mb-0.5 truncate">
          {profile.name}
        </div>
        <div className="text-xs text-default-600 truncate">{profile.email}</div>
      </div>
      <div className="flex-none">
        <button
          onClick={() =>
            signOut({
              callbackUrl: `/${t("locale")}/auth/login`,
            })
          }
          type="button"
          className="text-default-500 inline-flex h-9 w-9 rounded items-center dark:bg-default-300 justify-center dark:text-default-900"
        >
          <Icon
            icon="heroicons:arrow-right-start-on-rectangle-20-solid"
            className="h-5 w-5"
          />
        </button>
      </div>
    </div>
  );
};

export default LogoutFooter;
