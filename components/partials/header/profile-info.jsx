"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const ProfileInfo = ({ locale }) => {
  function Logout() {
    signOut({
      callbackUrl: `/en/auth/login`,
    });
  }

  const [img, setImg] = useState("/images/avatar/avatar-77.jpg");
  const [profile, setProfile] = useState({
    name: "ACE",
    email: "da3em@gmail.com",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "skip-browser-warning",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setImg(data?.data?.image || "/images/avatar/avatar-77.jpg");
          setProfile({
            name: data.data.name,
            email: data.data.email,
          });
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfile();
  }, []);

  const t = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center w-[36px] h-[36px] rounded-full overflow-hidden">
          <img src={img} alt="profile avatar" className="object-cover" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3 ">
          <img
            src={img}
            alt="profile avatar"
            className="rounded-full max-h-[36px] max-w-[36px] min-h-[36px] min-w-[36px] object-cover"
          />
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {profile.name}
            </div>
            <div className="text-xs text-default-600 hover:text-primary">
              {profile.email}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {[
            {
              name: "profile",
              icon: "heroicons:user",
              href: `/${t("locale")}/user-profile`,
            },
          ].map((item, index) => (
            <Link
              href={item.href}
              key={`info-menu-${index}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                <Icon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
          onClick={Logout}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
