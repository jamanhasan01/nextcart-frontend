"use client";
import useUsers from "@/hooks/users/useUsers";
import { UserTable } from "../components/users/UsersTable";
import { useState } from "react";
import UsersFilter from "../components/users/UsersFilter";
import { IOrderQuery } from "@/types/order.type";
import { PaginationComponent } from "@/app/components/common/PaginationComponent";
import useDebounce from "@/hooks/useDebounce";
import { TableSkeleton } from "../components/skeletons/TableSkeleton";
import { IUserQueries } from "@/types/user.type";

const UserPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, onSearchChange] = useState("");
  const [statusFilter, onStatusChange] =
    useState<IUserQueries["status"]>("active");
  const { debouncevalue, isDebounce } = useDebounce(searchQuery, 1000);


  const { users, pagination, isLoading } = useUsers({
    page,
    limit:10,
    search: debouncevalue,
    status: statusFilter,
  });

  const totalPage = pagination?.total_pages;
  const limit = pagination?.limit;
  return (
    <div>
      <UsersFilter
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onStatusChange={onStatusChange}
        onSearchChange={onSearchChange}
      ></UsersFilter>
      {isLoading || isDebounce ? (
        <TableSkeleton></TableSkeleton>
      ) : (
        <UserTable users={users} page={page} limit={limit}></UserTable>
      )}
      {totalPage > 1 && (
        <PaginationComponent
          total_page={totalPage}
          page={page}
          setPage={setPage}
        ></PaginationComponent>
      )}
    </div>
  );
};

export default UserPage;
