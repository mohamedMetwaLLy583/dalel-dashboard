"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import flag1 from "@/public/images/all-img/flag-1.png";
import flag3 from "@/public/images/all-img/flag-3.png";
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useThemeStore } from "@/store";
const languages = [
  {
    name: "en",
    flag: flag1,
  },
  {
    name: "ar",
    flag: flag3,
  },
];
const Language = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const { isRtl, setRtl } = useThemeStore();
  const found = languages.find((lang) => pathname.includes(lang.name));
  const [selectedLanguage, setSelectedLanguage] = useState(
    found ?? languages[0]
  );
  const handleSelected = (lang) => {
    setSelectedLanguage({
      ...selectedLanguage,
      name: lang,
      language: lang === "en" ? "En" : "Ar",
    });
    setRtl(lang === "ar");
    if (pathname == "/en" || pathname == "/ar") {
      router.push(`/${lang}`);
    } else {
      router.push(
        `/${lang}/${pathname.split("/")[2]}${id ? `/${id}` : ""}${
          pathname.split("/")[4] ? `/${pathname.split("/")[4]}` : ""
        }`
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" className="bg-transparent hover:bg-transparent">
          <span className="w-6 h-6 rounded-full me-1.5">
            <Image
              src={selectedLanguage ? selectedLanguage.flag : flag1}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </span>
          <span className="text-sm text-default-600 capitalize">
            {selectedLanguage ? selectedLanguage.name : "En"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        {languages.map((item, index) => (
          <DropdownMenuItem
            key={`flag-${index}`}
            className={cn(
              "py-1.5 px-2 cursor-pointer dark:hover:bg-background mb-[2px] last:mb-0",
              {
                "bg-primary-100 ":
                  selectedLanguage && selectedLanguage.name === item.name,
              }
            )}
            onClick={() => handleSelected(item.name)}
          >
            <span className="w-6 h-6 rounded-full me-1.5">
              <Image
                src={item.flag}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </span>
            <span className="text-sm text-default-600 capitalize">
              {item.name}
            </span>
            {selectedLanguage && selectedLanguage.name === item.name && (
              <Check className="w-4 h-4 flex-none ltr:ml-auto rtl:mr-auto text-default-700" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Language;
