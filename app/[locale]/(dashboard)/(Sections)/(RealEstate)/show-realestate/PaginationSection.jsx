"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PaginationSection = ({ pagination }) => {
  const [activePage, setActivePage] = useState(1);
  const router = useRouter();

  const totalPages = pagination?.last_page || 1;

  const pagesArray = Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;
    return {
      page: pageNumber,
      path: `show-realestate?page=${pageNumber}`,
    };
  });

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
    router.push(`show-realestate?page=${pageNumber}`);
  };

  const renderPages = () => {
    let visiblePages = [];

    if (totalPages <= 3) {
      visiblePages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    } else {
      let startPage = Math.max(activePage - 1, 1);
      let endPage = Math.min(activePage + 1, totalPages - 1);

      if (startPage > 1) {
        visiblePages.push(1);
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      if (endPage < totalPages - 1) {
        visiblePages.push("ellipsis");
      }
    }

    return visiblePages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageClick(Math.max(activePage - 1, 1))}
            disabled={activePage === 1}
          />
        </PaginationItem>

        {renderPages().map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={`#`}
                onClick={() => handlePageClick(pageNumber)}
                isActive={activePage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {totalPages > 3 && (
          <PaginationItem>
            <PaginationLink
              href={`#`}
              onClick={() => handlePageClick(totalPages)}
              isActive={activePage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              handlePageClick(Math.min(activePage + 1, totalPages))
            }
            disabled={activePage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSection;
