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
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRealEstateCategoryHook } from "../hooks/useRealEstateCategoryHook";

export default function RealEstateCategoryTable() {
  const { data, deleteData, loading, deletingId } = useRealEstateCategoryHook();
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  const columns = [
    {
      key: "Title",
      label: t("RealEstateCategory.table.title"),
    },
    {
      key: "action",
      label: t("RealEstateCategory.table.action"),
    },
  ];

  const router = useRouter();

  const handleDeleteClick = (id) => {
    setCurrentDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentDeleteId) {
      deleteData(currentDeleteId);
    }
    setIsModalOpen(false);
    setCurrentDeleteId(null);
  };

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
                  {item.name}
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
                          {t("RealEstateCategory.table.ActionCenter.title")}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <Icon
                            icon="heroicons:trash"
                            className=" h-4 w-4 mx-2 "
                          />
                          {t("RealEstateCategory.table.ActionCenter.delete")}
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-red-600 text-lg font-semibold mb-4">
              {t("RealEstateCategory.modal.confirmationTitle")}
            </h2>
            <p className="text-gray-600 mb-4">
              {t("RealEstateCategory.modal.confirmationMessage")}
            </p>
            <div className="flex justify-end gap-4">
              <Button color="secondary" onClick={() => setIsModalOpen(false)}>
                {t("RealEstateCategory.modal.cancel")}
              </Button>
              <Button color="primary" onClick={confirmDelete}>
                {t("RealEstateCategory.modal.confirm")}
              </Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </Card>
  );
}
