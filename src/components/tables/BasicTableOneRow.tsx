import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { BasicTableOrder } from "@/components/tables/BasicTableOne.types";

const getStatusBadgeColor = (
  status: string,
): "success" | "warning" | "error" => {
  if (status === "Active") {
    return "success";
  }
  if (status === "Pending") {
    return "warning";
  }
  return "error";
};

interface BasicTableOneRowProps {
  readonly order: BasicTableOrder;
}

export default function BasicTableOneRow({ order }: BasicTableOneRowProps) {
  return (
    <TableRow key={order.id}>
      <TableCell className="px-5 py-4 sm:px-6 text-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <Image
              width={40}
              height={40}
              src={order.user.image}
              alt={order.user.name}
            />
          </div>
          <div>
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {order.user.name}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {order.user.role}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {order.projectName}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        <div className="flex -space-x-2">
          {order.team.images.map((teamImage, index) => (
            <div
              key={index}
              className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
            >
              <Image
                width={24}
                height={24}
                src={teamImage}
                alt={`Team member ${index + 1}`}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        <Badge size="sm" color={getStatusBadgeColor(order.status)}>
          {order.status}
        </Badge>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        {order.budget}
      </TableCell>
    </TableRow>
  );
}
