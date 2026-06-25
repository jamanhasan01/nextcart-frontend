import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IPaginationProp {
  total_page: number;
  page?: number;
  limit?: number;
  setPage: (page: number) => void;
}
export function PaginationComponent({
  total_page = 1,
  page = 1,
  setPage,
}: IPaginationProp) {
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page && page > 1 && setPage(page - 1)}
          />
        </PaginationItem>

        {Array.from({ length: total_page }).map((_, index) => {
          return (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setPage(index + 1)}
                isActive={page == index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => page && page < total_page && setPage(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
