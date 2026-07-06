import Image from "next/image";

interface OrderItemProps {
  item: {
    product: {
      _id: string;
      name: string;
      productID: string;
      thumbnail: { url: string };
    };
    quantity: number;
    price: number;
  };
}

export function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between transition hover:bg-slate-50/50">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border bg-slate-100">
          <Image
            src={item.product.thumbnail.url}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        <div className="space-y-0.5">
          <h3 className="font-medium text-slate-900 hover:text-blue-600 transition line-clamp-1">{item.product.name}</h3>
          <p className="text-xs text-slate-400 font-mono">ID: {item.product.productID}</p>
          <p className="text-sm text-slate-500">Qty: <span className="font-medium text-slate-700">{item.quantity}</span></p>
        </div>
      </div>

      <div className="text-left sm:text-right">
        <p className="font-semibold text-slate-900">৳{item.price.toLocaleString()}</p>
        {item.quantity > 1 && (
          <p className="text-xs text-slate-400 mt-0.5">
            Total: ৳{(item.price * item.quantity).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}