import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BasicTableOneRow from "@/components/tables/BasicTableOneRow";
import { BASIC_TABLE_ONE_DATA } from "@/components/tables/basicTableOneData.constant";

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-awc-border bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-awc-border dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-awc-fg-muted text-start text-theme-xs dark:text-gray-400"
                >
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-awc-fg-muted text-start text-theme-xs dark:text-gray-400"
                >
                  Project Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-awc-fg-muted text-start text-theme-xs dark:text-gray-400"
                >
                  Team
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-awc-fg-muted text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-awc-fg-muted text-start text-theme-xs dark:text-gray-400"
                >
                  Budget
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {BASIC_TABLE_ONE_DATA.map((order) => (
                <BasicTableOneRow key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
