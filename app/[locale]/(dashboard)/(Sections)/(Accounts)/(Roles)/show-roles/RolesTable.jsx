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
import { useRolesHook } from "../hooks/useRolesHook";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function RolesTable() {
  const { data, deleteData, loading, deletingId } = useRolesHook();
  const t = useTranslations();
  const columns = [
    {
      key: "Name",
      label: t("Roles.table.title"),
    },

    {
      key: "Permissions",
      label: t("Roles.table.permissions"),
    },

    {
      key: "action",
      label: t("Roles.table.action"),
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
                  {item.translate_display_name_ar}
                </TableCell>

                <TableCell className="font-medium  text-card-foreground/80">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button>{t("Roles.table.show_permissions")}</Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-none" side="top">
                      <PopoverArrow className="fill-default-300 w-3" />
                      <div className="p-2.5  text-default-900 text-sm bg-default-200 font-medium  rounded-t-md">
                        {t("Roles.table.permissions")}
                      </div>
                      <div className="p-2 text-sm text-default-600">
                        <ul className="h-[200px] overflow-y-auto">
                          {item.permissions.map((permission) => (
                            <li key={permission.id}>
                              • {permission.display_name_ar}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
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
                          {t("Roles.table.ActionCenter.title")}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => router.push(`edit-role/${item.id}`)}
                        >
                          <Icon
                            icon="heroicons:pencil"
                            className=" h-4 w-4 mx-2 "
                          />
                          {t("Roles.table.ActionCenter.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteData(item.id)}>
                          <Icon
                            icon="heroicons:trash"
                            className=" h-4 w-4 mx-2 "
                          />
                          {t("Roles.table.ActionCenter.delete")}
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
