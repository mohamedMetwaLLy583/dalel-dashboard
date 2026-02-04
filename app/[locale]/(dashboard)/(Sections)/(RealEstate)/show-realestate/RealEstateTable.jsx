"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { useRealEstateHook } from "../hooks/useRealEstateHook";

export default function RealEstateTable() {
  const { data, deleteData, loading, deletingId } = useRealEstateHook();
  const t = useTranslations();
  const columns = [
    {
      key: "Image",
      label: t("Property.table.image"),
    },
    {
      key: "Title",
      label: t("Property.table.title"),
    },
    {
      key: "Descriprion",
      label: t("Property.table.Desc"),
    },

    {
      key: "Property Type",
      label: t("Property.table.type"),
    },

    {
      key: "action",
      label: t("Property.table.action"),
    },
  ];

  const router = useRouter();
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                <div className="flex justify-center items-center h-[277px]">
                  <CircularProgress
                    value="50"
                    color="primary"
                    loading
                    size="xs"
                    className="w-8 h-8"
                  />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium  text-card-foreground/80">
                  <Avatar>
                    <AvatarImage src={item.main_image} />
                    <AvatarFallback>
                      <img src="/images/placeholder.jpg" alt="" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium  text-card-foreground/80">
                  {item.title_ar}
                </TableCell>
                <TableCell style={{ maxWidth: "300px" }}>
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: "6",
                      WebkitBoxOrient: "vertical",
                      overflowY: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.description_ar}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-card-foreground/80">
                  {t(`OfferType.${item.offer_type}`)}
                </TableCell>

                <TableCell className="ltr:pr-5 rtl:pl-5">
                  {deletingId === item.id ? (
                    <div>
                      <CircularProgress
                        value="50"
                        color="primary"
                        loading
                        size="xs"
                        className="w-8 h-8"
                      />
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          color="secondary"
                          className=" h-7 rounded-full bg-transparent w-7 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground  "
                        >
                          <Icon
                            icon="heroicons:ellipsis-horizontal"
                            className=" h-6 w-6 "
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" avoidCollisions>
                        <DropdownMenuLabel>
                          {t("Property.table.ActionCenter.title")}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`edit-realestate/${item.id}`)
                          }
                        >
                          <Icon
                            icon="heroicons:pencil"
                            className=" h-4 w-4 mx-2 "
                          />
                          {t("Property.table.ActionCenter.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteData(item.id)}>
                          <Icon
                            icon="heroicons:trash"
                            className=" h-4 w-4 mx-2 "
                          />
                          {t("Property.table.ActionCenter.delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ToastContainer />
    </Card>
  );
}
