"use client";
import { useState } from "react";
import { OrderTable } from "../components/orders/OrderTable";
import { useOrders } from "@/hooks/order/useOrders";
import useDebounce from "@/hooks/useDebounce";
import OrdersFilter from "../components/orders/OrderFilter";
import { PaginationComponent } from "@/app/components/common/PaginationComponent";
import OrderDetailsModal from "../components/orders/OrderDetailsModal";
import { IOrder, IOrderQuery } from "@/types/order.type";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, onSearchChange] = useState("");
  const [statusFilter, onStatusChange] = useState<IOrderQuery["status"]>("all");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const { debouncevalue, isDebounce } = useDebounce(searchQuery, 1000);
  const { orders, pagination } = useOrders({
    search: debouncevalue,
    page: page,
    status: statusFilter,
  });
  const totalPage = pagination?.total_page;
  const limit = pagination?.limit;

  return (
    <div>
      {/* filter of data */}
      <OrdersFilter
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
        onStatusChange={onStatusChange}
        statusFilter={statusFilter}
      ></OrdersFilter>
      <OrderTable
        orders={orders}
        page={page}
        limit={limit}
        onView={setSelectedOrder}
      ></OrderTable>
      {totalPage > 1 && (
        <PaginationComponent
          total_page={totalPage}
          page={page}
          setPage={setPage}
        ></PaginationComponent>
      )}

      <OrderDetailsModal
        open={!!selectedOrder}
        order={selectedOrder}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null);
        }}
      />
    </div>
  );
};

export default OrdersPage;
