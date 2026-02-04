"use client";

import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Modal from "react-modal";

export default function Page() {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const appElement = document.getElementById("__next");
      if (appElement) {
        Modal.setAppElement(appElement);
      }
    }
  }, []);

  const fetchData = async (page = 1) => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/contact-us?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (Array.isArray(data.data)) {
        setContacts(data.data);
        setCurrentPage(data.meta.current_page ?? 1);
        setTotalPages(data.meta.last_page ?? 1);
      } else {
        setContacts([]);
      }
    } catch (error) {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/contact-us/${selectedContact.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        setContacts(
          contacts.filter((contact) => contact.id !== selectedContact.id)
        );
        closeModal();
      }
    } catch (error) {
      console.error("Failed to delete contact", error);
    }
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedContact(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t("ContactUs.title")}</h1>

      {loading ? (
        <p className="min-h-[100vh]">{t("ContactUs.loading")}...</p>
      ) : contacts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {contacts?.map((req) => (
            <Card key={req.id}>
              <CardContent className="p-0 flex flex-col justify-between h-full">
                <div className="p-4">
                  <p className="mb-5 text-2xl text-default-700 font-semibold">
                    {req.name}
                  </p>

                  <p className="mb-4 text-muted-foreground text-[18px]">
                    <span className="font-medium text-default-700">
                      {t("ContactUs.email")} :
                    </span>{" "}
                    {req.email}
                  </p>

                  {
                    <p className="mb-4 text-muted-foreground text-[18px]">
                      <span className="font-medium text-default-700">
                        {t("ContactUs.msg")} :
                      </span>{" "}
                      {req.message}
                    </p>
                  }
                </div>
                <div className="p-4 flex justify-between gap-4">
                  <Button
                    className="w-full"
                    color="destructive"
                    onClick={() => openModal(req)}
                  >
                    {t("ContactUs.delete")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>{t("ContactUs.no-contacts-available")}.</p>
      )}

      <div
        dir="ltr"
        className="flex justify-center mt-6 p-3 bg-card rounded-md"
      >
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              "& .MuiButtonBase-root.Mui-selected": {
                backgroundColor: "#facc15",
              },
              "& .MuiButtonBase-root": {
                backgroundColor: "#facc15",
              },
            }}
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="bg-black bg-opacity-50 inset-0 fixed"
      >
        <div className="bg-card p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">
            {t("ContactUs.contactUsMsg.areYouSureDelete")}
          </h2>
          <p> {t("ContactUs.contactUsMsg.areYouSureDelete")}</p>
          <div className="flex justify-center mt-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
              onClick={handleDelete}
            >
              {t("ContactUs.contactUsMsg.yes")}
            </button>
            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              onClick={closeModal}
            >
              {t("ContactUs.contactUsMsg.no")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
