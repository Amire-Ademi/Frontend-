

import { cn } from "@/lib/utils"; 
import { CheckCircle, Clock } from "lucide-react";

export default function OrderCard({ name, table, status, time, itemsCount }) { 
  const statusColor = status === "Ready" ? "text-green-600" : "text-yellow-500";
  const statusIcon = status === "Ready" ? <CheckCircle size={16} /> : <Clock size={16} />;

  return (
    <div className="w-full max-w-sm p-4 rounded-xl border bg-pink-50 shadow-sm flex flex-col justify-between">
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-red-500">Table No: {table}</div>
        <div className="text-sm text-gray-400">{itemsCount} items • {time}</div>
      </div>
      <div className={cn("flex items-center gap-1 mt-3 text-sm font-medium", statusColor)}>
        {statusIcon}
        {status}
      </div>
    </div>
  );
}
