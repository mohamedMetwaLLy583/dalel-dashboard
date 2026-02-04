"use client";
import React from "react";
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
import { useInspectionsHook } from "../hooks/useInspectionsHook";
import { useParams } from "next/navigation";

export default function InspectionsTable() {
  const t = useTranslations();
  const router = useRouter();

  // Use the hook here
  const {
    data,
    loading,
    deletingId,
    deleteData,
    markCompleted,
    cancelInspection,
  } = useInspectionsHook();

  // Table columns
  const columns = [
    {
      key: "Image",
      label: t("Inspections.table.image"),
    },
    {
      key: "Title",
      label: t("Inspections.table.title"),
    },
    {
      key: "Description",
      label: t("Inspections.table.Desc"),
    },
    {
      key: "Phone",
      label: t("Inspections.table.phone"),
    },
    {
      key: "OfferType",
      label: t("Inspections.table.offerType"),
    },
    {
      key: "Date",
      label: t("Inspections.table.date"),
    },
    {
      key: "action",
      label: t("Inspections.table.action"),
    },
  ];

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
                    value={50}
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
                {/* Image column */}
                <TableCell className="font-medium text-card-foreground/80">
                  <Avatar>
                    <AvatarImage src={item.images?.[0] ?? ""} />
                    <AvatarFallback>
                      <img src="/images/placeholder.jpg" alt="placeholder" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Title column (Name) */}
                <TableCell className="font-medium text-card-foreground/80">
                  {item.name}
                </TableCell>

                {/* Description column */}
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
                    {item.description}
                  </div>
                </TableCell>

                {/* Phone column */}
                <TableCell className="font-medium text-card-foreground/80">
                  {item.phone}
                </TableCell>

                {/* Offer Type column */}
                <TableCell className="font-medium text-card-foreground/80">
                  {t(`OfferType.${item.offer_type}`)}
                </TableCell>

                {/* Status column */}
                <TableCell className="font-medium text-card-foreground/80">
                  {item.date}
                </TableCell>

                {/* Action column */}
                <TableCell className="ltr:pr-5 rtl:pl-5">
                  {deletingId === item.id ? (
                    <div>
                      <CircularProgress
                        value={50}
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
                          className="h-7 w-7 rounded-full bg-transparent data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
                        >
                          <Icon
                            icon="heroicons:ellipsis-horizontal"
                            className="h-6 w-6"
                          />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" avoidCollisions>
                        <DropdownMenuLabel>
                          {t("Inspections.table.ActionCenter.title")}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {/* Show button */}
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`show-inspection-details/${item.id}`)
                          }
                        >
                          <Icon icon="heroicons:eye" className="h-4 w-4 mx-2" />
                          {t("Inspections.table.ActionCenter.show")}
                        </DropdownMenuItem>

                        {/* Mark as Completed button */}
                        <DropdownMenuItem
                          onClick={() => markCompleted(item.id)}
                        >
                          <Icon
                            icon="heroicons:check-circle"
                            className="h-4 w-4 mx-2"
                          />
                          {t("Inspections.table.ActionCenter.markCompleted")}
                        </DropdownMenuItem>

                        {/* Cancel button */}
                        <DropdownMenuItem
                          onClick={() => cancelInspection(item.id)}
                        >
                          <Icon
                            icon="heroicons:x-circle"
                            className="h-4 w-4 mx-2"
                          />
                          {t("Inspections.table.ActionCenter.cancel")}
                        </DropdownMenuItem>

                        {/* Delete button */}
                        <DropdownMenuItem onClick={() => deleteData(item.id)}>
                          <Icon
                            icon="heroicons:trash"
                            className="h-4 w-4 mx-2"
                          />
                          {t("Inspections.table.ActionCenter.delete")}
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
