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
import { useBlockedNumbersHook } from "../hooks/useBlockedNumbersHook";
import { useParams } from "next/navigation";

export default function ReservationsTable() {
  const t = useTranslations();
  const router = useRouter();

  // Use the hook here
  const { data, loading, unblockNumber } = useBlockedNumbersHook();

  // Table columns
  const columns = [
    {
      key: "BlockedNumbers",
      label: t("BlockedNumbers.table.title"),
    },

    {
      key: "action",
      label: t("BlockedNumbers.table.action"),
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
                {/* Phone column */}
                <TableCell className="font-medium text-card-foreground/80">
                  {item.phone}
                </TableCell>

                {/* Action column */}
                <TableCell className="ltr:pr-5 rtl:pl-5">
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
                        {t("BlockedNumbers.table.ActionCenter.name")}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {/* unblock  button */}
                      <DropdownMenuItem onClick={() => unblockNumber(item.id)}>
                        <Icon
                          icon="heroicons:phone-arrow-up-right"
                          className="h-4 w-4 mx-2"
                        />
                        {t("BlockedNumbers.table.ActionCenter.unblock")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
